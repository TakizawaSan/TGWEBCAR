import React from 'react';
//{useState, useContext}
import { Typography, Layout, Breadcrumb,Row, Tabs, Button} from 'antd';
import CardComp from '../../Components/Card'
import '../../VisualPadrao.css'
const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;

function DashBC(props) {
    
    const Dados = { id: 5, title: 'Manuteção Preventiva', description: 'Breve descrição da atividade, sendo uma breve descrição o maximo ta auto mais não exagera'}
    const { handleClick } = props;
    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Cliente</Breadcrumb.Item>
                <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Informações Gerais</Title>} key="1">
                    <Row justify="center">
                        <CardComp {...Dados} handleClick={handleClick}></CardComp>
                        <Button key='4' type="primary" block onClick={handleClick} style={{marginTop:"1.5vh"}}> Detalhes </Button>  
                    </Row>
                </TabPane>
                <TabPane tab={<Title level={5}>Manutenção em Andamento</Title>} key="2">
                    <Row justify="center" gutter={24}>
                        <CardComp/>
                    </Row>
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default DashBC