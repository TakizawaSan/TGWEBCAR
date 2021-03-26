import React, {useState} from 'react';
//{useState, useContext}
import { Typography, Button, Layout, Breadcrumb,Row, Tabs} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Table from '../../Components/PerfilTable'
import Form from '../../Components/PerfilForm'
import '../../VisualPadrao.css'

const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;

function PerfilOficina(props) {

    const [render, updateRender] = useState(false);
    const addClick = () => {
        updateRender(!render)
    };
    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Oficina</Breadcrumb.Item>
                <Breadcrumb.Item>Clientes</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Edição de Clientes</Title>} key="1">
                    <Button type={render ? "default":"primary"} onClick={addClick} className='btn-add' ><PlusOutlined rotate={render ? 90:null}  /> Novo Cliente </Button>
                    <Row>   
                        {render ? 
                            <Form/>
                        : null}
                    </Row>
                    <Row>
                        <Table />
                    </Row>
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default PerfilOficina