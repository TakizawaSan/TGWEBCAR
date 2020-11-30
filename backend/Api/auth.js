const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        try{
            const { isEmpty } = app.api.validation
            if(!req.body.usuario || !req.body.senha) {
                return res.status(400).send('Informe usuário e senha!')
            }
            const login = await app.db('login')
                .where({ usuario: req.body.usuario })
                .first()
            if(!login) return res.status(400).send('Usuário não encontrado')
            
            const validation = bcrypt.compareSync(req.body.senha, login.senha)
            if(!validation) return res.status(401).send('Email/Senha inválidos')

            let user = {}
            let permission = ''
            
            const idLoginCliente = await app.db('cliente')
            .where({ idLogin: login.id }).first()
            
            if(isEmpty(idLoginCliente) == false){
                user = idLoginCliente
                permission = 'cliente'

            }else{
               
                const idLoginMecanico = await app.db('mecanico')
                .where({ idLogin: login.id }).first() 

                if(isEmpty(idLoginMecanico) == false){
                    
                    user = idLoginMecanico
                    permission = 'mecanico'
                }else{
                    
                    const idLoginOficina = await app.db('oficina')
                        .where({ idLogin: login.id }).first()
                    if(isEmpty(idLoginOficina) == false){
                        user = idLoginOficina
                        permission = 'oficina'
                        console.log(idLoginOficina)
                    }else{
                        return res.status(400).send('O login ainda não está relacionado a um usuario')
                    }
                }
               
            }
            const now = Math.floor(Date.now() / 1000)   
            const payload = {
                id: user.id,
                idLogin: user.idLogin,
                permission: permission,
                iat: now,
                exp: now + (60 * 60 * 24 * 1)
            }
            
            
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
            
        }catch(msg){
            res.status(400).send(msg)
        }
        
        
    }
    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
        }
        res.send(false)
    }

    return { signin,validateToken }
}