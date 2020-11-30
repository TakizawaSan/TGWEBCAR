import { DefaultTheme } from 'react-native-paper';
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
    return( theme )

}