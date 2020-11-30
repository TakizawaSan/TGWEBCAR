import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import { Avatar} from 'react-native-paper';

import CompCard from '../componentes/compCard'

const LeftContent = props => <Avatar.Icon {...props} icon="linux" />
const percentages = {um: 0.2, dois:0.5, tres:0.8}
const Modelo = ({ navigation }) => {
  return  <View style={[styles.containerVi]}>
           
          <ScrollView>
            <CompCard title='Manutenção do Motor' percentage={percentages.um} func={() =>  navigation.navigate('Details',{resultado: percentages.um})}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            <CompCard title='Troca de oleo' percentage={percentages.dois} func={() => navigation.navigate('Details',{resultado: percentages.dois})}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            <CompCard title='Calibração de valvulas' percentage={percentages.tres} func={() => navigation.navigate('Details',{resultado: percentages.tres})}
                      paragraph='Breve descrição da atividade, sendo uma breve descrição de no maximo ta auto mais n exagera'/>

            </ScrollView>
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