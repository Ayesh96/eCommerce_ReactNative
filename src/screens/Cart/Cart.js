import React from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, TouchableOpacity, FlatList, Image, Alert} from 'react-native'
import NavigationService from '../../../NavigationService'
import Account from '../../components/Account/Account'

class Cart extends React.Component{
    
    calculateTotal = () =>{
        total = 0
        if(this.props.cart !=null){
            for(let i=0;i<this.props.cart.length;i++){
                total += this.props.cart[i].price * this.props.cart[i].qty
            }
        }
        return total
    }

    navigateToCheckout(user){


        console.log('====================================');
        console.log("User Details : ",user);
        console.log('====================================');
        if (user === {}){
            NavigationService.navigate("Checkout",{})
        }
        else{
            Alert.alert(
                'Login/Signup',
                'Kindly Login or Signup to continue',
                [
                  {
                    text: 'Login',
                    onPress: () => NavigationService.navigate("Login",{}),
                },
                  {text: 'Signup', 
                  onPress: () => NavigationService.navigate("Login",{})
                }
                ],
                {cancelable: false},
              );
        }
        
    }   

 

    render(){
        return (
            <View style={{marginBottom:60 }}>
                <FlatList
                data={this.props.cart}
                renderItem ={({item, index})=>
                    <View key={index}>
                        <TouchableOpacity key={item.id}>
                            <Image style={{height:100,width:100}} source={{uri:item.images[0].src}}/>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </TouchableOpacity>
                        <Button title="Remove From Cart" onPress={()=>this.props.removeFromCart(item)}/>
                        <Button title="Wishlist" color="#F64D29"/>
                    </View>
                }>
                </FlatList>
                <Text>Total: {this.calculateTotal()}</Text>
                <Button title="Checkout" onPress={this.navigateToCheckout.bind(this,this.props.user)}/>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    console.log('mapping ',state)
    return {
        cart:state.cart,
        user:state.user
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (product) => dispatch({type:'ADD_REMOVE_CART',product:product})

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)