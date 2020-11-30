import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//import history from './history'
import { Context } from './Context/AuthContext'

import Login from './pages/Login';
import Oficina from './pages/Oficina';
import Mecanico from './pages/Mecanico';
import Cliente from './pages/Cliente';

import SiderDemo from './pages/VisualPadrao';

function CustomRoute({ isPrivate, ...rest}){
  const { loading, authenticated  } = useContext(Context)
  if(loading){
    return <h1>loading... </h1>;
  }

  if(isPrivate && !authenticated ){
    return <Redirect to='/login'/>
  }
  // if(permissionCamaleao === 'cliente' && rest.path.match(/cliente/)){
  //   return <Route {...rest} />;
  // }else if(permissionCamaleao === 'oficina' && rest.path.match(/oficina/)){
  //   return <Route {...rest} />;
  // }else if(permissionCamaleao === 'mecanico' && rest.path.match(/mecanico/)){
  //   return <Route {...rest} />;
  // }else{
  //     history.goBack();
  // }
  
  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute isPrivate exact path="/oficina" component={Oficina} />
      <CustomRoute isPrivate exact path="/mecanico" component={Mecanico} />
      <CustomRoute isPrivate exact path="/cliente" component={Cliente} />
      <CustomRoute exact path="/teste" component={SiderDemo} />
    </Switch>
  );
}