import React, { useEffect, useContext, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { selectors } from '../../store/models';
import styled, { ThemeContext } from 'styled-components';

import Touchable from '../../components/Touchable';
import { setPrimaryLayout, gotoSignIn } from '../../common/layout';
//-----------------------------------------------

export default function Initial(props) {
  const isAthenticated = useSelector(selectors.isAuthenticatedSelector);
  const type = useSelector(selectors.staffTypeSelector);

  useEffect(() => {
    if (isAthenticated === null) return;
    if (isAthenticated) {
      setPrimaryLayout(type);
    } else {
      gotoSignIn(props.componentId);
    }
  }, [isAthenticated, type]);

  return (
    <View>
      <Text>Initial</Text>
    </View>
  );
}
