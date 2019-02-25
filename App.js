import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomePage from './src/screens/HomePage/HomePage'
import store from './src/store'

export default class App extends Component{
  render() {
    return (

      <Provider store ={store}>
        <HomePage/>
      </Provider>

    );
  }
}

