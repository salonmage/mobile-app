import React, { useState, useEffect, useCallback } from 'react';
import { View, Image } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Text from './Text';
//-----------------------------------------------

const Avatar = React.memo(props => {
  const [imageLoaded, setImageLoaded] = useState(props.uri ? true : false);
  const [isOnline, setIsOnline] = useState(false);

  const imageLoadError = () => {
    setImageLoaded(false);
  };

  const imageLoadEnd = () => {
    setImageLoaded(true);
  };

  const getFirstCharacter = text => {
    return text
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  const randomBackgroundColor = seed => {
    const colors = [
      '#F44336',
      '#FF4081',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#FF5722',
      '#795548',
      '#9E9E9E',
      '#607D8B'
    ];
    return colors[seed % colors.length].toLowerCase();
  };

  const { uri, name, isBan, isAgent, style, theme } = props;
  const size = props.size || theme.avatarSizeDefault;

  if (isBan) {
    return (
      <Container>
        <Circle size={size}>
          <Image
            style={{ width: size, height: size }}
            source={require('@src/assets/icons/me.png')}
          />
        </Circle>
      </Container>
    );
  }

  if (!uri && isAgent) {
    return (
      <Container style={style}>
        <Circle>
          <Image
            style={{ width: size, height: size }}
            source={require('@src/assets/icons/me.png')}
          />
        </Circle>
      </Container>
    );
  }

  return (
    <Container style={style}>
      <Circle size={size}>
        {imageLoaded && (
          <Image
            style={{ width: size, height: size }}
            source={{ uri }}
            onError={imageLoadError}
            onLoadEnd={imageLoadEnd}
          />
        )}

        <AvatarDefault size={size} color={randomBackgroundColor(name.length)}>
          <FirstCharacter text={getFirstCharacter(name)} size={size} />
        </AvatarDefault>
      </Circle>

      {isOnline && <OnlineDotStatus />}
    </Container>
  );
});
//-----------------------------------------------

const Container = styled(View)``;
const Circle = styled(View)`
  border-radius: ${props => props.size * 0.5};
  width: ${props => props.size};
  height: ${props => props.size};
  overflow: hidden;
`;
const AvatarDefault = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  width: ${props => props.size};
  height: ${props => props.size};
`;
const FirstCharacter = styled(Text)`
  color: rgba(255, 255, 255, 0.7);
  font-family: ${props => props.theme.fontSemiBold};
  font-size: ${props => (props.size * 5) / 9};
`;
const OnlineDotStatus = styled(View)`
  position: absolute;
  right: 1;
  bottom: 1;
  background-color: #58cc19;
  width: 12;
  height: 12;
  border-radius: ${12 * 0.5};
  border: 2px solid white;
`;
//-----------------------------------------------
export default withTheme(Avatar);
