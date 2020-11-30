import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import { Avatar} from 'react-native-paper';

import CompCard from '../componentes/compCard'

const LeftContent = props => <Avatar.Icon {...props} icon="linux" />

const Modelo = ({ navigation }) => {
  
  return  <View style={[styles.containerVi]}> 
          <ScrollView>
            <CompCard title='Manutenção do Motor' percentage={0.2} func={() => navigation.navigate('Details')}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            <CompCard title='Troca de oleo' percentage={0.5} func={() => navigation.navigate('Details')}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            <CompCard title='Calibração de valvulas' percentage={0.80} func={() => navigation.navigate('Details')}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            </ScrollView>
            <List.Section>
          <List.Subheader>Some title</List.Subheader>
            <List.Item
              title="First Item"
              description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            />  
            <List.Item
              title="2 Item"
              description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            /> 
            <List.Item
              title="3 Item"
              description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            /> 
            <List.Item
              title="4 Item"
              description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            />  
             <List.Item
              title="5 Item"
              description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
            />  
        </List.Section>
          </View>
}

export default Modelo;


const styles = StyleSheet.create({
  containerVi: {
    flex: 1,
    paddingLeft:8,
    paddingRight:8,
    borderRadius:5
  },

})