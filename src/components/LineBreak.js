import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
//-----------------------------------------------

const LineBreak = React.memo(({ label }) => (
  <LineBreakBox>
    <Line />
    <Box>
      <Label>{label}</Label>
    </Box>
  </LineBreakBox>
));

const LineBreakBox = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
`;
const Box = styled(View)`
  position: absolute;
  padding: 5px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Label = styled(Text)`
  background-color: white;
  padding: 5px 10px;
`;
const Line = styled(View)`
  position: absolute;
  top: 20px;
  background-color: black;
  height: 1px;
  width: 100%;
`;

export default LineBreak;
