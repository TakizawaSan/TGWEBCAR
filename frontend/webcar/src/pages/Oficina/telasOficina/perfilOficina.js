import React, {useState} from 'react';
//{useState, useContext}
import { Typography, Button, Layout, Breadcrumb,Row, Tabs} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Table from '../../Components/PerfilTable'
import Form from '../../Components/PerfilForm'
import '../../VisualPadrao.css'
import clienteService from '../../../app/service/tabelas/clienteService'

const { TabPane } = Tabs;
const { Title } =  Typography;
const { Content } = Layout;


function PerfilOficina() {
    function data(editarCliente){
        return(
        [
            {
                idLogin :  editarCliente ? editarCliente.idLogin: null,
                id: editarCliente ? editarCliente.id: null,
            },
            {
                name: ['usuario'],
                value: editarCliente ? editarCliente.usuario: '',
            },
            {
                name: ['senha'],
                value: editarCliente ? editarCliente.senha: '', 
            },
            {
                name: ['nome'],
                value: editarCliente ? editarCliente.nome: '',
            },
            {
                name: ['telefone'],
                value: editarCliente ? editarCliente.telefone: '', 
            },
            {
                name: ['endereco'],
                value: editarCliente ? editarCliente.endereco: '', 
            },
            {
                name: ['numero'],
                value: editarCliente ? editarCliente.numero: '', 
            },
            {
                name: ['complemento'],
                value: editarCliente ? editarCliente.complemento: '', 
            },
            {
                name: ['veiculos'],
                value: editarCliente ? editarCliente.veiculos: [], 
            }
            
            
        ]
        )
    }
    
    const [renderTable, updateRenderTable] = useState(0);
    const [veiculos, updateVeiculos] = useState([])
    const [clientes, updateClientes] = useState([]);  
    const [fields, setFields] = useState(data);
    
    const buscarCliente = async props => {
        let service = new clienteService()
        if(props != null){
            await service.obterClienteId(props)
                    .then( response => (buscarVeiculosLogin(response.data)))
                    .catch(erro => { console.log(erro) })
        }else{
            updateClientes([])
            setFields(data())
            await service.obterVeiculos()
            .then( response => { updateVeiculos(response.data)})
            .catch(erro => { console.log(erro) })
            await service.obterClientes()
            .then( response => {
                response.data.map(cliente =>(
                    updateClientes(searches => [...searches, cliente]) 
                ))})
            .catch(erro => { console.log(erro) })
        }
    }

    const buscarVeiculosLogin = async props =>{
        const dados = {usuario: '', senha:'XXXXX', veiculos: [], ...props}
        let service = new clienteService()
        await service.obterVeiculosCliente(props.id)
            .then( response => (dados.veiculos = response.data))
            .catch(erro => { console.log(erro) })
        await service.obterLoginId(props.idLogin)
            .then( response => (dados.usuario = response.data.usuario))
            .catch(erro => { console.log(erro) })
        console.log(dados)
        setFields(data(dados))
    }

    const cadastroCliente = async (login, cliente, veiculos) => {
        const service = new clienteService()
        
        await service.cadastrarLogin(login)
            .then( response => cliente.idLogin = response.data[0])
            .catch(erro =>   { console.log(erro) })
            
        await service.cadastrarCliente(cliente)
            .then( response => veiculos.map( vei => vei.idCliente = response.data[0]))
            .catch(erro =>   { console.log(erro) })

        await veiculos.map(veiculo => 
             service.cadastrarVeiculos(veiculo)
                .then(_ => { console.log('Veiculos Cadastrados Com Sucesso')})
                .catch(erro =>   { console.log(erro) })
        )
        buscarCliente()
        updateRenderTable(1)
    }

    const atualizarCliente = async (login, cliente, veiculo) => {
        console.log(fields[8].value.length)

        let service = new clienteService()
        async function attCliente(params) {
            await service.atualizarCliente(params)
                .then(_ => {return 'Cliente Atualizado com Sucesso'})
                .catch(erro =>   { console.log(erro) })
        }

        if(login.senha === 'XXXXX'){
            attCliente(cliente)
            buscarCliente()
            updateRenderTable(1)
        }else{
            const veiAlt = veiculo.filter(vei => vei.idCliente != null)
            const veiAdd = veiculo.filter(vei => vei.idCliente == null)
            const veiDel = Object.keys(fields[8].value)
            console.log([veiAlt, veiAdd, veiDel])
        }
       
        
    }

    const handleEdit = async props => {
        await buscarCliente(props)
        updateRenderTable(2)
    }

    const handleDelete = async props =>{
        let service = new clienteService()
        await service.deletarCliente(props)
            .then( response => { console.log(response)})
            .catch(erro =>   { console.log(erro) })
        buscarCliente()
    }
    const components = {
        0 : null,
        1 : <Form acao={cadastroCliente} fields={fields}  />,
        2 : <Form acao={atualizarCliente} fields={fields} />
    }
    const addClick = button => {
        if(renderTable < 2 ){
            renderTable < 1 ? updateRenderTable(1) : updateRenderTable(0)
        }else{
            console.log(button)
        }
        
    }
    return (
        <Content style={{ margin: '0 16px'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Oficina</Breadcrumb.Item>
                <Breadcrumb.Item>Pessoas</Breadcrumb.Item>
            </Breadcrumb>
            <div className="" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<Title level={5}>Cadastro de Clientes</Title>} key="1">
                    <Button type={renderTable ? "default":"primary"} onClick={addClick} className='btn-add' ><PlusOutlined rotate={renderTable ? 90:null}  /> Novo Cliente </Button>
                    <Row>   
                    {components[renderTable]}
                    </Row>
                    <Row>
                        <Table 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}
                            buscarCliente={buscarCliente} 
                            clientes={clientes}
                            veiculos={veiculos}
                            />
                    </Row>
                </TabPane>
                <TabPane tab={<Title level={5}>Cadastro de Mecanicos</Title>} key="2">
                </TabPane>
            </Tabs>
            </div>
        </Content>
    );
    
}
export default PerfilOficina