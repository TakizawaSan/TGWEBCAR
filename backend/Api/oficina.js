const queries = require('./queries')

module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    
    const save = async (req, res) => {

        const oficinaConst = { ...req.body }
        if(req.params.id) oficinaConst.id = req.params.id

        try {
            existsOrError(oficinaConst.nomeFantasia, 'Nome Fantasia não informado')
            existsOrError(oficinaConst.proprietario, 'Proprietario não informado')
            existsOrError(oficinaConst.telefone, 'Telefone não informada]O')
            existsOrError(oficinaConst.horarioFuncionamento, 'horario de Funcionamento não informado')
            existsOrError(oficinaConst.diasFuncionamento, 'Dias Funcionamento não informado')
            existsOrError(oficinaConst.almoco, 'Horario de Almoço não informado')
            existsOrError(oficinaConst.idLogin, 'Login não informada')  
            try{
                const idLoginOficina = await app.db('oficina')
                    .where({ idLogin: oficinaConst.idLogin }).first()

                const idLoginMecanico = await app.db('mecanico')
                    .where({ idLogin: oficinaConst.idLogin }).first()

                const idLoginCliente = await app.db('cliente')
                    .where({ idLogin: oficinaConst.idLogin }).first()
                
                    const msg = 'Login já está sendo utilizado'
                if(!oficinaConst.id) {
                    await notExistsOrError(idLoginOficina, msg)
                    await notExistsOrError(idLoginMecanico, msg)
                    await notExistsOrError(idLoginCliente, msg)
                }
                if(oficinaConst.id) {
                    app.db('oficina')
                        .update(oficinaConst)
                        .where({ id: oficinaConst.id })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                }else{
                    app.db('oficina')
                        .insert(oficinaConst)
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                }
            }catch (msg){
                res.status(400).send(msg)
            }

        } catch(msg) {
            console.log('Estive aqui tbm')
            res.status(400).send(msg)
        }
        
        
    }
    const get = (req, res) => {
        app.db('oficina')
        .select('id', 'nomeFantasia', 'idLogin')
        .then(camaleao => res.json(camaleao))
        .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('oficina')
        .select('id', 'nomeFantasia', 'idLogin')
        .where({ id: req.params.id })
        .first()
        .then(camaleao => res.json(camaleao))
        .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('oficina')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Oficina não foi encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()

        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    return { save, get, remove, getById }
}