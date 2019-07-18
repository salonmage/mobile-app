import { createSelector } from 'reselect';
//-----------------------------------------------

export const actionTypes = {
  BOOTED: 'app/BOOTED',
  INVALID_CREDENTIALS: 'app/INVALID_CREDENTIALS',
  SIGNIN_SUCCESS: 'app/SIGNIN_SUCCESS',
  REFRESH_TOKEN_SUCCESS: 'app/REFRESH_TOKEN_SUCCESS',
  MY_INFO: 'app/MY_INFO',
  RESET: '*/RESET'
};

export const initialState = {
  booted: false,
  account: {},
  my_info: {},
  access_token: null,
  refresh_token: null
};

export const reducer = (state = initialState, action) => {
  const payload = action.payload || null;
  switch (action.type) {
    case actionTypes.BOOTED:
      return { ...state, booted: true };
    case actionTypes.INVALID_CREDENTIALS:
      return {
        ...state,
        my_info: {},
        account: {},
        access_token: null,
        refresh_token: null
      };
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        access_token: payload.access_token,
        refresh_token: payload.refresh_token
      };
    case actionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        access_token: payload.access_token
      };
    case actionTypes.MY_INFO:
      return {
        ...state,
        account: payload.account,
        my_info: payload.my_info
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

/*** Selectors ***/

export const appStateSelector = state => state.app;
export const accountSelector = createSelector(
  appStateSelector,
  state => state.account
);
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
  accountSelector,
  myInfoSelector,
  accessTokenSelector,
  refreshTokenSelector,
  isAuthenticatedSelector,
  staffTypeSelector
};
