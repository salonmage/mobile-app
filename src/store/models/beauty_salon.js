import each from 'lodash/each';
import has from 'lodash/has';
import { createSelector } from 'reselect';

import { actionTypes as appActionTypes } from './app';
//-----------------------------------------------

export const actionTypes = {
  UPDATE_BEAUTY_SERVICE: 'beauty_salon/UPDATE_BEAUTY_SERVICE',
  DELETE_BEAUTY_SERVICE: 'beauty_salon/DELETE_BEAUTY_SERVICE',
  UPDATE_COMBO_BEAUTY_SERVICE: 'beauty_salon/UPDATE_COMBO_BEAUTY_SERVICE',
  DELETE_COMBO_BEAUTY_SERVICE: 'beauty_salon/DELETE_COMBO_BEAUTY_SERVICE',
  UPDATE_BEAUTY_ORDER: 'beauty_salon/UPDATE_BEAUTY_ORDER'
};

export const initialState = {
  beauty_services: {},
  combo_beauty_services: {}
};

export const reducer = (state = initialState, action) => {
  const payload = action.payload || null;
  switch (action.type) {
    case actionTypes.UPDATE_BEAUTY_SERVICE:
      const bs = state.beauty_services;
      each(payload, r => (bs[r.id] = r));
      return { ...state, beauty_services: bs };
    case actionTypes.DELETE_BEAUTY_SERVICE:
      const newbs = state.beauty_services;
      if (has(newbs, payload.id)) {
        delete newbs[payload.id];
      }
      return { ...state, beauty_services: newbs };
    case actionTypes.UPDATE_COMBO_BEAUTY_SERVICE:
      const combo_beauty_services = state.combo_beauty_services;
      each(payload, r => (combo_beauty_services[r.id] = r));
      return { ...state, combo_beauty_services };
    case actionTypes.DELETE_COMBO_BEAUTY_SERVICE:
      const newcbs = state.combo_beauty_services;
      if (has(newcbs, payload.id)) {
        delete newcbs[payload.id];
      }
      return { ...state, combo_beauty_services: newcbs };
    case appActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

/*** Selectors ***/

export const beautySalonStateSelector = state => state.beauty_salon;
export const beautyServiceListSelector = createSelector(
  beautySalonStateSelector,
  state => state.beauty_services
);
export const comboBeautyServiceListSelector = createSelector(
  beautySalonStateSelector,
  state => state.combo_beauty_services
);

export const selectors = {
  beautyServiceListSelector,
  comboBeautyServiceListSelector
};
