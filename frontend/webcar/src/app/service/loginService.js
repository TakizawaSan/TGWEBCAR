import ApiService from '../api'

class LoginService extends ApiService {
    constructor(){
        super('')
        this.login = `/signin`
    }
    
    handleLogin(props){
        return this.post(this.login, props)
    }

}
export default LoginService