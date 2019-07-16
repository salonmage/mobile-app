import React from 'react';
import LottieView from 'lottie-react-native';

export default function Spinner(props) {
  return (
    <LottieView
      source={require('../assets/loading.json')}
      autoPlay
      loop
      speed={3}
    />
  );
}
