import React from 'react';
import { Layout, Breadcrumb,Descriptions,Tabs,Typography} from 'antd';
import LocalStorageService from '../../../app/service/localstorageService'
import clienteService from '../../../app/service/clienteService'
import '../../VisualPadrao.css'
const { TabPane } = Tabs;
const { Title } =  Typography;

const {  Content } = Layout;

function SiderDemo() {
  const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
  console.log(usuarioLogado.id)
  const onFinish = async (values)=> {
    let service = new clienteService()
    await service.obterDadosCliente( 
      usuarioLogado.id
    ).then( response => {
        console.log(response)
    }).catch(erro => {
      alert(erro)
    })
  }; 
  onFinish()
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
              <Descriptions.Item label="Nome">Marcelo Rocha</Descriptions.Item>
              <Descriptions.Item label="Telefone">(16) 99999-99999</Descriptions.Item>
              <Descriptions.Item label="Localização">Ipua, São Paulo</Descriptions.Item>
              <Descriptions.Item label="Endereço"> Rua João Clemente </Descriptions.Item>
              <Descriptions.Item label="Numero">1589</Descriptions.Item>
              <Descriptions.Item label="Completo">Fundo</Descriptions.Item>
            </Descriptions>

            <Descriptions className='conf-descri' title={<Title level={4}>Veiculos Relacionados</Title>} >
              <Descriptions.Item  label="Descrição do Veiculo">Astra Petro</Descriptions.Item>
              <Descriptions.Item label="Placa">ADS124</Descriptions.Item>
              <Descriptions.Item label="Ano">2000</Descriptions.Item>
            </Descriptions>
            </TabPane>
          </Tabs>
        </div>
    </Content>
  );
  
}
export default SiderDemo