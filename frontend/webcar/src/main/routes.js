import React from 'react'
import { AuthConsumer } from './provedorAutentificacao'

import Login from '../pages/Login';
import Oficina from '../pages/Oficina/Oficina';
import Cliente from '../pages/Cliente/Cliente';


import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }else{
                console.log(isUsuarioAutenticado)
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}

function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/oficina" component={Oficina} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/funcionario" component={Oficina} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cliente" component={Cliente} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)