import { createSelector } from 'reselect';
//-----------------------------------------------

export const actionTypes = {
  BOOTED: 'app/BOOTED'
};

export const initialState = {
  booted: false,
  my_info: null,
  access_token: null,
  refresh_token: null,
  sign_in_error: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BOOTED:
      return { ...state, booted: true };
    default:
      return state;
  }
};

/*** Selectors ***/

export const appStateSelector = state => state.app;
export const bootedSelector = createSelector(
  appStateSelector,
  state => state.booted
);
export const myInfoSelector = createSelector(
  appStateSelector,
  state => state.my_info
);
export const accessTokenSelector = createSelector(
  appStateSelector,
  state => state.access_token
);
export const refreshTokenSelector = createSelector(
  appStateSelector,
  state => state.refresh_token
);

export const selectors = {
  appStateSelector,
  myInfoSelector,
  accessTokenSelector,
  refreshTokenSelector
};
