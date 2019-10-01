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

import { useBottomTabEvent } from '../../common/hooks/react-native-navigation';
//-----------------------------------------------

const Me = React.memo(props => {
  console.log('ME', props);
  useBottomTabEvent((selectedTabIndex, unselectedTabIndex) => {
    if (selectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/me_selected.png')
        }
      });
    }
    if (unselectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/me.png')
        }
      });
    }
  }, props.componentId);
  return (
    <View>
      <Text>Me</Text>
    </View>
  );
});

Me.options = {
  bottomTab: {
    icon: require('@src/assets/icons/me.png'),
    text: 'Tôi'
  }
};

export default Me;
