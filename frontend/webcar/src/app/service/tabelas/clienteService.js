import ApiService from '../../api'

class UsuarioService extends ApiService {

    constructor(){
        super('')
        this.login = '/login'
        this.cliente = `/cliente`
        this.veiculo = `/AGNveiculo`
        this.veiculo_cliente = `/AGNveiculo_cliente`
    }
    
    //Clientes
    obterClientes(){
        return this.get(`${this.cliente}`)
    }
    obterClienteId(id){
        return this.get(`${this.cliente}/${id}`);
    }
    cadastrarCliente(cliente){
        return this.post(`${this.cliente}`, cliente)
    }
    atualizarCliente(cliente){
        return this.put(`${this.cliente}/${cliente.id}`, cliente)
    }
    deletarCliente(id){
        return this.delete(`${this.cliente}/${id}`)
    }
    // Veiculos
    obterVeiculos(){
        return this.get(`${this.veiculo}`)
    }
    obterVeiculosCliente(id){
        return this.get(`${this.veiculo_cliente}/${id}`);
    }
    cadastrarVeiculos(login){
        return this.post(`${this.veiculo}`, login)
    }
    // Login

    obterLogin(){
        return this.get(`${this.login}`)
    }
    obterLoginId(id){
        return this.get(`${this.login}/${id}`);
    }
    cadastrarLogin(login){
        return this.post(`${this.login}`, login)
    }
}

export default UsuarioService;