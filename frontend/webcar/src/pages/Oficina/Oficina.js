import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import { Layout } from "antd";

import  DashBoard  from './telasOficina/dashBoardOficina'
import  Perfil  from './telasOficina/perfilOficina'
import Atividade from './telasOficina/atividadeOficina'
import Sider from "../Components/Sider";


const { Content, Footer } = Layout;


function Oficina() {
  const components = {
    1: <DashBoard />,
    2: <Perfil />,
    3: <Atividade />
  };
  
  const [render, updateRender] = useState(1);
  
  const handleMenuClick = async menu => {
    updateRender(menu.key);
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

export default withRouter(Oficina)