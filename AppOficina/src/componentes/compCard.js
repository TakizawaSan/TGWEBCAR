/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as Progress from 'react-native-progress';

function compCard(props){

    return  <Card style={[styles.card]}>
            <Card.Content>
                <Title>{props.title}</Title>
                <Paragraph style={[styles.paragraph]} >{props.paragraph}</Paragraph>
            </Card.Content>

            <Card.Actions>
                <Progress.Bar style={styles.progress} progress={props.percentage} width={250}/>
                <Text style={styles.text} category='c2'>{props.percentage*100}%</Text>
            </Card.Actions>

            <Card.Actions>
                <Button mode="text" onPress={props.func}
                style={styles.button}>
                Go to Details
                </Button>
            </Card.Actions>
        </Card>
}

export default compCard; 
const styles = StyleSheet.create({
    card:{
      marginBottom:7
    },
    progress:{
      height: 8,
      position:'relative',
      marginLeft:9,
    },
    paragraph:{
      textAlign:"justify",
      fontSize:14,
      height:'auto',
      marginBottom:6
    },
    text:{
      marginHorizontal:18, 
    },
    button:{
      width:'100%',
    }
  })