import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import {FlatList, View, Text, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Reanimated, {Easing, useCode} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import styled, {ThemeContext} from 'styled-components';

import UserItem from './components/UserItem';
import Touchable from '../../components/Touchable';
import Icon from '../../components/Icon';

import {
  runScrollEndSpring,
  runTiming,
  DRAG_END_INITIAL,
} from '../../common/animation';

import {selectors} from '../../store/models';
import {useBottomTabEvent} from '../../common/hooks/react-native-navigation';

import {gotoUserDetail} from '../../common/layout';

//-----------------------------------------------

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList);

//-----------------------------------------------

const UserList = React.memo(props => {
  // navigation
  if (props.tabIndex === 0) {
    Navigation.mergeOptions(props.componentId, {
      bottomTab: {
        icon: require('@src/assets/icons/customer_selected.png'),
      },
    });
  }

  useBottomTabEvent((selectedTabIndex, unselectedTabIndex) => {
    if (selectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/customer_selected.png'),
        },
      });
    }
    if (unselectedTabIndex === props.tabIndex) {
      Navigation.mergeOptions(props.componentId, {
        bottomTab: {
          icon: require('@src/assets/icons/customer.png'),
        },
      });
    }
  }, props.componentId);

  // handler
  const users = useSelector(selectors.userListSelector);

  const onPressUser = useCallback(uid =>
    gotoUserDetail(props.componentId, {user_id: uid}),
  );

  const onRefresh = useCallback(() => alert('updating...'));

  // collapse header
  const NAVBAR_HEIGHT = 200;

  let [scrollY] = useState(new Reanimated.Value(0));
  let [scrollEndDragVelocity] = useState(
    new Reanimated.Value(DRAG_END_INITIAL),
  );
  let snapOffset = new Reanimated.Value(0);
  let clock = new Reanimated.Clock();
  let diffClampNode = Reanimated.diffClamp(
    Reanimated.add(Reanimated.debug('scrollY', scrollY), snapOffset),
    0,
    NAVBAR_HEIGHT,
  );
  let inverseDiffClampNode = Reanimated.multiply(diffClampNode, -1);
  let snapPoint = Reanimated.cond(
    Reanimated.lessThan(diffClampNode, NAVBAR_HEIGHT / 2),
    0,
    -NAVBAR_HEIGHT,
  );
  let animatedNavBarTranslateY = Reanimated.cond(
    Reanimated.lessThan(
      Reanimated.debug('scrollY lessThan', scrollY),
      NAVBAR_HEIGHT,
    ),
    Reanimated.cond(
      Reanimated.neq(
        Reanimated.debug('scrollEndDragVelocity', scrollEndDragVelocity),
        DRAG_END_INITIAL,
      ),
      runScrollEndSpring({
        diffClampNode,
        clock,
        velocity: scrollEndDragVelocity,
        from: inverseDiffClampNode,
        toValue: snapPoint,
        scrollEndDragVelocity,
        snapOffset,
        navbarHeight: NAVBAR_HEIGHT,
      }),

      Reanimated.debug('inverseDiffClampNode', inverseDiffClampNode),
    ),
    -NAVBAR_HEIGHT,
  );

  return (
    <Container>
      <Reanimated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          backgroundColor: '#0C59FB',
          zIndex: 2,
          transform: [{translateY: animatedNavBarTranslateY}],
        }}
      />

      <MoreAction onPress={() => alert(1)}>
        <Icon size={56} source={require('@src/assets/icons/more_action.png')} />
      </MoreAction>

      <AnimatedFlatList
        contentContainerStyle={{
          paddingTop: NAVBAR_HEIGHT,
          borderWidth: 1,
        }}
        showsHorizontalScrollIndicator={false}
        data={users}
        renderItem={({item, index}) => {
          return <UserItem index={index} data={item} onPress={onPressUser} />;
        }}
        keyExtractor={item => item.id}
        // onRefresh={onRefresh}
        refreshing={false}
        scrollEventThrottle={1}
        onScroll={Reanimated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        onScrollEndDrag={Reanimated.event(
          [
            {
              nativeEvent: {
                velocity: {
                  y: scrollEndDragVelocity,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
    </Container>
  );
});

UserList.options = {
  topBar: {
    // visible: true,
    // animate: true,
    // hideOnScroll: true,
    leftButtons: [
      {
        id: '1',
        text: 'Khách hàng',
        color: 'white',
        fontSize: 18,
      },
    ],
  },
  bottomTab: {
    icon: require('@src/assets/icons/customer.png'),
    text: 'Khách',
  },
};

export default UserList;
//-----------------------------------------------

const Container = styled(View)`
  flex: 1;
`;

const TopBar = styled(Reanimated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200;
  padding: 12px;
  z-index: 1;
  background-color: white;
  background-color: ${props => props.theme.topBarBackgroundColor};
`;
const BoxLeft = styled(View)`
  flex-direction: column;
  flex-grow: 1;
`;
const Title = styled(Text)`
  color: black;
  font-size: 22px;
  font-family: ${props => props.theme.fontBold};
`;
const Subtitle = styled(Text)`
  font-size: 16px;
  font-family: ${props => props.theme.fontLight};
`;
const BoxRight = styled(View)``;

const MoreAction = styled(Touchable)`
  z-index: 2;
  position: absolute;
  bottom: 30;
  right: 25;
`;

const Anima = styled(View)`
  position: relative;
  top: 50px;
  z-index: 4;
  /* transform: scale(0.5, 0.5); */
`;

const Box = styled(Reanimated.View)`
  position: absolute;
  top: 0;
  left: 30;
  /* right: -100; */
  width: 300;
  height: 100;
`;

const Box1 = styled(Box)`
  /* transform: rotate(-15deg); */
  background-color: #0c59fb;
  z-index: 3;
`;
const Box2 = styled(Box)`
  /* top: 20; */
  transform: rotate(-20deg);
  background-color: #4d80ef;
  z-index: 2;
`;

const Box3 = styled(Box)`
  /* top: 40; */
  transform: rotate(-25deg);
  background-color: #b0c8fd;
  z-index: 1;
`;

export const useTimingTransistion = ({source, dest, duration, easing}) => {
  const state = {
    finished: new Reanimated.Value(0),
    position: new Reanimated.Value(0),
    time: new Reanimated.Value(0),
    frameTime: new Reanimated.Value(0),
  };

  const {transitionVal, clock} = useMemo(
    () => ({
      transitionVal: new Reanimated.Value(0),
      clock: new Reanimated.Clock(),
    }),
    [],
  );
  useCode(
    Reanimated.set(
      transitionVal,
      Reanimated.timing(clock, state, {
        toValue: dest,
        duration,
        easing,
      }),
    ),
    [state],
  );
  return transitionVal;
};
