import React from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph,Divider,Avatar } from 'react-native-paper'; 
import { Input } from 'react-native-elements';
import PerfilComp from '../componentes/perfilComp'

const pessoal = {
  name:'Marcelo Rocha',
    tel:'(16) 98171-7322',
    end:'Avenida Carlos Fernandes',
    num:'1377',
    comp:'Centro'
}
const veiculo = [{
  desc:'Astra Preto',
  placa:'ADS124',
  ano:'2000'},
  {
  desc:'Astra Preto',
  placa:'ADS124',
  ano:'2000'}
]

const Perfil = () => {
  return (
          <View>
            <ScrollView>
            <PerfilComp 
              objP={pessoal} 
              objV={veiculo}/>
            </ScrollView>
          </View>
  )
}

export default Perfil;