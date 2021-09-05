import {DefaultTheme} from '@react-navigation/native';
import type {Theme} from '@react-navigation/native';
const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#151515',
    primary: '#8755F0',
    card: '#242424',
    text: '#F2F3F6',
  },
};
export default theme;
