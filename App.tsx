/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import {store} from './redux/store';
import Router from './Router';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        hidden={false}
      />
      <Router />
    </Provider>
  );
};

export default App;
