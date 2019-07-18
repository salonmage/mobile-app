import each from 'lodash/each';
import has from 'lodash/has';
import { createSelector } from 'reselect';

import { actionTypes as appActionTypes } from './app';
//-----------------------------------------------

export const actionTypes = {
  WS_CONNECTED: 'ws/WS_CONNECTED',
  ADD_SUBSCRIBED_EVENTS: 'ws/ADD_SUBSCRIBED_EVENTS',
  DELETE_SUBSCRIBE_EVENTS: 'ws/DELETE_SUBSCRIBE_EVENTS'
};

export const initialState = {
  connection_id: null,
  subscribed_events: {}
};

export const reducer = (state = initialState, action) => {
  const payload = action.payload || null;
  switch (action.type) {
    case actionTypes.WS_CONNECTED:
      return { ...state, connection_id: payload.connection_id };
    case actionTypes.ADD_SUBSCRIBED_EVENTS:
      const ses = state.subscribed_events;
      each(payload, event => {
        ses[event] = +new Date();
      });
      return { ...state, subscribed_events: ses };
    case actionTypes.DELETE_SUBSCRIBE_EVENTS:
      const newses = state.subscribed_events;
      each(payload, event => {
        if (has(newses, event)) {
          delete newses[event];
        }
      });
      return { ...state, subscribed_events: newses };
    case appActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

/*** Selectors ***/

export const wsStateSelector = state => state.ws;
export const connectionIdSelector = createSelector(
  wsStateSelector,
  state => state.connection_id
);

export const selectors = {
  wsStateSelector,
  connectionIdSelector
};
