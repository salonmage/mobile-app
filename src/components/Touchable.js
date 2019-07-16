import React, { useContext } from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { ThemeContext } from 'styled-components';
//-----------------------------------------------
export default function Touchable({ children, ...otherProps }) {
  const theme = useContext(ThemeContext);

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...otherProps}>
        {children}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableHighlight
      underlayColor={theme.touchBackgroundColor}
      delayPressOut={500}
      {...otherProps}
    >
      {children}
    </TouchableHighlight>
  );
}
