import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../Reducers'
import {AsyncStorage} from 'react-native'
import  thunk from 'redux-thunk'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistor = persistStore(store)

