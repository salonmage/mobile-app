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

const Doctor = React.memo(props => {
  useBottomTabEvent((selectedTabIndex, unselectedTabIndex) => {
    if (selectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/doctor_selected.png')
        }
      });
    }
    if (unselectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/doctor.png')
        }
      });
    }
  }, props.componentId);

  return (
    <View>
      <Text>Doctor</Text>
    </View>
  );
});

Doctor.options = {
  topBar: {
    visible: true
  },
  bottomTab: {
    icon: require('@src/assets/icons/doctor.png'),
    text: 'Khám'
  }
};

export default Doctor;
