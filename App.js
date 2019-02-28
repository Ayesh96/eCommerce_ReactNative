import React, {Component} from 'react';
import {Provider} from 'react-redux'
import HomePage from './src/screens/HomePage/HomePage'
import {store,persistor} from './src/store/store'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';
import Cart from './src/screens/Cart/Cart'
import Wishlist from './src/screens/Wishlist/Wishlist'
import Checkout from './src/screens/Checkout/Checkout'
import Details from './src/screens/Details/Details'
import {PersistGate} from 'redux-persist/integration/react'

const TopLevelNavigator = createStackNavigator({
  Home: HomePage,
  Cart: Cart,
  Wishlist: Wishlist,
  Checkout: Checkout,
  Details:Details
})

const AppContainer = createAppContainer(TopLevelNavigator)

export default class App extends Component{
  render() {
    return (
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}> 
          <AppContainer
            ref={navigatorRef=>{
              NavigationService.setTopLevelNavigator(navigatorRef)
              }}
          />
        </PersistGate> 
      </Provider>
    );
  }
}

