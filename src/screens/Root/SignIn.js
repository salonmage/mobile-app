import React, { useEffect, useContext, useCallback } from 'react';
import { View, ScrollView, TextInput, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styled, { ThemeContext } from 'styled-components';

import KeyboardAvoid from '../../components/KeyboardAvoid';
import Touchable from '../../components/Touchable';
//-----------------------------------------------

export default function SignIn(props) {
  const isAuthenticating = false;
  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 60
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Text>Địa chỉ email</Text>
        <Input
          placeholder="Email"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          editable={!isAuthenticating}
          selectTextOnFocus={!isAuthenticating}
          selectionColor="rgba(255,255,255,0.7)"
        />

        <Text>Mật khẩu</Text>
        <Input
          placeholder="Email"
          placeholderTextColor={'gray'}
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          editable={!isAuthenticating}
          selectTextOnFocus={!isAuthenticating}
          selectionColor="rgba(255,255,255,0.7)"
        />
      </ScrollView>
    </Container>
  );
}

//-----------------------------------------------
const Container = styled(KeyboardAvoid)`
  flex: 1;
`;
const Input = styled(TextInput)`
  border-radius: 6;
  color: black;
  margin-bottom: 15;
  font-size: 16;
  border-color: black;
  width: 70%;
  height: 30px;
  padding: 14px 22px 15px;
  border-width: 1px;
`;
