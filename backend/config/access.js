module.exports = middleware => {
    return ( req, res, next ) => {
        if(req.user.permission) {
            const permission = req.user.permission
            const route = req.route.path
            if(permission == 'cliente'){
                if(route.match(/cliente/) || route.match(/AGN/)){
                    middleware(req, res, next)
                }else{
                    res.status(401).send('Usuario não possue permissão')
                }
            }else if(permission == 'mecanico'){
                if(route.match(/mecanico/) || route.match(/AGN/)){
                    middleware(req, res, next)
                }else{
                    res.status(401).send('Usuario não possue permissão')
                }
            }else if(permission == 'oficina'){
                middleware(req, res, next)
            }else{

            }
            
        } else {
            res.status(401).send('Permissão Invalida')
        }
    }
}