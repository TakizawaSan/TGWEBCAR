import React from 'react';
import { Form, DatePicker, Row, Button } from 'antd';
import { Input, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const Forms = (props) =>{
  const { cadastro } = props;
  const onFinish = (fieldsValue) => {
    
    const values = {
      'dataIncial': fieldsValue['Inicio da Manutenção'].format('DD-MM-YYYY HH:mm'),
      'Atividades':[fieldsValue['Atividades']]  
    }
    console.log('Received values of form:', values);
    cadastro(values)
  };
  return(
    <Form name="time_related_controls" onFinish={onFinish}>
          <Form.Item name="Inicio da Manutenção" label="Inicio da Manutenção" {...config}>
            <DatePicker showTime format="DD-MM-YYYY HH:mm" />
          </Form.Item>
          <Form.Item name="veiculo"  label="Veiculo"
              rules={[{ required: true, message: 'Selecione um Veiculo' }]} >
              
              <Select placeholder="Selecione um veiculos" style={{paddingLeft: "1rem" }}  allowClear >
                <Option value="Astra Banco">Astra Banco</Option>
                <Option value="Astra Preto">Astra Preto</Option>
                <Option value="Um Ae ta ligado">Um Ae ta ligado</Option>
              </Select>
            </Form.Item>
          <Form.Item name="veiculo" label="Mecanico"
            rules={[{ required: true, message: 'Selecione um mecanico' }]} >
            
            <Select placeholder="Selecione o mecanico responsavel" allowClear >
              <Option value="Astra Banco">Joãozinho</Option>
              <Option value="Astra Preto">Pedrinho</Option>
              <Option value="Um Ae ta ligado">Carlinho</Option>
            </Select>
          </Form.Item>

          <Form.List name="Atividades">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8,  }} align="baseline">
                  <Form.Item
                    {...field}
                    className='inpForm'
                    name={[field.name, 'Fist']}
                    fieldKey={[field.fieldKey, 'Fist']}
                    rules={[{ required: true, message: 'Selecione Uma Atividade' }]}
                  >
                    <Select
                      placeholder="Selecione uma Atividade"
                      allowClear
                    >
                      <Option value="male">Troca de Pneu</Option>
                      <Option value="female">Troca de Oleo</Option>
                      <Option value="other">Imprevisto</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    className='inpForm'
                    name={[field.name, 'comentario']}
                    fieldKey={[field.fieldKey, 'comentario']}
                    rules={[{ required: true, message: 'Não Esqueça o comentario' }]}
                  >
                    <Input placeholder="Comentario" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item style={{justifyItems:'center'}}>
                  <Row justify='center'>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Adicionar Atividade
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
const FormEdit = () => {
  return (
    <Collapse bordered={false}  className='form'  defaultActiveKey={['1']}>
      <Panel header="Criar uma nova manutenção do zero"  key="1">
        <Forms/>
      </Panel>
      <Panel header="Nova Manutenção baseada em uma já exitente" key="2">
        <Select
          className='form'
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
          }
        >
          <Option value="1">Not Identified</Option>
          <Option value="2">Closed</Option>
          <Option value="3">Communicated</Option>
          <Option value="4">Identified</Option>
          <Option value="5">Resolved</Option>
          <Option value="6">Cancelled</Option>
        </Select>
        <Forms />
      </Panel>
  </Collapse>
    
  );
};

export default FormEdit