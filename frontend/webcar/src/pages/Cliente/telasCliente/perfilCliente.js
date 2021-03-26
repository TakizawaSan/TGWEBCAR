import React from 'react';
import { Layout, Breadcrumb,Descriptions,Tabs,Typography} from 'antd';
const { TabPane } = Tabs;
const { Title } =  Typography;

const {  Content } = Layout;

function SiderDemo(props) {
  const infor = props.dados
  const veiculos = props.veiculos
  console.log(veiculos)
  const renderRows = () => {
    const veiculos = props.veiculos || []
    return veiculos.map( veiculo => (
        <React.Fragment key={veiculo.id} >
          <Descriptions.Item label="Descrição do Veiculo">{veiculo.descricao}</Descriptions.Item>
          <Descriptions.Item label="Placa">{veiculo.placa}</Descriptions.Item>
          <Descriptions.Item label="Ano">{veiculo.ano}</Descriptions.Item>
        </React.Fragment>
      ))
  }
  return (
    <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Cliente</Breadcrumb.Item>
            <Breadcrumb.Item>Perfil</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-backgound"  style={{ padding: 24, minHeight: 360 }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<Title level={5}>Perfil</Title>} key="1">
            <Descriptions title={<Title level={4}>Informações Pessoais</Title>} >
              <Descriptions.Item label="Nome">{infor.nome}</Descriptions.Item>
              <Descriptions.Item label="Telefone">{infor.telefone}</Descriptions.Item>
              <Descriptions.Item label="Localização">Ipua, São Paulo</Descriptions.Item>
              <Descriptions.Item label="Endereço">{infor.endereco}</Descriptions.Item>
              <Descriptions.Item label="Numero">{infor.numero}</Descriptions.Item>
              <Descriptions.Item label="Completo">{infor.complemento}</Descriptions.Item>
            </Descriptions>

            <Descriptions className='conf-descri' title={<Title level={4}>Veiculos Relacionados</Title>} >
            {renderRows()}
            </Descriptions>
            
            </TabPane>
          </Tabs>
        </div>
    </Content>
  );
  
}
export default SiderDemo