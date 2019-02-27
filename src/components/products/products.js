import React from 'react'
import {View, Button, Text, TouchableOpacity} from 'react-native'

class Products extends React.Component{
    constructor(props){
        super(props)
        this.state={
            products:this.props.pro
        }
    }
    componentDidMount(){
        console.log('====================================');
        console.log("Here",this.state.products);
        console.log('====================================');
    }
    callback = (pros) => {
this.setState({products:pros})
    }
    render(){
        console.log('comp',this.state.products)
        return(
        <View>
            <Text>dsfd</Text>
            <Text>dfsdf</Text>
            <Button title="Cart"/>
            
        </View>
        )}
}

export default Products