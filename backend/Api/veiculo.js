module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    const save = async (req, res) => {

        const veiculoCost = { ...req.body }
        if(req.params.id) veiculoCost.id = req.params.id

        try {
            existsOrError(veiculoCost.descricao, 'Descrição não informada')
            existsOrError(veiculoCost.ano, 'Ano não informado')
            existsOrError(veiculoCost.placa, 'Placa não informada')
            existsOrError(veiculoCost.idCliente, 'Cliente não informado')  

            if(veiculoCost.id) {
                app.db('veiculo')
                    .update(veiculoCost)
                    .where({ id: veiculoCost.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('veiculo')
                    .insert(veiculoCost)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }

        } catch(msg) {
            res.status(400).send(msg)
        }
        
        
    }
    const get = (req, res) => {
        app.db('veiculo')
            .select('id', 'descricao', 'idCliente')
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('veiculo')
            .select('id', 'descricao', 'idCliente')
            .where({ id: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getByCliente = (req, res) => {
        app.db('veiculo')
            .where({ idCliente: req.params.id })
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const remove = async (req, res) => {
        
        try {
            const manutencaoConst = await app.db('manutencao')
                .where({ idVeiculo: req.params.id })
            notExistsOrError(manutencaoConst, 'O veiculo possui manutenções Vinculadas')
            
            const rowsDeleted = await app.db('veiculo')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Veiculo não foi encontrado')
            } catch(msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()

        } catch(msg) {
            res.status(500).send(msg)
        }
    }
    return { save, get, remove, getById, getByCliente }
}