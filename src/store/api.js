import axios from 'axios';
import Config from 'react-native-config';
//-----------------------------------------------

axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10 * 1000; // 10 seconds;
axios.defaults.validateStatus = status => status < 500;

export const AUTH_URL = Config.AUTH_URL;
export const API_V1_URL = Config.API_V1_URL;
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
      email: email,
      password: password,
      remember_me: true
    });
    return res.data;
  } catch (e) {
    return { error: e.toString() };
  }
};

export const me = async () => {
  return requestWithRetry({ method: 'get', url: `${API_V1_URL}/me` });
};

export const subscribeEvents = async ({ connection_id, events }) => {
  return requestWithRetry({
    method: 'post',
    url: `${API_V1_URL}/ws/${connection_id}/events`,
    data: { events }
  });
};

export const unsubscribeEvent = async ({ connection_id, event }) => {
  return requestWithRetry({
    method: 'delete',
    url: `${API_V1_URL}/ws/${connection_id}/events/${event}`
  });
};

export const fetchAllStaff = async () => {
  return requestWithRetry({
    method: 'get',
    url: `${API_V1_URL}/staff`
  });
};

export const fetchAttributeDefinitions = async () => {
  return requestWithRetry({
    method: 'get',
    url: `${API_V1_URL}/user-attributes`
  });
};

export const fetchUser = async ({ user_id }) => {
  return requestWithRetry({
    method: 'get',
    url: `${API_V1_URL}/users/${user_id}`
  });
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
