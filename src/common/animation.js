import Reanimated, { Easing } from 'react-native-reanimated';

const {
  Value,
  cond,
  set,
  sub,
  multiply,
  spring,
  timing,
  eq,
  add,
  startClock,
  clockRunning,
  stopClock,
  block,
  debug
} = Reanimated;

export const DRAG_END_INITIAL = 10000000;

export const runScrollEndSpring = ({
  clock,
  from,
  velocity,
  toValue,
  scrollEndDragVelocity,
  snapOffset,
  diffClampNode,
  navbarHeight
}) => {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    damping: 1,
    mass: 1,
    stiffness: 50,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, from),
      set(config.toValue, toValue),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, [
      set(scrollEndDragVelocity, DRAG_END_INITIAL),
      set(
        snapOffset,
        cond(
          eq(toValue, 0),
          // SnapOffset acts as an accumulator.
          // We need to keep track of the previous offsets applied.
          add(snapOffset, multiply(diffClampNode, -1)),
          add(snapOffset, sub(navbarHeight, diffClampNode))
        )
      ),
      stopClock(clock)
    ]),
    state.position
  ]);
};

export const runTiming = ({
  clock,
  from,
  toValue,
  scrollEndDragVelocity,
  snapOffset,
  diffClampNode,
  navbarHeight
}) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.linear
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.position, from),
      set(config.toValue, toValue),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      set(scrollEndDragVelocity, DRAG_END_INITIAL),
      set(
        snapOffset,
        cond(
          eq(toValue, 0),
          // SnapOffset acts as an accumulator.
          // We need to keep track of the previous offsets applied.
          add(snapOffset, multiply(diffClampNode, -1)),
          add(snapOffset, sub(navbarHeight, diffClampNode))
        )
      ),
      stopClock(clock)
    ]),
    state.position
  ]);
};
