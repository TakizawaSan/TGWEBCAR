import React from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph,Divider,Avatar } from 'react-native-paper'; 
import { Input } from 'react-native-elements';

const PerfilPessoal = (prop) => {
    return(  
          <>
                <Card.Content style={[styles.content]}>
                  <Avatar.Icon size={100} icon="face" />
                    <Title style={[styles.paragraph]}>{prop.name}</Title>
                </Card.Content>
              <Divider style={[styles.divider]} />  
              <Card.Actions>
                <Avatar.Icon size={30} icon="format-list-bulleted-square" />
                <Title>  Informações Pessoais</Title>
              </Card.Actions>
              <Input
                  disabled={true}
                  label='Telefone'
                >
                {prop.tel}</Input>
              <Input
                  disabled={true}
                  label='Endereço'
                  inputContainerStyle={{size:500}}>
                {prop.end}</Input>
              <Card.Actions>
                <Input
                  disabled={true}
                  label='Numero'
                  containerStyle={{width:'50%'}}
                  >
                {prop.num}</Input>
                <Input
                  disabled={true}
                  label='Complemento'
                  containerStyle={{width:'50%'}}
                >
                {prop.comp}</Input>
              </Card.Actions>
          <Divider style={[styles.divider]} />
        </>)
}
const PerfilVeiculos = (prop) => { 
  return(
    <>
        <Input
            disabled={true}
            label='Descrição do Veiculo'
            >
            {prop.desc}</Input>
        <Card.Actions>
            <Input
            disabled={true}
            label='Placa'
            containerStyle={{width:'50%'}}
            >
            {prop.placa}</Input>
            <Input
            disabled={true}
            label='Ano'
            containerStyle={{width:'50%'}}
            >
            {prop.ano}</Input>
            
        </Card.Actions>
        <Divider style={[styles.dividerV]} />
        
    </>)
}
const Perfil = (Objetos) =>{
  const pessoal = Objetos.objP
  const veiculo = Objetos.objV
  const rows = []
  for(let i=0; i< veiculo.length ; i++){
    rows.push(
      <PerfilVeiculos 
      desc={veiculo[i].desc}
      placa={veiculo[i].placa}
      ano={veiculo[i].ano}
    />
    )
  }
  return (
    <>
    <Card style={[styles.container]}>
      <PerfilPessoal 
        name= {pessoal.name} 
        tel={pessoal.tel} 
        end={pessoal.end} 
        num={pessoal.num} 
        comp={pessoal.comp} />
        <Input
        disabled={true}
        label='Descrição do Veiculo'>
        </Input>
        <Card.Actions >
          <Avatar.Icon size={30} icon="format-list-bulleted-square" />
          <Title>  Veiculos Cadastrados</Title>
        </Card.Actions>
       {rows}
    </Card>
    </>
  )
}

export default Perfil;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:2,
      margin:5,
      paddingTop:15,
      padding:15,
    },
    paragraph:{
      textAlign:"justify",
      fontSize:25,
      height:'auto',
      marginBottom:6
    },
    content:{
      alignItems:"center"
    },
    divider:{
      borderWidth:0.3,
      marginBottom:10
    },
    dividerV:{
      borderWidth:0.8,
      marginBottom:10,
      width:'95%',
      alignSelf:'center'
    }
  
  })
