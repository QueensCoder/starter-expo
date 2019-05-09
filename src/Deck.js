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

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-500, 0, 500], //interpolate allows us to link two scales
      //input is the user input , output is the result
      //associated with the input
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(), //need to spread or else this causes error
      transform: [{ rotate }]
      //tie position of a card and rotation property at the same time
    };
  }

  renderCards() {
    return this.props.data.map((item, i) => {
      if (!i) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()} //now the layout is effected by the position
            {...this.state.panResp.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }
  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
