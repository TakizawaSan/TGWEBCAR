const bcrypt = require('bcrypt-nodejs')
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const loginCons = { ...req.body }

        const encryptPassword = password => {
            const salt = bcrypt.genSaltSync(10)
            return bcrypt.hashSync(password, salt)
        }

        if(req.params.id) loginCons.id = req.params.id
        try {
            existsOrError(loginCons.usuario, 'Usuario não informado')
            existsOrError(loginCons.senha, 'Senha não informada')
            existsOrError(loginCons.confirmarSenha, 'Confirmação de Senha inválida')
            equalsOrError(loginCons.senha, loginCons.confirmarSenha, 'Senhas não conferem')

            const loginFromDB = await app.db('login')
                .where({ usuario: loginCons.usuario }).first()
            
            if(!loginCons.id) {
                notExistsOrError(loginFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        loginCons.senha = encryptPassword(loginCons.senha)
        
        delete loginCons.confirmarSenha
        if(loginCons.id) {
            app.db('login')
            .update(loginCons)
            .where({ id: loginCons.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            console.log('To Aqui')
            app.db('login')
            .insert(loginCons)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('login')
        .select('id', 'usuario')
        .then(login => res.json(login))
        .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('login')
        .select('id', 'usuario')
        .where({ id: req.params.id })
        .first()
        .then(login => res.json(login))
        .catch(err => res.status(500).send(err))
    }

    return { save, get , getById}
}
