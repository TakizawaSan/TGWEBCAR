import ApiService from '../api'

class UsuarioService extends ApiService {

    constructor(){
        super('/cliente')
    }
    obterDadosCliente(id){
        return this.get(`/${id}`);
    }

}

export default UsuarioService;