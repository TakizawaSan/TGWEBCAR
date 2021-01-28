import React, {useState, useContext}from 'react';
import Gravatar from 'react-gravatar'
import { Layout, Menu, Breadcrumb,Row, Col, Tabs} from 'antd';

import { Context } from '../Context/AuthContext'

import { 
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
    LogoutOutlined
}from '@ant-design/icons';

import './VisualPadrao.css'
const { TabPane } = Tabs;

const {  Content, Footer, Sider } = Layout;
//const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

function SiderDemo() {
  const { handleLogout } = useContext(Context)
  const [state, setState] = useState({collapsed: false})

  const onCollapse = collapsed => {
    console.log(collapsed);
    setState({ collapsed });
  };
  const { collapsed } = state;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          <Gravatar className="gravatar" size={60} email="diegorobertogs@hotmail.com" />
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />} >
          DashBoard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} disabled>
          Perfil
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />} disabled>
          Administração
          </Menu.Item>
          <Menu.Item key="4" onClick={handleLogout} icon={<LogoutOutlined rotate='180' />}>
          Sair
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Oficina</Breadcrumb.Item>
            <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-backgound" style={{ padding: 24, minHeight: 360 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Informações Gerais" key="1">
              <Row>
                <Col className="site-layout-background" span={12} offset={6}>
                col6
                </Col>
              </Row>
              
            </TabPane>
            <TabPane tab="Manutenções em Andamento" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>

            
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Web Car ©2020 Criado por Diego Roberto</Footer>
      </Layout>
    </Layout>
  );
  
}
export default SiderDemo