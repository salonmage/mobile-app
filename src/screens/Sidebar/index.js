import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
//-----------------------------------------------

export default function withSidebar(WrappedComponent) {
  return props => (
    <Container>
      <Sidebar></Sidebar>
      <WrappedComponent />
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  border: 1px;
  align-items: stretch;
`;
const Sidebar = styled(View)`
  width: 100px;
  border: 1px solid green;
`;
