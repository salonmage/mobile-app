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

import { applyOptions } from '../../common/layout';

export default function Me(props) {
  return (
    <View>
      <Text>Me</Text>
    </View>
  );
}
