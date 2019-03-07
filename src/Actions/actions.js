import Api from "../../Api"
import {Alert} from "react-native"
import NavigationService from "../../NavigationService"

//Cart
export const add_remove_cart = (product) => {
    return {
        type: "ADD_REMOVE_CART",
        product: product
    }
}

export const clear_cart = () => {
    return {
        type:"CLEAR_CART"
    }
}

//Wishlist
export const add_remove_wishlist = (product) => {
    return {
        type: "ADD_REMOVE_CART",
        product: product
    }
}

//User
export const logout = () => {
    return {
        type: "CLEAR_USER"
    }
}

export const login = (username,password) => {
    return dispatch=>{
        Api.auth({user:username,password:password},
            data=>{
            console.log('====================================');
            console.log("Response :",data);
            console.log('====================================');

            if(data.status === "error"){
                Alert.alert(data.error)
            }
            else{  
                dispatch(add_user(data.user))
            }
        },error=>{
            console.log('====================================');
            console.log("Error : ",error);
            console.log('====================================');
        })
    } 
}

export const signup = (username,password,email) => {
    return dispatch=> {
    Api.post("customers",{username:username
        ,password:password,
        email:email},
      data=>{
          console.log('====================================');
          console.log(data);
          console.log('====================================');

          if(data.data){
            if(data.data.status === 400){
              Alert.alert(data.message)
            }
          }
          else{
            dispatch(add_user(data))           
          }
      },error=>{
          console.log('====================================');
          console.log("Error : ",error);
          console.log('====================================');
      })
    }
}

export const add_user = (user) => {
    return {
        type:"ADD_USER",
        user: user
    }
}

//Order
export const new_order = (order) => {
    return dispatch=>{
        Api.post("orders",order,
        data=>{
            NavigationService.navigate("Home",{})
            Alert.alert("Order Created Successfuly, Your Order ID is "+data.id)
            dispatch(clear_cart())
            

        },error=>{
            console.log('====================================');
            console.log("Error : ",error);
            console.log('====================================');
        })
    }
}