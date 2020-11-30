import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { mdiHistory } from '@mdi/js';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from 'react-native-paper';

MaterialCommunityIcons.loadFont();

import Home from './screens/Home'
import Historico from './screens/Historico'
import Detalhes from  './screens/Detalhes'
import Perfil from './screens/Perfil'

const Tab = createMaterialBottomTabNavigator()
const HomeStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function TopTapScreen() {
  
  return (
    <TopTab.Navigator
      tabBarOptions={{
        showIcon:false,

      }}
    >
      <TopTab.Screen name="Pendentes" component={Home} 
        options={{
              tabBarLabel: 'Pendentes',
              tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="content-paste" color={color} size={26} />
            ),
          }}
      />
      <TopTab.Screen name="Historico" component={Historico}
        options={{
              tabBarLabel: 'Historico',
              tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={26} />
            ),
          }}
      />
    </TopTab.Navigator>
  );
}

function HomeStackScreen() {
  
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={TopTapScreen}  />
      <HomeStack.Screen name="Details" component={Detalhes} />
    </HomeStack.Navigator>
  );
}
function PerfilStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Perfil" component={Perfil} />
      <HomeStack.Screen name="Details" component={Detalhes}  />
    </HomeStack.Navigator>
  );
}


export default function MyTabs(){
  const theme= useTheme();
    return (
      
      <Tab.Navigator
         theme={{ colors: { primary: theme.colors.surface } }}
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tabBarBadge: 3
          }}
        />
        
        <Tab.Screen
          name="Perfil"
          component={PerfilStackScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
          }}
        />
      </Tab.Navigator>
    );
  };

function App() {
    return (
      <MyTabs />
    );
  }   