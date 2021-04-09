module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    const save = async (req, res) => {

        const atividadeConst = { ...req.body }
        if(req.params.id) atividadeConst.id = req.params.id

        try {
            existsOrError(atividadeConst.titulo, 'Titulo não informado')
            existsOrError(atividadeConst.descricao, 'Descrição não informada')

            if(atividadeConst.id) {
                app.db('atividade')
                    .update(atividadeConst)
                    .where({ id: atividadeConst.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }else{
                app.db('atividade')
                    .insert(atividadeConst)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }

        } catch(msg) {
            res.status(400).send(msg)
        }
        
        
    }
    
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Codigo de Categoria não informado')
            console.log('ok')
            const subAtividade = await app.db('atividade')
                .where({ idAtividade: req.params.id })

            notExistsOrError(subAtividade, 'Atividade possui associações')

            const manutencaoAtividade = await app.db('manutencao-atividade')
                .where({ idAtividade: req.params.id })

            notExistsOrError(manutencaoAtividade, 'Atividade possue Ordens')

            const rowsDeleted = await app.db('atividade')
                .where({ id: req.params.id }).del()

            existsOrError(rowsDeleted, 'Atividade não foi encontrada.')

            res.status(204).send()

        } catch (msg) {
            res.status(400).send(msg)
        }
    }
    const withPath = atividades => {
        const getParent = (atividades, idAtividade) => {
            const parent = atividades.filter(parent => parent.id === idAtividade)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = atividades.map(atividade => {
            let path = atividade.titulo
            let parent = getParent(atividades, atividade.idAtividade)
            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(atividades, parent.idAtividade)
            }
            return { ...atividade, path }
        })
        
        categoriesWithPath.sort((a,b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })
        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('atividade')
        .then(atividades => res.json(withPath(atividades)))
        .catch(err => res.status(500).send(err))
        
    }

    const getById = (req, res) => {
        app.db('atividade')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (atividades, tree) => {
        if(!tree) tree = atividades.filter(c => !c.idAtividade)
        tree = tree.map(parentNode => {
            const isChild = node => node.idAtividade == parentNode.id
            parentNode.children = toTree(atividades, atividades.filter(isChild))
            return parentNode
        })
        return tree
    }
    
    const getTree = (req, res) => {
        app.db('atividade')
            .then(atividades => res.json(toTree(atividades)))
            .catch(err => res.status(500).send(err))
    }
    return { save, remove, get, getById, getTree}
}