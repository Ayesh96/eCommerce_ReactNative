import React from 'react'
import {connect} from 'react-redux'
import {View, Button, Text, TouchableOpacity, FlatList, Image} from 'react-native'

class Wishlist extends React.Component{
    
    render(){
        console.log('====================================');
        console.log("Wishlist Render : ",this.props.wishlist);
        console.log('====================================');
        return (
            <View>
                <FlatList
                data={this.props.wishlist}
                renderItem ={({item,index})=>
                    <View key={index}>
                        <TouchableOpacity key={item.id}>
                            <Image style={{height:100,width:100}} source={{uri:item.images[0].src}}/>
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


mapStateToProps = (state) => {
    return {
        wishlist:state.wishlist
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (product) => dispatch({type:'ADD_REMOVE_WISHLIST',product:product})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wishlist)