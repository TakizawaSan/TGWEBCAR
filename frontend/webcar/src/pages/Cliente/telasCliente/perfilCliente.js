import React from 'react';
//{useState, useContext}
import { Card } from 'antd';
import { Layout, Breadcrumb,Row, Col, Tabs} from 'antd';


import '../../VisualPadrao.css'
const { TabPane } = Tabs;

const { Meta } = Card;
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
                    da
                    </Col>
                </Row>

            </TabPane>
            <TabPane tab="Manutenções em Andamento" key="2">
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>,
            </TabPane>
        </Tabs>
        </div>
    </Content>
  );
  
}
export default SiderDemo