import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

// persistor.purge()

export {store, persistor};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
