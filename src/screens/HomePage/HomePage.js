import React from 'react'
import {
    View,
    Button,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import {connect} from 'react-redux'
import WC from '../../../Api'
import NavigationService from '../../../NavigationService'

class HomePage extends React.Component {
 
    state = {
        products:[]
    }
    
    getProducts = () => {
        WC.get("Products", {},
            data => {
                console.log('====================================');
                console.log(data);
                console.log('====================================');
                this.setState({products:data})
                console.log('====================================');
                console.log("State : ",this.state.products);
                console.log('====================================');
            }, error => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })

    }

componentWillMount(){
    this.getProducts()
}

openCart = () =>{
    NavigationService.navigate("Cart",{})
}

openWishlist = () =>{
    NavigationService.navigate("Wishlist",{})
}



cart = (product) => {
    product.qty = 1
    this.props.add_remove_cart(product)
}

render() {
    return ( 
    <View style={{paddingBottom:70}}>
        <Button title = "Cart" color="#4F4A49" onPress={this.openCart}/>
        <Button title="WishList" color="#F64D29" onPress={this.openWishlist}/>  
        <FlatList
            data={this.state.products}
            renderItem ={({item})=>
            <View>
             <TouchableOpacity key={item.id} onPress={()=>{NavigationService.navigate("Details",{product:item})}}>
                    <Image style={{height:100,width:100}} source={{uri:item.images[0].src}}/>
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.images[0].src}</Text>
                </TouchableOpacity>
            <Button title="Cart" onPress={()=>this.cart(item)}/>
            <Button title="Wishlist" color="#F64D29" onPress={()=>this.props.add_remove_wishlist(item)}/>
                
            </View>
            }>
        </FlatList>

       
        </View>
    )}
}



const mapStateToProps = (state) => {
    return {
        cart:state.cart.cart,
        wishlist:state.wishlist.wishlist
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        add_remove_cart: (product) => dispatch({type:'ADD_REMOVE_CART',product:product}),
        add_remove_wishlist: (product) => dispatch({type:'ADD_REMOVE_WISHLIST',product:product})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)