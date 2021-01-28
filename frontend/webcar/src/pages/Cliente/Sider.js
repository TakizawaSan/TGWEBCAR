import React, {useState, useContext}from 'react';
import Gravatar from 'react-gravatar'
import { Layout, Menu} from 'antd';

import { Context } from '../../Context/AuthContext'

import { 
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined
}from '@ant-design/icons';

import '../VisualPadrao'

//const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

function SiderDemo(props) {
  // Barra Lateral
  const { handleLogout } = useContext(Context)
  const [state, setState] = useState({collapsed: false})
  const onCollapse = collapsed => {
    setState({ collapsed });
  };
  const { collapsed } = state;
  //Content
  const { handleClick } = props;

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <Gravatar className="gravatar" size={60} email="diegorobertogs@hotmail.com" />
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
          <Menu.Item key="1" onClick={handleClick} icon={<PieChartOutlined />} >
          DashBoard
          </Menu.Item>
          <Menu.Item key="2" onClick={handleClick} icon={<UserOutlined />}>
          Perfil
          </Menu.Item>
          <Menu.Item key="3" onClick={handleClick} icon={<DesktopOutlined />}>
          Administração
          </Menu.Item>
          <Menu.Item key="4" onClick={handleLogout} icon={<LogoutOutlined rotate='180' />}>
          Sair
          </Menu.Item>
        </Menu>
      
    </Layout.Sider>
  );
  
}

export default SiderDemo