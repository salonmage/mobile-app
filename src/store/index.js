import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import FastStorage from 'react-native-fast-storage';

import { createEffectMiddleware } from '../common/redux';
import { reducers } from './models';
//-----------------------------------------------

const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: FastStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const effectMiddleware = createEffectMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(effectMiddleware))
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./models').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
