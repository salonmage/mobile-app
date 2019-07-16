import { selectors, actionTypes } from './models';
import api from './api';

/**
 * Startup check access_token ready or not.
 */
export const startup = () => async (dispatch, state) => {
  const token = selectors.accessTokenSelector(state);
  if (token) {
    api.setAccessToken(token);
    const res = await api.me();
    console.log(res);
    if (res && res.my_info) {
      dispatch({ type: actionTypes.MY_INFO, payload: res.data });
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
  console.log('state', state);
};

export const updateMyInfo = payload => async (dispatch, state) => {
  console.log(state);
};

export const updateCommonData = async payload => {};

export const login = ({ email, password }) => async (dispatch, state) => {
  const res = await api.login({ email, password });
  if (res && res.access_token && res.refresh_token) {
    dispatch({ type: actionTypes.BOOTED });
  }
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
