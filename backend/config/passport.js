const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromHeader('authorization')
    }
    
    const strategy = new Strategy(params, (payload, done) => {
        app.db('login')
            .where({ id: payload.idLogin })
            .first()
            .then(user => done(null, user ? { ...payload} : false))
            .catch(err => done(err, false))
    })
    passport.use(strategy)
    return { 
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}