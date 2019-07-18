import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';
import WS from '../utils/wsclient';
import Config from 'react-native-config';

import { selectors, actionTypes } from './models';
import * as api from './api';

/**
 * Startup check access_token ready or not.
 */
export const startup = () => async (dispatch, state) => {
  const token = selectors.accessTokenSelector(state);
  if (token) {
    api.setAccessToken(token);
    const res = await dispatch(api.me());
    if (res && res.my_info && res.account) {
      dispatch({ type: actionTypes.MY_INFO, payload: res });
      dispatch(boot());
      return;
    }
  }
  dispatch({ type: actionTypes.BOOTED });
};

/**
 * Boot will get or update common data.
 */
export const boot = () => async (dispatch, state) => {
  dispatch(wsconnect());
  // subscribe events

  dispatch(fetchUpdateUserAttributeDefinitions());
  dispatch(fetchUpdateUserList());
};

export const updateMyInfo = payload => async (dispatch, state) => {
  console.log(state);
};

export const updateCommonData = async payload => {};

export const login = ({ email, password }) => async (dispatch, state) => {
  const res = await api.login({ email, password });
  if (res && res.access_token && res.refresh_token) {
    dispatch({ type: actionTypes.SIGNIN_SUCCESS, payload: res });
    api.setAccessToken(res.access_token);
    dispatch(boot());
    return { ok: true };
  }
  return { error: res.error };
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUpdateUserAttributeDefinitions = () => async (
  dispatch,
  state
) => {
  const res = await dispatch(api.fetchUserAttributeDefinitions());
  console.log('res att', res);
};

export const fetchUpdateUserList = () => async (dispatch, state) => {
  const res = await dispatch(api.fetchUserList());
  if (res && res.users) {
    dispatch({ type: actionTypes.UPDATE_USER_LIST, payload: res.users });
  }
};

//-----------------------------------------------

let ws_instance = null;

export const wsconnect = () => async (dispatch, state) => {
  try {
    const connectionId = selectors.connectionIdSelector(state);
    let wsUrl = Config.WS_URL;
    if (connectionId) {
      // wsUrl += `?connection_id=${connectionId}`;
    }

    ws_instance = new WS({
      pickUrl: done => {
        done(wsUrl);
      }
    });

    ws_instance.onerror = (_, error) => {
      if (__DEV__) console.log('ws.onerror =>', error);
    };

    ws_instance.onconnected = (_, id) => {
      if (__DEV__) console.log('ws.onconnected => connection_id', id);

      if (id !== connectionId) {
        dispatch(resubscribeEvents(id));
      }
    };

    ws_instance.onmessage = (_, message, offset) => {
      if (__DEV__)
        console.log(
          new Date().toISOString(),
          'ws => ',
          message.type,
          message.data,
          offset
        );

      if (message && offset) {
        ws_instance.commit(offset);
      }

      switch (message.type) {
        default:
          if (__DEV__) console.log('unhandle event:', message);
          break;
      }
    };
  } catch (e) {
    if (__DEV__) console.log('websocket exception =>', e);
  }
};

export const resubscribeEvents = connectionId => async (dispatch, state) => {
  const oldConnectionId = selectors.connectionIdSelector(state);
  // ? delete subscribed events

  await dispatch(subscribeEvents(connectionId));
  dispatch({
    type: actionTypes.WS_CONNECTED,
    payload: { connection_id: connectionId }
  });
};

export const subscribeEvents = connectionId => async (dispatch, state) => {
  const events = ['account_setting', 'user', 'beautysalon'];
  const res = await dispatch(
    api.subscribeEvents({
      connection_id: connectionId,
      events
    })
  );
  console.log(res);
};

export const unsubscribeEvents = connectionId => async (dispatch, state) => {};

export const reset = () => async (dispatch, state) => {
  dispatch({ type: actionTypes.RESET });
  if (ws_instance) {
    ws_instance.destroy();
  }
  ws_instance = null;
};

export const signout = () => async (dispatch, state) => {
  await dispatch(reset());
};
