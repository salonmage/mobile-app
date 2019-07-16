import { createSelector } from 'reselect';
//-----------------------------------------------

export const actionTypes = {
  BOOTED: 'app/BOOTED',
  BOOTED1: 'app/BBO'
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
    case actionTypes.BOOTED1:
      return { ...state, booted: false };
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

export const isAuthenticatedSelector = createSelector(
  appStateSelector,
  state => {
    if (!state.booted) {
      return null;
    }
    if (state.access_token && state.my_info) {
      return true;
    }
    return false;
  }
);

export const staffTypeSelector = createSelector(
  myInfoSelector,
  myInfo => 'OWNER'
);

export const selectors = {
  appStateSelector,
  myInfoSelector,
  accessTokenSelector,
  refreshTokenSelector,
  isAuthenticatedSelector,
  staffTypeSelector
};
