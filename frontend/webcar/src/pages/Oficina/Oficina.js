import React, { useState } from 'react';

import { Layout } from "antd";

import  DashBoard  from './telasOficina/dashBoardOficina'
import  Perfil  from './telasOficina/perfilOficina'
import Adm from './telasOficina/adm'
import Sider from "../Components/Sider";

const { Content, Footer } = Layout;


export default function Users() {

  const components = {
    1: <DashBoard />,
    2: <Perfil />,
    3: <Adm />
  };
  
  const [render, updateRender] = useState(1);

  const handleMenuClick = menu => {
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