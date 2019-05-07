/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

export class Deck extends Component {
  constructor(props) {
    super(props);

    const panResp = PanResponder.create({
      onStartShouldSetPanResponder: () => true, //clicks down on screen
      onPanResponderMove: () => {}, //whenever we start to move like draggin the screen
      onPanResponderRelease: () => {} //when the user presses and removes finger
    });

    this.state = { panResp };
  }

  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
