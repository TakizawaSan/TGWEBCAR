import ApiService from '../../api'

class UsuarioService extends ApiService {

    constructor(){
        super('')
        this.cliente = `/cliente`
        this.veiculo = `/AGNveiculo_cliente`
    }
    obterClientes(){
        return this.get(`${this.cliente}`)
    }
    obterDadosCliente(id){
        return this.get(`${this.cliente}/${id}`);
    }
    obterVeiculosCliente(id){
        return this.get(`${this.veiculo}/${id}`);
    }
    
}

export default UsuarioService;