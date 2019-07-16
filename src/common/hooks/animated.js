import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = initialValue => {
  const ref = useRef(new Animated.Value(initialValue));
  return ref.current;
};

const getInitialValue = config => {
  if (typeof config.initialValue !== 'undefined') {
    return config.initialValue;
  }
  return config.toValue;
};

export const useAnimation = config => {
  const animatedValue = useAnimatedValue(getInitialValue(config));

  const animate = () => {
    if (config.type === 'timing') {
      Animated.timing(animatedValue, config).start();
    } else if (config.type === 'spring') {
      Animated.spring(animatedValue, config).start();
    }
  };

  // Currently useEffect is buggy, see https://github.com/facebook/react-native/issues/21967
  useEffect(animate, [config.toValue]);

  return animatedValue;
};
