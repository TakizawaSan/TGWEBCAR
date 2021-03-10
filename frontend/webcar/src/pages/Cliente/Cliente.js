import React, { useState, useContext } from 'react';
import { Layout } from "antd";
import  DashBoard  from './telasCliente/dashBoardCliente'
import  Perfil  from './telasCliente/perfilCliente'
import Sider from "../Components/Sider"
import Detalhes from './telasCliente/detalhes'

import { AuthContext  } from '../../main/provedorAutentificacao'
// import LocalStorageService from '../../app/service/localstorageService'
import { withRouter } from 'react-router-dom'


const { Content, Footer } = Layout;


function Cliente() {
  const Context = useContext(AuthContext)

  const [render, updateRender] = useState(1);
  
  const handleMenuClick = menu => {
    console.log(menu.key)
    updateRender(menu.key);
  };
  const handleCompClick = (props) => {
    //console.log(props.target.value)
    //console.log(props.target.id)
    updateRender(props.target.value);
  }
  const components = {
    1: <DashBoard handleClick={handleCompClick} />,
    2: <Perfil />,
    4: <Detalhes />
  };
  return (
    <div className="APP">
       <Layout style={{ minHeight: "100vh"}}>
        <Sider handleClick={handleMenuClick} />
        <Layout className="site-layout " id='layout'>
          <Content className="back" style={{overflow: 'initial'}} >{components[render]}</Content>
          <Footer className="back-foo" style={{ textAlign: 'center' }}>Web Car ©2020 Criado por Diego Roberto</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Cliente)