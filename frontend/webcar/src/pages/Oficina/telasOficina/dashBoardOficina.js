import React, {useState} from 'react';
//{useState, useContext}
import { Typography, Button, Layout, Breadcrumb,Row, Tabs} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Table from '../../Components/DashTable'
import Form from '../../Components/DashForm'
import '../../VisualPadrao.css'

import manutencaoService from '../../../app/service/tabelas/manutencaoService'


const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;

function DashBC(props) {

    const [manutencaoAndamento, updateManutencaoAndamento] = useState([]);
    const [manutencaoFinalizada, updateManutencaoFinalizada] = useState([]);
    const [editarManutencao, updateEditarManutencao] = useState([]);
    const [renderTable, updateRenderTable] = useState(0);

    const buscaManutencao = async props => {
        let service = new manutencaoService()
        if(props != null){
            await service.obterManutencaoId(props)
            .then( response => updateEditarManutencao(response.data))
            .catch(erro => { console.log(erro) })
        }else{
            updateManutencaoAndamento([])
            updateManutencaoFinalizada([])
            await service.obterManutencao()
            .then( response => {
                response.data.map(manu =>(
                    manu.dataTermino != null ?  updateManutencaoFinalizada(searches => [...searches, manu]) : updateManutencaoAndamento(searches => [...searches, manu])
                ))})
            .catch(erro => { console.log(erro) })
        }
        
    };
    
    const cadastrarManutencao = async (manutencao) => {
        alert()
        let service = new manutencaoService()
        await service.cadastrarManutencao(manutencao)
        .then( response => { console.log(response)})
        .catch(erro =>   { console.log(erro) })
        buscaManutencao()
        updateRenderTable(0)
    }

    const handleEdit = async props => {
        console.log(props.target)
        await buscaManutencao(props)
        updateRenderTable(2)
    }

    const handleDelete = props =>{
        console.log(props.target)
    }
    
    const addClick = button => {
        if(renderTable < 2 ){
            renderTable < 1 ? updateRenderTable(1) : updateRenderTable(0)
        }else{
            console.log(button)
        }
        
    }
    
    const components = {
        0 : null,
        1 : <Form  updateRenderTable={updateRenderTable} cadastrarManutencao={cadastrarManutencao}/>,
        2 : <Form  updateRenderTable={updateRenderTable} cadastrarManutencao={cadastrarManutencao}
                   editarManutencao={editarManutencao} updateEditarManutencao={updateEditarManutencao}  />
    }
    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Oficica</Breadcrumb.Item>
                <Breadcrumb.Item>Manutenções</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Manutenções em Andamento</Title>} key="1">
                    <Button type={ renderTable < 1 ? "primary":"default" } 
                            onClick={addClick} className='btn-add' ><PlusOutlined rotate={renderTable ? 90:null}  /> Nova Manutenção </Button>
                    <Row>   
                        {components[renderTable]}
                    </Row>
                    <Row>
                        <Table
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            buscaManutencao={buscaManutencao} 
                            manutencao={manutencaoAndamento}/>
                    </Row>
                </TabPane>
                <TabPane tab={<Title level={5}>Manutenções Finalizadas</Title>} key="2">
                    <Table 
                        handleEdit={handleEdit} 
                        handleDelete={handleDelete}
                        buscaManutencao={buscaManutencao} 
                        manutencao={manutencaoFinalizada} />
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default DashBC