import React from 'react';
import { View,  StyleSheet, ScrollView,} from 'react-native';
import * as Progress from 'react-native-progress';
import {  Card, Title, Colors } from 'react-native-paper';
import CardList from '../componentes/cardList'

const Detalhes = ({route}) => {
  const { resultado } = route.params;
  const porcentage= parseFloat(JSON.stringify(resultado))
  const status =  porcentage < 1 ? "Em Andamento" : "Finalizado";
  //color={Colors.blue500}
  return <View style={{}}>
    <ScrollView>
      <Card style={[styles.card]}>
        <Card.Actions>
        <Progress.Circle size={80} progress={porcentage} showsText={true} 
          formatText={() => { return `${porcentage * 100}%` }}
        />
        <Title style={[styles.title]}>{status}</Title>
        </Card.Actions>
       
      </Card>

      <CardList 
        date='10 Agosto' title='Troca de Peça'
        description='Mola da suspensão' 
        color={Colors.blue500}>
      </CardList>
      <CardList 
        date='10 Agosto' title='Troca de Peça'
        description='Mola da suspensão' 
        color={Colors.blue500}>
      </CardList>
      <CardList 
        date='10 Agosto' title='Troca de Peça'
        description='Mola da suspensão' 
        color={Colors.grey600}>
      </CardList>
      <CardList 
        date='10 Agosto' title='Troca de Peça'
        description='Mola da suspensão' 
        color={Colors.grey600}>
      </CardList>
      <CardList 
        date='10 Agosto' title='Troca de Peça'
        description='Mola da suspensão' 
        color={Colors.grey600}>
      </CardList>

    
      
    </ScrollView>
  </View>
      
}
const styles = StyleSheet.create({
  card:{
    margin:8,
    padding:10,
    justifyContent: 'center', 
    alignItems: 'flex-start'
  },
  title:{
    paddingLeft:10
  },

})
export default Detalhes;