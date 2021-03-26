import ApiService from '../../api'

class ManutencaoService extends ApiService {

    constructor(){
        super('')
        this.manutencao = `/AGNmanutencao`
    }
    obterManutencao(){
        return this.get(`${this.manutencao}`)
    }
    obterManutencaoId(id){
        return this.get(`${this.manutencao}/${id}`);
    }
    cadastrarManutencao(manutencao){
        return this.post(`${this.manutencao}`, manutencao)
    }
    
}

export default ManutencaoService;