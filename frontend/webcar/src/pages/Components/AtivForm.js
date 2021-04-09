import React from 'react';
import { Form, Button } from 'antd';
import { Input, InputNumber } from 'antd';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const Forms = ({ fields, acao }) =>{

  const onFinish = (fieldsValue) => {
    const values = fields[0].id === '' ? fieldsValue : { id: fields[0].id, ...fieldsValue}
    console.log('Received values of form:', values);
    acao(values)
  };
  return(
    <Form name= "time_related_controls" onFinish={onFinish} 
          fields={fields}> 
      <Form.Item 
        label="Titulo"
        className='inpForm'
        name='titulo'
        fieldKey='titulo'
        rules={[{ required: true, message: 'Ex: Troca de Peça' }]}
      >
        <Input placeholder="Titulo da Atividade"  />
      </Form.Item>
      <Form.Item 
        label="Descrição"
        className='inpForm'
        name='descricao'
        fieldKey='descricao'
        rules={[{ required: true, message: 'Ex Falha ao ligar o Motor' }]}
      >
        <Input placeholder="Descrição da Atividade "  />
      </Form.Item>
      <Form.Item 
        label="Tempo Estimidado"
        className='inpForm'
        name='tempoEstimado'
        type='number'
        fieldKey='tempoEstimado'
        rules={[{ required: true,  message: 'Ex: 32h' }]}
      >
        <InputNumber formatter={value => `${value} horas`}
                      min={0} style={{width:'30%'}}
                      parser={value => value.replace('horas', '')} 
                      placeholder="Tempo Estimidado da Atividade" />
      </Form.Item>

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
      <Panel header={fields[0].id === '' ? "Nova Atividade":'Editar Atividade' }  key="1">
        <Forms  acao={ acao } fields={fields}  />
      </Panel>
  </Collapse>
    
  );
  
};

export default FormEdit