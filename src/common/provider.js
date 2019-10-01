import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
//-----------------------------------------------

export default function withProviders(WrappedComponent, theme, store) {
  return props => (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    </ThemeProvider>
  );
}
