import React, {useState} from 'react';
import { Typography, Button, Layout, Breadcrumb, Row, Tabs} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Table from '../../Components/AtivTable'
import Form from '../../Components/AtivForm'
import '../../VisualPadrao.css'

import atividadeService from '../../../app/service/tabelas/atividadeService'

const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;

function PerfilOficina(props) {
    function data(editarAtividade){
        return(
        [
            {
                id: editarAtividade ? editarAtividade.id: '',
            },
            {
                name: ['titulo'],
                value: editarAtividade ? editarAtividade.titulo: '',
            },
            {
                name: ['descricao'],
                value: editarAtividade ? editarAtividade.descricao: '', 
            },
            {
                name: ['tempoEstimado'],
                value: editarAtividade ? editarAtividade.tempoEstimado: 0, 
            }
        ]
        )
    }
    const [renderTable, updateRenderTable] = useState(0);  
    const [atividades, updateAtivdades] = useState([]);  
    const [fields, setFields] = useState(data);
      

    const buscarAtividade = async props => {
        let service = new atividadeService()
        if(props != null){
            await service.obterAtividadeId(props)
            .then( response => setFields(data((response.data))))
            .catch(erro => { console.log(erro) })
        }else{
            updateAtivdades([])
            setFields(data())
            await service.obterAtividade()
            .then( response => {
                response.data.map(atividade =>(
                    updateAtivdades(searches => [...searches, atividade]) 
                ))})
            .catch(erro => { console.log(erro) })
        }
        
    };
    
    const cadastroAtividade = async (manutencao) => {
        let service = new atividadeService()
        
        await service.cadastrarAtividade(manutencao)
            .then( response => { console.log(response)})
            .catch(erro =>   { console.log(erro) })
        buscarAtividade()
        updateRenderTable(1)
    }

    const atualizarAtividade = async (manutencao) => {
        let service = new atividadeService()
        await service.atualizarAtividade(manutencao)
            .then( response => { console.log(response)})
            .catch(erro =>   { console.log(erro) })
        buscarAtividade()
        updateRenderTable(1)
    }

    const handleEdit = async props => {
        console.log(props)
        await buscarAtividade(props)
        updateRenderTable(2)
    }

    const handleDelete = async props =>{
        let service = new atividadeService()
        await service.deletarAtividade(props)
            .then( response => { console.log(response)})
            .catch(erro =>   { console.log(erro) })
        buscarAtividade()
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
        1 : <Form acao={cadastroAtividade} fields={fields} />,
        2 : <Form acao={atualizarAtividade} fields={fields} />
    }

    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Oficina</Breadcrumb.Item>
                <Breadcrumb.Item>Atividades</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Atividades</Title>} key="1">
                    <Button type={renderTable ? "default":"primary"} onClick={addClick} className='btn-add' >
                        <PlusOutlined rotate={renderTable ? 90 : null}  /> Nova Atividade</Button>
                    <Row>   
                        {components[renderTable]}
                    </Row>
                    <Row>
                        <Table 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            buscarAtividade={buscarAtividade} 
                            atividades={atividades}/>
                    </Row>
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default PerfilOficina