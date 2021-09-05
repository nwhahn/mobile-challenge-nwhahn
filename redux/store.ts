import {createStore} from 'redux';

import rootReducer from './reducers';

const store = createStore(rootReducer);

export {store};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;