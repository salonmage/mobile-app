import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components';
//-----------------------------------------------

export const Input = React.memo(props => <StyledInput {...props} />);

export const InputWithLabel = React.memo(({ label, ...others }) => (
  <Group>
    <Label>{label}</Label>
    <Input {...others} />
  </Group>
));

const Group = styled(View)``;

const Label = styled(Text)`
  font-size: 14px;
  margin-bottom: 8px;
`;

const StyledInput = styled(TextInput)`
  border-radius: 6px;
  color: black;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1.5px solid #000000;
  padding: 12px 14px;
`;
