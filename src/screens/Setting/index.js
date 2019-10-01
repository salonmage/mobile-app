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

import { useBottomTabEvent } from '../../common/hooks/react-native-navigation';

const Setting = React.memo(props => {
  console.log('SETTING', props);

  useBottomTabEvent((selectedTabIndex, unselectedTabIndex) => {
    if (selectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/setting_selected.png')
        }
      });
    }
    if (unselectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/setting.png')
        }
      });
    }
  }, props.componentId);

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
});

Setting.options = {
  bottomTab: {
    icon: require('@src/assets/icons/setting.png'),
    text: 'Cài đặt'
  }
};

export default Setting;

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
