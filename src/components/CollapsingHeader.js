import React, { Component } from 'react';
import Animated from 'react-native';

const constants = {
  OPEN: 'open',
  COLLAPSED: 'collapsed'
};

class CollapsingHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: 0,
      scrollOffset: new Animated.Value()
    };
  }

  scrollPositions = {};
  offsetY = 0;
  transitionOffset = 0;
  headerState = constants.OPEN;

  setCollapsingChild = () => {};

  collapse = () => {};

  renderDiagonal() {}
}
