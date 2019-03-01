import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,TextInput} from 'react-native'


class Signup extends Component {
    render(){
        return(
            <View>
                <TextInput placeholder="Usermame" value={this.state.username} onChangeText={(text) => this.setState({username:text})} textContentType="name"></TextInput>
                <TextInput placeholder="Password" value={this.state.password} textContentType="password"></TextInput>
            </View>
        )
    }
}

export default Signup