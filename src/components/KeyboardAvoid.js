import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardAvoid = ({
  children,
  behavior,
  keyboardVerticalOffset,
  contentContainerStyle,
  style
}) => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        style={style}
        behavior={behavior || 'padding'}
        keyboardVerticalOffset={keyboardVerticalOffset || 0}
        contentContainerStyle={contentContainerStyle || {}}
      >
        {children}
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <KeyboardAvoidingView style={style}>{children}</KeyboardAvoidingView>
    );
  }
};

export default KeyboardAvoid;
