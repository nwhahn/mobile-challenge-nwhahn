import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppDispatch} from './redux/hooks';
import type {AppDispatch} from './redux/store';
import ActionTypes from './redux/actionTypes';

import {ListsScreen, MapsScreen, ChartsScreen} from './pages';
import theme from './theme';
import {Header} from './components/header';

const Tab = createBottomTabNavigator();

const DATA_URL = 'https://data.nasa.gov/resource/y77d-th95.json';

const initializeData = async (dispatch: AppDispatch) => {
  const data = await (await fetch(DATA_URL)).json();

  dispatch({
    type: ActionTypes.data.setLandings,
    payload: data,
  });
};
const Router = () => {
  const {primary, card: cardColor, text: textColor} = theme.colors;

  const dispatch = useAppDispatch();
  useEffect(() => {
    initializeData(dispatch);
  }, [dispatch]);
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}): BottomTabNavigationOptions => ({
          headerStyle: {
            backgroundColor: primary,
          },
          headerTitleAlign: 'left',
          headerTitle: props => <Header {...props} />,
          tabBarStyle: {
            backgroundColor: primary,
          },
          tabBarInactiveTintColor: cardColor,
          tabBarActiveTintColor: textColor,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Charts':
                iconName = 'stats-chart';
                break;
              case 'Map':
                iconName = 'map';
                break;
              case 'List':
              default:
                iconName = 'list';
                break;
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                focused={focused}
              />
            );
          },
        })}>
        <Tab.Screen name="List" component={ListsScreen} />
        <Tab.Screen name="Map" component={MapsScreen} />
        <Tab.Screen name="Charts" component={ChartsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
