/**
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/Routes';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    myOwnProperty: true,
    colors: {
        ...DefaultTheme.colors,
        primary: '#483D8B',
        accent: '#FFFAFA',
        background:'#FFFAFA',
        surface: '#FFFAFA',
        text:'#000'
        
    },
    fonts:{
        ...DefaultTheme.fonts,
        regular: {
            fontFamily: 'times-new-roman',
            fontWeight: 'normal'
        }
    }
};
export default function Main() { 
    //LogBox.ignoreLogs(['Warning: ...'], ['WARN: ...']);
    //console.ignoredYellowBox = ['Require cycle: node_modules/react-native-paper'];
    return (
      
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);