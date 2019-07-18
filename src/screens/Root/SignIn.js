import React, { useEffect, useContext, useCallback } from 'react';
import { View, ScrollView, TextInput, Text, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';

import { gotoSignUp } from '../../common/layout';
import KeyboardAvoid from '../../components/KeyboardAvoid';
import Touchable from '../../components/Touchable';
import { InputWithLabel } from '../../components/Input';
import LineBreak from '../../components/LineBreak';
import GoogleButton from '../../components/GoogleButton';

import { hideSignIn } from '../../common/layout';
import { login } from '../../store/logics';
//-----------------------------------------------

const SignIn = React.memo(props => {
  const dispatch = useDispatch();
  const isAuthenticating = false;

  const signInWithGoogle = () => {
    alert('comming soon...');
  };

  const onPressRegister = () => {
    gotoSignUp(props.componentId);
  };

  const signInSubmit = useCallback(async () => {
    const email = 'tuanlongn@gmail.com';
    const password = '123456';
    const res = await dispatch(login({ email, password }));
    console.log(res);
    if (res && res.ok) {
      hideSignIn(props.componentId);
    }
  });

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
    >
      <Container>
        <Box>
          <GoogleButton text="Sign in with Google" onPress={signInWithGoogle} />

          <LineBreak label="or sign up with your email" />

          <InputWithLabel
            label="Work email"
            placeholder="your@company.com"
            placeholderTextColor={'gray'}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            editable={!isAuthenticating}
            selectTextOnFocus={false}
          />

          <InputWithLabel
            label="Password"
            placeholder="******"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            returnKeyType="go"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            editable={!isAuthenticating}
            selectTextOnFocus={!isAuthenticating}
          />

          <SignInButton onPress={signInSubmit}>
            <SignInText>Sign in</SignInText>
          </SignInButton>

          <Bottom onPress={onPressRegister}>
            <RegisText>Register new account</RegisText>
          </Bottom>
        </Box>
      </Container>
    </ScrollView>
  );
});

SignIn.options = {
  topBar: {
    visible: true,
    title: {
      text: 'Welcome back'
    }
  }
};

export default SignIn;

//-----------------------------------------------
const Container = styled(KeyboardAvoid)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled(View)`
  width: 75%;
  margin-bottom: 40px;
`;

const SignInButton = styled(Touchable)`
  background-color: black;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 14px;
  margin-top: 12px;
`;
const SignInText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const Bottom = styled(Touchable)`
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
`;
const RegisText = styled(Text)`
  color: black;
  font-size: 14px;
  text-decoration-line: underline;
`;
