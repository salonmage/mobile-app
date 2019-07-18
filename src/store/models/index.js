import * as app from './app';
import * as user from './user';
import * as beauty_salon from './beauty_salon';
import * as ws from './ws';

export const reducers = {
  app: app.reducer,
  user: user.reducer,
  beauty_salon: beauty_salon.reducer,
  ws: ws.reducer
};

export const actionTypes = {
  ...app.actionTypes,
  ...user.actionTypes,
  ...beauty_salon.actionTypes,
  ...ws.actionTypes
};

export const selectors = {
  ...app.selectors,
  ...user.selectors,
  ...beauty_salon.selectors,
  ...ws.selectors
};
