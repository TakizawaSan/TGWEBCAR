const access = require('./access')
const passport = require('passport')

module.exports = app => {
    app.post('/signup', app.api.login.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/login')
        .all(app.config.passport.authenticate())
        .post(access(app.api.login.save))
        .get(access(app.api.login.get))

    app.route('/login/:id')
        .all(app.config.passport.authenticate())
        .put(access(app.api.login.save))
        .get(access(app.api.login.getById))

    app.route('/oficina')
        .all(app.config.passport.authenticate())
        .post(access(app.api.oficina.save))
        .get(access(app.api.oficina.get))

    app.route('/oficina/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.oficina.getById))
        .put(access(app.api.oficina.save))
        .delete(access(app.api.oficina.remove))

    app.route('/mecanico')
        .all(app.config.passport.authenticate())
        .post(access(app.api.mecanico.save))
        .get(access(app.api.mecanico.get))

    app.route('/mecanico/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.mecanico.getById))
        .put(access(app.api.mecanico.save))
        .delete(access(app.api.mecanico.remove))

    app.route('/cliente')
        .all(app.config.passport.authenticate())
        .post(access(app.api.cliente.save))
        .get(access(app.api.cliente.get))

    app.route('/cliente/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.cliente.getById))
        .put(access(app.api.cliente.save))
        .delete(access(app.api.cliente.remove))
    
    app.route('/AGNveiculo')
        .all(app.config.passport.authenticate())
        .post(access(app.api.veiculo.save))
        .get(access(app.api.veiculo.get))

    app.route('/AGNveiculo/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.veiculo.getById))
        .put(access(app.api.veiculo.save))
        .delete(access(app.api.veiculo.remove))

     app.route('/AGNmanutencao')
        .all(app.config.passport.authenticate())
        .post(access(app.api.manutencao.save))
        .get(access(app.api.manutencao.get))

    app.route('/AGNmanutencao/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.manutencao.getById))
        .put(access(app.api.manutencao.save))
        .delete(access(app.api.manutencao.remove))
    
    app.route('/AGNatividade')
        .all(app.config.passport.authenticate())
        .get(access(app.api.atividade.get))
        .post(access(app.api.atividade.save))

    app.route('/AGNatividade/tree')
        .all(app.config.passport.authenticate())
        .get(access(app.api.atividade.getTree))

    app.route('/AGNatividade/:id')
        .all(app.config.passport.authenticate())
        .get(access(app.api.atividade.getById))
        .put(access(app.api.atividade.save))
        .delete(access(app.api.atividade.remove))

}