import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'

import { Layout } from "antd";

import  DashBoard  from './telasOficina/dashBoardOficina'
import  Perfil  from './telasOficina/perfilOficina'
import Atividade from './telasOficina/atividadeOficina'
import Sider from "../Components/Sider";

import manutencaoService from '../../app/service/tabelas/manutencaoService'

const { Content, Footer } = Layout;


function Oficina() {
  const [manutencao, updateManutencao] = useState({andamento:[], finalizada:[]});
  // buscas no banco
  const buscaManutenção = async ()=> {
    let service = new manutencaoService()
    await service.obterManutencao()
    .then( response => {
      response.data.map(manu =>(
        updateManutencao(
          {andamento: manu.dataTermino? null : manu,
          finalizada: manu.dataTermino? manu : null})
      ))
    }).catch(erro => {
        console.log(erro)
    })
  };
  const cadastrarManutencao = async (manutencao) =>{
    alert()
    let service = new manutencaoService()
    await service.cadastrarManutencao(manutencao)
    .then( response => {
        console.log(response)
    }).catch(erro => {
        console.log(erro)
    })
  }
  console.log(manutencao)
  
  // Menu
  const components = {
    1: <DashBoard cadastrarManutencao={cadastrarManutencao} />,
    2: <Perfil />,
    3: <Atividade />
  };
  
  const [render, updateRender] = useState(1);

  const handleMenuClick = menu => {
    buscaManutenção()
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