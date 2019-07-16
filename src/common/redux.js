import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
//-----------------------------------------------

export const createEffectMiddleware = () => {
  return ({ dispatch, getState }) => next => action => {
    if (!isReduxAction(action)) {
      return action(dispatch, getState());
    }
    return next(action);
  };
};

export const isReduxAction = action => {
  return isPlainObject(action) && isString(action.type);
};

export const isPromise = obj => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};
