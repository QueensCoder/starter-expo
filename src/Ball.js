/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class Ball extends Component {
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    //value xy finds out where the position of item is
    //starts at 0, 0

    //spring changes x and y value by updating the postion
    //modify position over a span of time, default is 1 second
    Animated.spring(this.position, {
      toValue: { x: 200, y: 500 }
    }).start(); //start begins the operation
  }

  //animated.view is used to specify what we want to animate
  //animation system runs completely outside of state system
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}

const styles = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
    //error typo for borderColor causes whole app to fail
  }
};

export default Ball;
