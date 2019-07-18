import React from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components';

//-----------------------------------------------
const Text = React.memo(({ text, children, ...props }) => (
  <StyledText {...props}>{text || children}</StyledText>
));
//-----------------------------------------------
const StyledText = styled(RNText)`
  font-family: ${props => props.theme.fontRegular};
  font-size: ${props => props.theme.fontSizeDefault};
  color: ${props => props.theme.primaryTextColor};
`;
//-----------------------------------------------
export default Text;
