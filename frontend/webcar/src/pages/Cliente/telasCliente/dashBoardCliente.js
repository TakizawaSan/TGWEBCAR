import React from 'react';
//{useState, useContext}
import { Card, Avatar,Typography } from 'antd';
import { Layout, Breadcrumb,Row, Col, Tabs} from 'antd';


import '../../VisualPadrao.css'
const { TabPane } = Tabs;
const { Title } =  Typography;
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
                <Row gutter={24}>
                    <Col className="site-layout-background" style={{backgroundColor:'#F5F5F5'}}  span={14}>
                    <Card hoverable>
                        <Meta 
                            title={<Title level={3}>Manutenção do Motor</Title>} 
                            description="Breve descrição da atividade, sendo uma breve descrição no maximo ta auto mais não exagera" />
                    </Card>,
                    </Col>
                </Row>

            </TabPane>
            <TabPane tab="Manutenções em Andamento" key="2">
                <Row gutter={25}>
                    <Col className="gutter-row" span={8}>
                    <Card
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    
                    >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                    </Card>
                    </Col>

                    <Col className="gutter-row" span={8}>
                    <Card
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                   
                    >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                    </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                    <Card
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                    </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
        </div>
    </Content>
  );
  
}
export default SiderDemo