module.exports = app =>{
    const { existsOrError } = app.api.validation
    
    const save = async (req, res) => {

        const manAtivConst = { ...req.body }
        if(req.params.id) manAtivConst.id = req.params.id

        try {
            existsOrError(manAtivConst.dataInicio, 'Data de Inicio não informada')
            existsOrError(manAtivConst.dataTermino, 'Data de Termino não informada')
            existsOrError(manAtivConst.descricao, 'Decricao não informada')
            existsOrError(manAtivConst.idManutencao, 'Manutenção não informada')
            existsOrError(manAtivConst.idAtividade, 'Atividade não informada')    

            if(manAtivConst.id) {
                app.db('manutencao-atividade')
                    .update(manAtivConst)
                    .where({ id: manAtivConst.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('manutencao-atividade')
                    .insert(manAtivConst)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }

        } catch(msg) {
            res.status(400).send(msg)
        }
        
        
    }
    const get = (req, res) => {
        app.db('manutencao-atividade')
            .select('id', 'dataInicio', 'dataTermino','idManutencao','idAtividade')
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('manutencao-atividade')
            .select('id', 'dataInicio', 'dataTermino','idManutencao','idAtividade')
            .where({ id: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    const getByManu = (req, res) => {
        app.db('manutencao-atividade')
            .where({ idManutencao: req.params.id })
            .first()
            .then(camaleao => res.json(camaleao))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('manutencao-atividade')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'A ordem não fui encontrada não foi encontrada')
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