/* eslint-disable prettier/prettier */
import React from 'react';
import {  StyleSheet } from 'react-native';
import { Card,  Paragraph, List } from 'react-native-paper';

function cardList(text){
    //const text =  text.obj = 1 ? "Em Andamento" : "Finalizado";
    return  <Card style={[styles.cardDescr]}>
            <Paragraph style={[styles.para]}>{text.date}</Paragraph>
            <List.Item
                title={text.title}
                description= {text.description}
                left={props => <List.Icon {...props} icon="car-settings" />}
                right={props => <List.Icon  color={text.color} icon="check-circle-outline" />}
            />
            </Card>
}

export default cardList; 
const styles = StyleSheet.create({
    para:{
      paddingLeft:8,
      fontSize:12,
      color:'#708090'
    },
    cardDescr:{
      margin:8,
      padding:10,
    }
  })