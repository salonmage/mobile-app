import axios from 'axios';
import Config from 'react-native-config';

import { selectors, actionTypes } from '../store/models';
import { sleep } from '../utils/time';
import { reset } from './logics'; // !!! warning with import cycle...
//-----------------------------------------------

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10 * 1000; // 10 seconds;
axios.defaults.validateStatus = status => status < 500;

export const AUTH_URL = Config.AUTH_URL;
export const API_URL = Config.API_URL;
export const API_V1_URL = `${API_URL}/1.0`;
export const FILE_URL = Config.FILE_URL;

const apiAuth = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

export const setAccessToken = token => {
  apiAuth.defaults.headers.common['x-access-token'] = token;
};

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, {
      email,
      password,
      remember_me: true
    });
    return res.data;
  } catch (e) {
    return { error: e.toString() };
  }
};

export const refreshToken = async ({ access_token, refresh_token }) => {
  try {
    const res = await axios.post(`${AUTH_URL}/refresh`, {
      access_token,
      refresh_token
    });
    return res.data;
  } catch (e) {
    return { error: e.toString() };
  }
};

export const me = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({ method: 'get', url: `${API_URL}/me` })
  );
};

export const fetchUserAttributeDefinitions = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/user-attributes`
    })
  );
};

export const fetchUserList = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/users`
    })
  );
};

export const subscribeEvents = ({
  connection_id,
  events
}) => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/subscribe-events/${connection_id}`,
      data: { events }
    })
  );
};

export const unsubscribeEvent = ({
  connection_id,
  event
}) => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'delete',
      url: `${API_V1_URL}/${connection_id}/subscribe-events/${event}`
    })
  );
};

export const fetchAllStaff = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/staff`
    })
  );
};

export const fetchAttributeDefinitions = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/user-attributes`
    })
  );
};

export const fetchUser = user_id => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/users/${user_id}`
    })
  );
};

export const createUser = data => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/users`,
      data
    })
  );
};

export const updateUser = (user_id, data) => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/users/${user_id}`,
      data
    })
  );
};

export const fetchAllBeautyServices = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/beauty-salon/services`
    })
  );
};

export const createBeautyService = data => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/beauty-salon/services`,
      data
    })
  );
};

export const updateBeautyService = (id, data) => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/beauty-salon/services/${id}`,
      data
    })
  );
};

export const deleteBeautyService = id => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'delete',
      url: `${API_V1_URL}/beauty-salon/services/${id}`
    })
  );
};

export const fetchAllComboBeautyServices = () => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'get',
      url: `${API_V1_URL}/beauty-salon/combo-services`
    })
  );
};

export const createComboBeautyService = data => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/beauty-salon/combo-services`,
      data
    })
  );
};

export const updateComboBeautyService = (id, data) => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'post',
      url: `${API_V1_URL}/beauty-salon/combo-services/${id}`,
      data
    })
  );
};

export const deleteComboBeautyService = id => async dispatch => {
  return dispatch(
    requestWithRefreshToken({
      method: 'delete',
      url: `${API_V1_URL}/beauty-salon/combo-services/${id}`
    })
  );
};

//-----------------------------------------------

let isRefreshing = false;

export const requestWithRefreshToken = params => async (dispatch, state) => {
  let res = await requestWithRetry(params);

  if (res && res.code === 'token_is_expired') {
    if (!isRefreshing) {
      isRefreshing = true;

      const acToken = selectors.accessTokenSelector(state);
      const rfToken = selectors.refreshTokenSelector(state);
      const resf = await refreshToken({
        access_token: acToken,
        refresh_token: rfToken
      });
      if (resf && resf.access_token) {
        setAccessToken(resf.access_token);
        isRefreshing = false;
        dispatch({
          type: actionTypes.REFRESH_TOKEN_SUCCESS,
          payload: { access_token: resf.access_token }
        });
        res = await requestWithRetry(params);
        return res;
      }

      if (resf) {
        console.error(resf);
      }

      isRefreshing = false;
      await dispatch(reset());
      return;
    } else {
      while (true) {
        if (!isRefreshing) {
          break;
        }
        await sleep(500);
      }
      res = await requestWithRetry(params);
      return res;
    }
  }
  return res;
};

//-----------------------------------------------

const MAX_RETRIES = 5;

const requestWithRetry = async ({ method, url, data, configs }) => {
  for (let i = 1; i <= MAX_RETRIES; i++) {
    try {
      const res = await apiAuth({ method, url, data, configs });
      return res.data;
    } catch (e) {
      console.error(e);
      const sleepTime = Math.pow(2, i / 2) * 1000;
      await sleep(sleepTime);
    }
  }
  return { error: 'server_error' };
};

//-------------------------------------------------
