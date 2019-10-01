import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef
} from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';

import { applyOptions } from '../../common/layout';

import { selectors } from '../../store/models';

import { useNavigationButtonPressed } from '../../common/hooks/react-native-navigation';

import { getUserName, getUserAttribute } from '../../utils/memoize';

//-----------------------------------------------

const UserDetail = React.memo(props => {
  useNavigationButtonPressed(e => {
    if (e.buttonId === 'back') {
      Navigation.pop(props.componentId);
    }
  }, props.componentId);

  const data = useSelector(state => state.user.users[props.user_id]);
  console.log(data);

  const name = getUserName(data);
  Navigation.mergeOptions(props.componentId, {
    topBar: {
      title: {
        text: name
      }
    }
  });

  return (
    <View>
      <Text>User Detail {props.user_id}</Text>
    </View>
  );
});

UserDetail.options = {
  topBar: {
    visible: true,
    backButton: {
      visible: false
    },
    leftButtons: [
      {
        id: 'back',
        icon: require('@src/assets/icons/back.png'),
        color: 'white'
      }
    ]
  }
};

export default UserDetail;
