import React from 'react'
import { Progress } from 'antd';
import { Layout, Breadcrumb,Descriptions,Tabs,Typography} from 'antd';
import '../../VisualPadrao.css'
const { TabPane } = Tabs;
const { Title } =  Typography;

const {  Content } = Layout;

function Detalhes(props) {
    return (
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Cliente</Breadcrumb.Item>
            <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
            <Breadcrumb.Item>Detalhes</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-backgound"  style={{ padding: 24, minHeight: 360 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<Title level={5}>Detalhes do Pedido</Title>} key="1">
            <Progress type="circle" percent={75} />

            </TabPane>
          </Tabs>
        </div>
    </Content>
    );

     

}

export default Detalhes 