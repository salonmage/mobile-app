import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Touchable from '../../../components/Touchable';
import Avartar from '../../../components/Avatar';

import { getUserName, getUserAttribute } from '../../../utils/memoize';
//-----------------------------------------------

const UserItem = React.memo(({ data, onPress }) => {
  const name = getUserName(data);
  const avatarUrl = getUserAttribute(data.attributes, 'avatar_url');

  return (
    <Touchable onPress={() => onPress(data.id)}>
      <Container>
        <Avartar uri={avatarUrl} name={name} size={48} />
        <Info>
          <Name>{name}</Name>
        </Info>
        <ExtraInfo />
      </Container>
    </Touchable>
  );
});

const Container = styled(View)`
  flex-direction: row;
  padding: 8px 12px;
`;
const Info = styled(View)`
  margin-left: 12px;
  flex-grow: 1;
`;
const Name = styled(Text)``;
const ExtraInfo = styled(View)``;

export default UserItem;
