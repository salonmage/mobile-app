import Storage from 'react-native-fast-storage';
import LZString from 'lz-string';
import isNumber from 'lodash/isNumber';

const prefix = '_cache_';
const defaultExpireTime = 7 * 24 * 60 * 60 * 1000; // 7 days

const get = async key => {
  try {
    const expired = await isExpired(key);
    if (expired) {
      await Storage.removeItem(key);
      return null;
    } else {
      const result = await Storage.getItem(key);
      if (result) {
        return JSON.parse(LZString.decompressFromUTF16(result));
      }
      return null;
    }
  } catch (err) {
    console.log('get error:', err);
    return null;
  }
};

const set = async (key, val, exp = defaultExpireTime) => {
  try {
    const expireKey = `${prefix}.${key}`;
    const expireTime = Date.now() + (isNumber(exp) ? exp : defaultExpireTime);
    await Storage.setItem(expireKey, JSON.stringify(expireTime));
    const result = await Storage.setItem(
      key,
      LZString.compressToUTF16(JSON.stringify(val))
    );
    return result;
  } catch (err) {
    console.log('set error:', err);
    return false;
  }
};

const del = async key => {
  try {
    await Storage.removeItem(key);
    return true;
  } catch (err) {
    console.log('del error:', err);
    return false;
  }
};

const isExpired = async key => {
  try {
    const expireKey = `${prefix}.${key}`;
    const result = await Storage.getItem(expireKey);
    if (result) {
      return Date.now() >= new Date(JSON.parse(result)).getTime();
    }
    return true;
  } catch (err) {
    console.log('check expire error:', err);
    return true;
  }
};

export default {
  get,
  set,
  del,
  isExpired
};
