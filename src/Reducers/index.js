import {combineReducers} from 'redux'
import cart_reducer from "./Cart/cart_reducer";
import wishlist_reducer from "./Wishlist/wishlist_reducer";
import user_reducer from "./User/user_reducer"

rootReducer = combineReducers({
    cart:cart_reducer,
    wishlist:wishlist_reducer,
    user:user_reducer
    })


export default rootReducer