import React, {useContext} from 'react';
import { Card, Button  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout, Row, } from 'antd';
import { Form, Input, Checkbox } from 'antd';

import { AuthContext  } from '../main/provedorAutentificacao'
// import LocalStorageService from '../app/service/localstorageService'
import LoginService from '../app/service/tabelas/loginService'
import { withRouter } from 'react-router-dom'


const {  Content } = Layout;

function Login(props) {
  // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
  // console.log(usuarioLogado)
  const Context = useContext(AuthContext)

  const onFinish = async (values)=> {
    let service = new LoginService()
    await service.handleLogin({
      usuario: values.usuario,
      senha:   values.senha

    }).then( response => {
        const { data: { token, id, permission }} = response
        Context.iniciarSessao({token: token, id: id})
        props.history.push(`/${permission}`)
        
    }).catch(erro => {
      alert(erro)
    })
  }; 

  return (
    <Content style={{ margin: '0 16px'}}>
        <div className="site-layout-backgound" style={{ padding: 24, minHeight: 360, backgroundColor:''}}>
        
          <Row justify="center" >
            <Card className='site-layout-card' hoverable style={{minWidth:"33%"}}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="usuario"
                rules={[
                  {
                    required: true,
                    message: 'Por favor digite o Usuario!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
              </Form.Item>
              <Form.Item
                name="senha"
                rules={[
                  {
                    required: true,
                    message: 'Por favor digite a senha!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Senha"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Lembre de mim</Checkbox>
                </Form.Item>

                <a className="login-form-forgot">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Entrar
                </Button>
                Ou <a href="">Registre-se!</a>
              </Form.Item>
            </Form>
            </Card>
  
          </Row>
        </div>
      </Content>
  )
    
}
export default withRouter(Login)
