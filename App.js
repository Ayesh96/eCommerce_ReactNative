import React, {Component} from 'react';
import {Provider} from 'react-redux'
import HomePage from './src/screens/HomePage/HomePage'
import store from './src/store/store'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';
import Cart from './src/screens/Cart/Cart'
import Wishlist from './src/screens/Wishlist/Wishlist'
import Checkout from './src/screens/Checkout/Checkout'

const TopLevelNavigator = createStackNavigator({
  Home: HomePage,
  Cart: Cart,
  Wishlist: Wishlist,
  Checkout: Checkout
})

const AppContainer = createAppContainer(TopLevelNavigator)

export default class App extends Component{
  render() {
    return (
      
      <Provider store = {store}>
        <AppContainer
        ref={navigatorRef=>{
          NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Provider>

    );
  }
}

