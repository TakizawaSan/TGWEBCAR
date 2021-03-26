import React from 'react'

import AuthService from '../app/service/authService'
import LocalStorageService from '../app/service/localstorageService'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;


const AuthProvider = AuthContext.Provider;
const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
console.log(usuarioLogado)
const statusLogin = usuarioLogado ? true:false
class ProvedorAutenticacao extends React.Component{
    
    state = {
        usuarioAutenticado: null,
        isAutenticado: statusLogin
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario })
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({ isAutenticado: false, usuarioAutenticado: null})
    }

    render(){
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto} >
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;