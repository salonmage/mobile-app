import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';

import Touchable from './Touchable';
//-----------------------------------------------

const GoogleButton = React.memo(({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <Button>
      <Icon>
        <GoogleLogoImage
          source={require('@src/assets/icons/google-logo.png')}
        />
      </Icon>
      <TextBox>
        <StyledText>{text}</StyledText>
      </TextBox>
    </Button>
  </Touchable>
));

const Button = styled(View)`
  border: 1px solid #1271c4;
  border-radius: 6px;
  flex-direction: row;
`;
const Icon = styled(View)`
  padding: 12px;
`;
const GoogleLogoImage = styled(Image)`
  width: 16px;
  height: 16px;
`;
const TextBox = styled(View)`
  background-color: #286efa;
  height: 40px;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled(Text)`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export default GoogleButton;
