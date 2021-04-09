import ApiService from '../../api'

class AtividadeService extends ApiService {

    constructor(){
        super('')
        this.atividade = '/AGNatividade'
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
    atualizarAtividade(atividade){
        return this.put(`${this.atividade}/${atividade.id}`, atividade)
    }
    deletarAtividade(id){
        return this.delete(`${this.atividade}/${id}`)
    }
    
}

export default AtividadeService;