import React from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, TouchableOpacity, FlatList} from 'react-native'

class Cart extends React.Component{
    

    calculateTotal = () =>{
        total = 0
        for(let i=0;i<this.props.cart.length;i++){
            total += this.props.cart[i].price * this.props.cart[i].qty
        }
        return total
    }


    render(){
        console.log('====================================');
        console.log(this.props.cart);
        console.log('====================================');
        return (
            <View>
                <FlatList
                data={this.props.cart}
                renderItem ={({item})=>
                    <View>
                        <TouchableOpacity key={item.id}>
                            <Text>{item.name}</Text>
                            <Text>{item.price}</Text>
                        </TouchableOpacity>
                        <Button title="Remove From Wishlist" onPress={()=>this.props.removeFromCart(item)}/>
                        <Button title="Add To Cart" color="#F64D29"/>
                    </View>
                }>
                </FlatList>


            </View>
        )
    }
}

// componentWillReceiveProps = (nextProps) =>{
//     if (JSON.stringify(this.props.cart) !== JSON.stringify(nextProps.cart)){
//       this.setState({
//         title: nextProps.post.title,
//         body: nextProps.post.body,
//         category: nextProps.post.category,
//       })
//     }      
//   }




mapStateToProps = (state) => {
    return {
        cart:state.cart.cart
    }

}

mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (product) => dispatch({type:'ADD_REMOVE_CART',product:product})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Cart)