import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef
} from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styled, { ThemeContext } from 'styled-components';
import Touchable from '../../components/Touchable';

import { signout } from '../../store/logics';

export default function Setting(props) {
  console.log('SETTING', props);
  return (
    <Container>
      <Touchable
        onPress={() => {
          signout();
          Navigation.pop('owner');
        }}
      >
        <Box>
          <Text>Setting</Text>
        </Box>
      </Touchable>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled(View)`
  border: 1px;
  width: 200px;
  height: 200px;
`;
