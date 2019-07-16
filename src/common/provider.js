import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from './theme';
//-----------------------------------------------

export default function withProviders(WrappedComponent, store) {
  return props => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    </ThemeProvider>
  );
}
