import React, {useState} from 'react';
//{useState, useContext}
import { Typography, Button, Layout, Breadcrumb,Row, Tabs} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Table from '../../Components/DashTable'
import Form from '../../Components/DashForm'
import '../../VisualPadrao.css'

const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;

function DashBC(props) {

    const [render, updateRender] = useState(false);
    const addClick = () => {
        updateRender(!render)
    };
    const { cadastrarManutencao } = props;
    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Oficica</Breadcrumb.Item>
                <Breadcrumb.Item>Manutenções</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Manutenções em Andamento</Title>} key="1">
                    <Button type={render ? "default":"primary"} onClick={addClick} className='btn-add' ><PlusOutlined rotate={render ? 90:null}  /> Nova Manutenção </Button>
                    <Row>   
                        {render ? 
                            <Form cadastro={cadastrarManutencao}/>
                        : null}
                    </Row>
                    <Row>
                        <Table />
                    </Row>
                </TabPane>
                <TabPane tab={<Title level={5}>Manutenções Finalizadas</Title>} key="2">
                    <Table />
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default DashBC