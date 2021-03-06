import React from 'react';
import { Form, Row, Button } from 'antd';
import { Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Divider } from 'antd';

const { Panel } = Collapse;

const Forms = ({ fields, acao }) =>{
  
  const onFinish = (fieldsValue) => {
    const login = { usuario : fieldsValue.usuario, senha: fieldsValue.senha }
    const cliente = { nome: fieldsValue.nome, telefone: fieldsValue.telefone, endereco: fieldsValue.endereco,
                      numero: fieldsValue.numero, complemento: fieldsValue.complemento, id: fields[0].id, idLogin: fields[0].idLogin}
    const veiculo = fieldsValue.veiculos.map(vei => ({idCliente: null, ...vei}))

    console.log('Received values of form:', veiculo);

    acao(login, cliente, veiculo)
  };
  return(
    <Form name="time_related_controls" onFinish={onFinish} fields={fields}> 
      <Divider style={{marginTop:2}} orientation='left' dashed  >Login</Divider>

      <Space key={0} style={{ display: 'flex', paddingLeft:0, marginTop:"1rem"}}>
      <Form.Item 
        label="Usuario"
        className='inpFor'
        name='usuario'
        fieldKey='usuario'
        rules={[{ required: true, message: 'Ex: Joãozinho2020' }]}
      >
        <Input placeholder="Usuario do cliente" />
      </Form.Item>
      <Form.Item 
        label="Senha"
        className='inpFor'
        name='senha'
        fieldKey='senha'
        rules={[{ required: true, message: 'Ex: #123Adca' }]}
      >
        <Input placeholder="Senha do Cliente" />
      </Form.Item>
      </Space>

      <Divider style={{marginTop:3}} orientation='left' dashed  >Dados</Divider>

      <Form.Item 
        label="Nome"
        className='inpForm'
        name='nome'
        fieldKey='nome'
        rules={[{ required: true, message: 'Ex: Joãozinho' }]}
      >
        <Input placeholder="Nome do Cliente"  />
      </Form.Item>
      <Form.Item 
        label="Telefone"
        className='inpForm'
        name='telefone'
        fieldKey='telefone'
        rules={[{ required: true, message: 'Ex: (16) 98171-4512' }]}
      >
        <Input placeholder="Numero do telefone"  />
      </Form.Item>
      <Form.Item 
        label="Endereço"
        className='inpForm'
        name='endereco'
        fieldKey='endereco'
        rules={[{ required: true, message: 'Ex: Avenida Alberto Conrado' }]}
      >
        <Input placeholder="Endereco da Residencia" />
      </Form.Item>
      <Form.Item 
        label="Numero"
        className='inpForm'
        name='numero'
        fieldKey='numero'
        rules={[{ required: true, message: 'Ex: 1545' }]}
      >
        <Input placeholder="Numero da Residencia" />
      </Form.Item>
      <Form.Item 
        label="Complemento"
        className='inpForm'
        name='complemento'
        fieldKey='complemento'
        rules={[{ required: true, message: 'Ex: Fundo' }]}
      >
        <Input placeholder="Numero da Residencia" />
      </Form.Item>
      
      <Divider style={{marginTop:3}} orientation='left' dashed  > Veiculos </Divider>
      <Form.List name="veiculos">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8, paddingLeft:0 }} align="baseline">
              <Form.Item
                {...field}
                className='inpForm'
                name={[field.name, 'descricao']}
                fieldKey={[field.fieldKey, 'descricao']}
                rules={[{ required: true, message: 'Ex: Astra Preto' }]}
              >
                <Input placeholder="Descrição" />
              </Form.Item>
              <Form.Item
                {...field}
                className='inpForm'
                name={[field.name, 'placa']}
                fieldKey={[field.fieldKey, 'placa']}
                rules={[{ required: true, message: 'Ex: ASD1456' }]}
              >
                <Input placeholder="Placa" />
              </Form.Item>
              <Form.Item
                {...field}
                className='inpForm'
                name={[field.name, 'ano']}
                fieldKey={[field.fieldKey, 'ano']}
                rules={[{ required: true, message: 'Ex: 2020' }]}
              >
                <Input placeholder="Ano" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item style={{justifyItems:'center'}}>
              <Row justify='center'>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar veiculos
              </Button>
              </Row>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" className='btn ' htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  )
}
const FormEdit = props => {
  const { acao, fields } = props
  return (
    <Collapse bordered={false}  className='form'  defaultActiveKey={['1']}>
    <Panel header={fields[0].idCliente === '' ? "Novo Cliente":'Editar Cliente' }  key="1">
      <Forms  acao={acao} fields={fields}  />
    </Panel>
</Collapse>
  
    
  );
};

export default FormEdit