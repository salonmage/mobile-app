import each from 'lodash/each';
import values from 'lodash/values';
import { createSelector } from 'reselect';

import { actionTypes as appActionTypes } from './app';
//-----------------------------------------------

export const actionTypes = {
  ATTRIBUTE_DEFINITIONS: 'user/ATTRIBUTE_DEFINITIONS',
  UPDATE_USER_LIST: 'user/UPDATE_USER_LIST',
  UPDATE_USER: 'user/UPDATE'
};

export const initialState = {
  attribute_definitions: {},
  users: {},
  segments: {}
};

export const reducer = (state = initialState, action) => {
  const payload = action.payload || null;
  switch (action.type) {
    case actionTypes.ATTRIBUTE_DEFINITIONS:
      const attrDefs = state.attribute_definitions;
      each(payload, at => {
        attrDefs[at.key] = r;
      });
      return { ...state, attribute_definitions: attrDefs };
    case actionTypes.UPDATE_USER_LIST:
      const users = state.users;
      each(payload, u => {
        users[u.id] = users[u.id] || {};
        users[u.id] = userReducer(users[u.id], u);
      });
      return { ...state, users };
    case appActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

const userReducer = (user, payload) => {
  each(payload, (val, key) => {
    if (key === 'attributes') {
      user.attributes = user.attributes || {};
      user.attributes = userAttributesReducer(user.attributes, val);
    } else {
      user[key] = val;
    }
  });
  return { ...user };
};

const userAttributesReducer = (attributes, payload) => {
  each(payload, at => {
    attributes[at.key] = at;
  });
  return { ...attributes };
};

/*** Selectors ***/

export const userStateSelector = state => state.user;
export const attributeDefinitionsSelector = createSelector(
  userStateSelector,
  state => state.attribute_definitions
);
export const attributeDefinitionSelector = key =>
  createSelector(
    attributeDefinitionsSelector,
    attrDefs => attrDefs[key] || null
  );
export const userListSelector = createSelector(
  userStateSelector,
  state => values(state.users)
);
export const userSelector = id =>
  createSelector(
    userListSelector,
    users => users[id] || null
  );

export const selectors = {
  userStateSelector,
  attributeDefinitionsSelector,
  attributeDefinitionSelector,
  userListSelector,
  userSelector
};
