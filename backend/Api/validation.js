module.exports = app => {
    function existsOrError(value, msg) {
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if(valueA !== valueB) throw msg
    }

    async function useLogin (value){ 
         
        try{
            const idLoginOficina = await app.db('oficina')
            .where({ idLogin: value.idLogin }).first()
            
            const idLoginMecanico = await app.db('mecanico')
                .where({ idLogin: value.idLogin }).first()

            const idLoginCliente = await app.db('cliente')
                .where({ idLogin: value.idLogin }).first()
            
            try{
                notExistsOrError(idLoginOficina, 'Login já está sendo utilizado')
                await notExistsOrError(idLoginMecanico, 'Login já está sendo utilizado')
                await notExistsOrError(idLoginCliente, 'Login já está sendo utilizado')
            }catch(msg){
                console.log('Cheguei 1')
                return
            }
            
        }catch(msg){
            res.status(400).send(msg)
        }

        
    }
    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }
    return { existsOrError, notExistsOrError, equalsOrError, useLogin,isEmpty}
}