import {DefaultTheme} from '@react-navigation/native';
import type {Theme} from '@react-navigation/native';
const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#151515',
    primary: '#8755F0',
  },
};
export default theme;
