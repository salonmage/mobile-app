import { Navigation } from 'react-native-navigation';
import { persistStore } from 'redux-persist';

import { setupLayout } from './common/layout';
import configureStore from './store';
import { setTheme, LightTheme, DarkTheme } from './common/theme';
import { startup } from './store/logics';
//-----------------------------------------------
if (__DEV__) require('./common/__DEV__');
//-----------------------------------------------

const store = configureStore();

persistStore(store, { manualPersist: false }, () => {
  store.dispatch(startup());
});

Navigation.events().registerAppLaunchedListener(() => {
  const state = store.getState();
  const theme = state.theme === 'dark' ? DarkTheme : LightTheme;
  setTheme(theme);
  setupLayout(store);

  // ? subscribe receive notification
});
