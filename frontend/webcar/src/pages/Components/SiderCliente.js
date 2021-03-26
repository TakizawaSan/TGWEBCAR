import React, {useState, useContext}from 'react';
import Gravatar from 'react-gravatar'
import { Layout, Menu} from 'antd';

import { AuthContext  } from '../../main/provedorAutentificacao'

import { 
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined
}from '@ant-design/icons';


function SiderComp(props) {
  // Barra Lateral
  const [state, setState] = useState({collapsed: true})
  const onCollapse = collapsed => {
    setState({ collapsed });
  };
  const { collapsed } = state;
  //Content
  const { handleClick } = props;
  const { encerrarSessao } = useContext(AuthContext)
  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}  >
        <div className="logo">
          <Gravatar className="gravatar" size={60} email="diegoroberts@hotmail.com" />
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
          <Menu.Item key="1" onClick={handleClick} icon={<PieChartOutlined />} >
          DashBoard
          </Menu.Item>
          <Menu.Item key="2" onClick={handleClick} icon={<UserOutlined />}>
          Perfil
          </Menu.Item>
          <Menu.Item onClick={encerrarSessao} icon={<LogoutOutlined rotate='180' />}>
          Sair
          </Menu.Item>
        </Menu>
      
    </Layout.Sider>
  );
  
}

export default SiderComp