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
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';

import {store, persistor} from './redux/store';
import Router from './Router';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
          hidden={false}
        />
      </PersistGate>
      <Router />
    </Provider>
  );
};

export default App;
