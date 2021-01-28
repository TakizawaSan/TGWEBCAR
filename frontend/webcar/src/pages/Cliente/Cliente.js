import React, { useState, useEffect, useContext } from 'react';

import api from '../../api';
import { Layout } from "antd";
import { Context } from '../../Context/AuthContext'

import  DashBoard  from './telasCliente/dashBoardCliente'
import  Perfil  from './telasCliente/perfilCliente'
import  Adm  from './telasCliente/admCliente'
import '../VisualPadrao'
import Sider from "./Sider";

const { Content, Footer } = Layout;


export default function Users() {

  const { idCamelao } = useContext(Context)
  const [cliente, setCliente] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/cliente/${idCamelao}`)
      setCliente(data);
    })();
  }, []);
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
       <Layout style={{ minHeight: "100vh" }}>
        <Sider handleClick={handleMenuClick} />
        <Layout className="site-layout" id='layout'>
          <Content>{components[render]}</Content>
          <Footer style={{ textAlign: 'center' }}>Web Car ©2020 Criado por Diego Roberto</Footer>
        </Layout>
      </Layout>
    </div>
  );
}