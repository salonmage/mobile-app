import {Navigation} from 'react-native-navigation';
import {persistStore} from 'redux-persist';
import DeviceInfo from 'react-native-device-info';

import {setupLayout} from './common/layout';
import configureStore from './store';
import {setTheme, LightTheme, DarkTheme} from './common/theme';
import cache from './common/cache';
import {startup} from './store/logics';
//-----------------------------------------------
if (__DEV__) require('./common/__DEV__');
//-----------------------------------------------

const store = configureStore();

persistStore(store, {manualPersist: false}, () => {
  store.dispatch(startup());
});

Navigation.events().registerAppLaunchedListener(async () => {
  let theme = (await cache.get('theme')) || LightTheme;
  theme.isTablet = await DeviceInfo.isTablet();
  console.log('theme', theme);
  setupLayout(theme, store);

  // ? subscribe receive notification
});
