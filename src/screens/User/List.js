import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef
} from 'react';
import { FlatList, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import isEmpty from 'lodash/isEmpty';

import UserItem from './components/UserItem';

import { selectors } from '../../store/models';
//-----------------------------------------------

const UserList = React.memo(props => {
  console.log('USER_LIST', props);
  const users = useSelector(selectors.userListSelector);

  const onPressUser = useCallback(uid => {
    alert(`${uid}`);
  });

  const onRefresh = useCallback(() => alert('dd'));

  return (
    <Container>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          isEmpty(users) && { flex: 1, justifyContent: 'center' }
        }
        data={users}
        renderItem={({ item, index }) => {
          return <UserItem index={index} data={item} onPress={onPressUser} />;
        }}
        keyExtractor={item => item.id}
        onRefresh={this.onRefresh}
        refreshing={false}
      />
    </Container>
  );
});

const Container = styled(View)`
  flex: 1;
`;

export default UserList;
