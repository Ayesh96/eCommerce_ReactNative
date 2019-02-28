import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,Image} from 'react-native'


class Checkout extends Component {
    state = {
        product:this.props.navigation.state.params.product
        
    }
    render(){
       
        return(
            <View>
                <Image style={{width:200,height:200}}source={{uri:this.state.product.images[0].src}}/>
                <Text>{this.state.product.name}</Text>
                <Text>{this.state.product.description}</Text>
                <Text>{this.state.product.price}</Text>
                <Button title="Add To Cart"/>
            </View>
        )
    }
}

export default Checkout