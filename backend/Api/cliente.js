module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    
    const save = async (req, res) => {

        const clienteConst = { ...req.body }
        if(req.params.id) clienteConst.id = req.params.id

        try {
            existsOrError(clienteConst.nome, 'Nome Fantasia não informado')
            existsOrError(clienteConst.telefone, 'Telefone não informado')
            existsOrError(clienteConst.endereco, 'Endereço não informado')
            existsOrError(clienteConst.numero, 'Numero não informado')
            existsOrError(clienteConst.complemento, 'Complemento não informado')
            existsOrError(clienteConst.idLogin, 'Login não informado')  
            try{
                const idLoginOficina = await app.db('oficina')
                    .where({ idLogin: clienteConst.idLogin }).first()

                const idLoginMecanico = await app.db('mecanico')
                    .where({ idLogin: clienteConst.idLogin }).first()

                const idLoginCliente = await app.db('cliente')
                    .where({ idLogin: clienteConst.idLogin }).first()
                
                const msg = 'Login já está sendo utilizado'
                
                if(!clienteConst.id) {
                    await notExistsOrError(idLoginOficina, msg)
                    await notExistsOrError(idLoginMecanico, msg)
                    await notExistsOrError(idLoginCliente, msg)
                }
                if(clienteConst.id) {
                    app.db('cliente')
                        .update(clienteConst)
                        .where({ id: clienteConst.id })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(500).send(err))
                }else{
                    app.db('cliente')
                        .insert(clienteConst)
                        .returning('id')
                        .then(id => res.json(id))
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
        app.db('cliente')
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('cliente')
            .where({ id: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            const veiculoCont = await app.db('veiculo')
                .where({ idCliente: req.params.id })

            notExistsOrError(veiculoCont, 'Cliente Possui veiculos Vinculados')

            const rowsDeleted = await app.db('cliente')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Cliente não foi encontrado')
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