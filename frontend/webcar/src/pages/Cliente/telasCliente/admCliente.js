import React from 'react';
//{useState, useContext}
import { Layout, Breadcrumb,Row, Col, Tabs} from 'antd';

import '../../VisualPadrao.css'
const { TabPane } = Tabs;

const {  Content } = Layout;
//const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

function SiderDemo() {
  
  return (
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
  );
  
}
export default SiderDemo