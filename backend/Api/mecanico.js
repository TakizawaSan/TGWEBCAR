
module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    
    const save = async (req, res) => {

        const mecanicoConst = { ...req.body }
        if(req.params.id) mecanicoConst.id = req.params.id

        try {
            existsOrError(mecanicoConst.nome, 'Nome não informado')
            existsOrError(mecanicoConst.telefone, 'Telefone não informado')
            existsOrError(mecanicoConst.idLogin, 'Login não informada')  
            try{
                const idLoginOficina = await app.db('oficina')
                    .where({ idLogin: mecanicoConst.idLogin }).first()

                const idLoginMecanico = await app.db('mecanico')
                    .where({ idLogin: mecanicoConst.idLogin }).first()

                const idLoginCliente = await app.db('cliente')
                    .where({ idLogin: mecanicoConst.idLogin }).first()
                
                    const msg = 'Login já está sendo utilizado'
                if(!mecanicoConst.id) {
                    await notExistsOrError(idLoginOficina, msg)
                    await notExistsOrError(idLoginMecanico, msg)
                    await notExistsOrError(idLoginCliente, msg)
                }
                if(mecanicoConst.id) {
                    app.db('mecanico')
                        .update(mecanicoConst)
                        .where({ id: mecanicoConst.id })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                }else{
                    app.db('mecanico')
                        .insert(mecanicoConst)
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                }
            }catch (msg){
                res.status(400).send(msg)
            }

        } catch(msg) {
            res.status(400).send(msg)
        }
        
        
    }
    const get = (req, res) => {
        app.db('mecanico')
            .select('id', 'nome', 'idLogin')
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('mecanico')
            .select('id', 'nome', 'idLogin')
            .where({ id: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            const manutencaoConst = await app.db('manutencao')
                .where({ idMecanico: req.params.id })
            notExistsOrError(manutencaoConst, 'O Mecanico possui manutenções Vinculadas')

            const rowsDeleted = await app.db('mecanico')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Mecanico não foi encontrado')
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