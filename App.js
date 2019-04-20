/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Expo from 'expo';

// import components
import Ball from './src/Ball';

import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ball />
      </View>
    );
  }
}

//questions to answer
//where is the item now
//where is the item moving to?
//which item is being moved

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
