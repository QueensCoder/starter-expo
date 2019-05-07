/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

export class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResp = PanResponder.create({
      onStartShouldSetPanResponder: () => true, //clicks down on screen
      onPanResponderMove: (event, gesture) => {
        console.log(gesture);
        position.setValue({ x: gesture.dx, y: gesture.dy }); //panresponder takes in user data
        //and sets the position to what the user puts in
        //dx and dy is total lifecycle of a gesture
      }, //whenever we start to move like draggin the screen
      onPanResponderRelease: () => {} //when the user presses and removes finger
    });

    this.state = { panResp, position }; //might need to use this.postion and this.panresp
  }

  renderCards() {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  }
  render() {
    return (
      <Animated.View
        style={this.state.position.getLayout()} //now the layout is effected by the position
        {...this.state.panResp.panHandlers}
      >
        {this.renderCards()}
      </Animated.View>
    );
  }
}

export default Deck;
