import { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';

export const useNavigationButtonPressed = (handler, componentId) => {
  useEffect(() => {
    const subscription = Navigation.events().registerNavigationButtonPressedListener(
      event => {
        if (event.componentId === componentId) {
          handler(event);
        }
      }
    );
    return () => {
      subscription.remove();
    };
  }, [componentId]);
};

export const useBottomTabEvent = (handler, componentId) => {
  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(
      ({ selectedTabIndex, unselectedTabIndex }) => {
        if (selectedTabIndex !== unselectedTabIndex) {
          handler(selectedTabIndex, unselectedTabIndex);
        }
      }
    );
    return () => {
      bottomTabEventListener.remove();
    };
  }, [componentId]);
};
