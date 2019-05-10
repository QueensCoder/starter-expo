/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_TRESH = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DUR = 250;

export class Deck extends Component {
  static defaultProps = {
    //deals with error of onswipe left and right being treated as undefined
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };

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
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_TRESH) {
          //if the gesture is less than the positive tresh
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_TRESH) {
          //if gesture is less than the negative tresh
          this.forceSwipe('left');
        } else {
          this.resetPosition(); //to reset position
        }
      } //when the user presses and removes finger the position of x and y is reset to 0
      //putting the card back in its original place
    });

    this.state = { panResp, position, index: 0 }; //might need to use this.postion and this.panresp
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  //at the end of the the swipe if the treshhold is met the card is animated the rest of the way
  //and the duration of the animation is set for 250 mili seconds
  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DUR
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 }); //position should be seperate from state because it causes mutations
    this.setState({ index: this.state.index + 1 });
  }

  //sets rotation for card
  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      //multiply 2 by screen width to make rotation slower
      //interpolate allows us to link two scales
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
