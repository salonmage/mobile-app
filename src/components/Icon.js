import React from 'React';
import { View, Image } from 'react-native';
import styled, { css } from 'styled-components';
//-----------------------------------------------
const Icon = ({ style, source, size, ml, mt, tintColor }) => (
  <Container style={style} size={size}>
    <IconImage
      tintColor={tintColor}
      source={source}
      resizeMode="contain"
      ml={ml}
      mt={mt}
    />
  </Container>
);
//-----------------------------------------------
const Container = styled(View)`
  flex: 1;
`;
const IconImage = styled(Image)`
  ${props =>
    props.tintColor &&
    css`
      tint-color: ${props => props.tintColor};
    `};
  margin-top: ${props => props.mt || 0};
  margin-left: ${props => props.ml || 0};
`;
//-----------------------------------------------
export default React.memo(Icon);
