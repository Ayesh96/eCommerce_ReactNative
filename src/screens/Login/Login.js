import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,TextInput, Alert} from 'react-native'
import Api from '../../../Api'


class Login extends Component {

    state = {
        username:"",
        password:""
    }

    LoginPress = () => {
        Api.auth({user:this.state.username,password:this.state.password},data=>{
            console.log('====================================');
            console.log("Response :",data);
            console.log('====================================');

            if(data.status === "error"){
                Alert.alert(data.error)
            }
            else{
                Alert.alert("Logged In")
            }
        },error=>{
            console.log('====================================');
            console.log("Error : ",error);
            console.log('====================================');
        })
    }
    render(){
        return(
            <View>
                <TextInput placeholder="Usermame" value={this.state.username} onChangeText={(text) => this.setState({username:text})} textContentType="name"></TextInput>
                <TextInput placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password:text})} secureTextEntry={true}></TextInput>
                <Button title="Login" onPress={()=>this.LoginPress()}></Button>
            </View>
        )
    }
}

export default Login