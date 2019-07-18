import React, { useEffect, useContext, useCallback } from 'react';
import { View, ScrollView, Image, Text, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styled, { ThemeContext } from 'styled-components';

import { useNavigationButtonPressed } from '../../common/hooks/react-native-navigation';
import KeyboardAvoid from '../../components/KeyboardAvoid';
import Touchable from '../../components/Touchable';
import { InputWithLabel } from '../../components/Input';
import GoogleButton from '../../components/GoogleButton';
import LineBreak from '../../components/LineBreak';
//-----------------------------------------------

const SignUp = props => {
  useNavigationButtonPressed(e => {
    if (e.buttonId === 'back') {
      Navigation.pop(props.componentId);
    }
  }, props.componentId);

  const signUpWithGoogle = () => {
    alert('comming soon...');
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        showsHorizontalScrollIndicator={false}
      >
        <Box behavior="position">
          <GoogleButton text="Sign up with Google" onPress={signUpWithGoogle} />

          <LineBreak label="or sign up with your email" />

          <InputWithLabel
            label="Full name"
            placeholder="First and last name"
            placeholderTextColor={'gray'}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />

          <InputWithLabel
            label="Company name"
            placeholder="Your company or app name"
            placeholderTextColor={'gray'}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />

          <InputWithLabel
            label="Work email"
            placeholder="your@company.com"
            placeholderTextColor={'gray'}
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />

          <InputWithLabel
            label="Password"
            placeholder="******"
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            returnKeyType="go"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />

          <InputWithLabel
            label="Phone number"
            placeholder="+84..."
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            returnKeyType="go"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </Box>
      </ScrollView>
      <BoxBottom>
        <SignUpButton>
          <SignUpText>Register</SignUpText>
        </SignUpButton>
      </BoxBottom>
    </Container>
  );
};

SignUp.options = {
  topBar: {
    visible: true,
    title: {
      text: 'Đăng ký tài khoản mới'
    },

    leftButtons: [
      {
        id: 'back',
        icon: require('@src/assets/icons/back.png')
      }
    ],
    rightButtons: []
  }
};

export default SignUp;

//-----------------------------------------------
const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
`;
const Box = styled(KeyboardAvoid)`
  width: 75%;
  padding-top: 80px;
  padding-bottom: 60px;
`;

const BoxBottom = styled(View)`
  width: 100%;
  padding: 15px 0;
  border-top-width: 1px;
  border-top-color: #dfdfdf;
  justify-content: center;
  align-items: center;
`;
const SignUpButton = styled(Touchable)`
  width: 75%;
  background-color: black;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
`;
const SignUpText = styled(Text)`
  color: white;
  font-weight: bold;
`;
