module.exports = app =>{
    const { existsOrError } = app.api.validation
    
    const save = async (req, res) => {

        const manutencaoConst = { ...req.body }
        if(req.params.id) manutencaoConst.id = req.params.id

        try {
            existsOrError(manutencaoConst.dataInicio, 'Data de Inicio não informada')
            existsOrError(manutencaoConst.idVeiculo, 'Veiculo não informado')
            existsOrError(manutencaoConst.idMecanico, 'Mecanico não informado')    

            if(manutencaoConst.id) {
                app.db('manutencao')
                    .update(manutencaoConst)
                    .where({ id: manutencaoConst.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('manutencao')
                    .insert(manutencaoConst)
                    .returning('id')
                    .then(id => res.json(id))
                    .catch(err => res.status(500).send(err))
            }

        } catch(msg) {
            res.status(400).send(msg)
        }
        
        
    }
    const get = (req, res) => {
        app.db('manutencao')
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('manutencao')
            .select('id', 'dataInicio', 'dataTermino','idVeiculo','idMecanico')
            .where({ id: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    
    
    const remove = async (req, res) => {
        try {
            const manutencaoAtividade = await app.db('manutencao-atividade')
                .where({ idManutencao: req.params.id })

            notExistsOrError(manutencaoAtividade, 'A Manutenção possue Ordens')
            const rowsDeleted = await app.db('manutencao')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Manutencao não foi encontrada')
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