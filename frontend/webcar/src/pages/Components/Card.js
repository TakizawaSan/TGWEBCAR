import React from 'react';

import { Card,Typography, Button , Progress, Col } from 'antd';

const { Title } =  Typography;
const { Meta } = Card;

function CardComp(props) {
  const { handleClick } = props;
  return (
    <React.Fragment>
    <Col className="site-layout-background" style={{}}  span={24}>
    <Card className='site-layout-card' hoverable style={{minWidth:"100%"}}>
        <Meta 
            title={<Title level={4}>{props.title}</Title>} 
            description={props.description}     
            />
        <Progress strokeColor={{ from: '#108ee9', to: '#87d068',}} percent={88} status="active"/>
               
        <Button id={props.id} value={4} onClick={handleClick}  type="primary" block style={{marginTop:"1.5vh"}}> Detalhes </Button>  

    </Card>
    </Col>
    </React.Fragment> 
  )
  
}
export default CardComp