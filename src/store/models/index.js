import * as app from './app';
import * as user from './user';

export const reducers = {
  app: app.reducer,
  user: user.reducer
};

export const actionTypes = { ...app.actionTypes, ...user.actionTypes };

export const selectors = { ...app.selectors, ...user.selectors };
