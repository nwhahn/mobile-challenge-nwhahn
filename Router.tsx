import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {useAppDispatch} from './redux/hooks';
import type {AppDispatch} from './redux/store';
import ActionTypes from './redux/actionTypes';

import {ListsScreen, MapsScreen, ChartsScreen} from './pages';
import theme from './theme';

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
  const {primary, border, text: textColor} = theme.colors;

  const dispatch = useAppDispatch();
  useEffect(() => {
    initializeData(dispatch);
  }, [dispatch]);
  const bottomTabBarOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: primary,
    },
    tabBarInactiveTintColor: textColor,
    tabBarActiveTintColor: border,
  };
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="List"
          component={ListsScreen}
          options={bottomTabBarOptions}
        />
        <Tab.Screen
          name="Map"
          component={MapsScreen}
          options={bottomTabBarOptions}
        />
        <Tab.Screen
          name="Charts"
          component={ChartsScreen}
          options={bottomTabBarOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Router;
