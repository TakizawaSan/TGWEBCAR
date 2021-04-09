import ApiService from '../../api'

class ManutencaoService extends ApiService {

    constructor(){
        super('')
        this.manutencao = `/AGNmanutencao`
        this.atividade = '/AGNatividade'
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

    obterAtividade(){
        return this.get(`${this.atividade}`)
    }
    obterAtividadeId(id){
        return this.get(`${this.atividade}/${id}`);
    }
    cadastrarAtividade(atividade){
        return this.post(`${this.atividade}`, atividade)
    }
    
}

export default ManutencaoService;