import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,TextInput, Alert} from 'react-native'
import Api from '../../../Api'
import{connect} from 'react-redux'


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
                this.props.register_user(data.user)
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
                <Button title="Login" onPress={()=>this.LoginPress()}/>
            </View>
        )
    }
}



mapDispatchToProps = (disptach) => {
    return{
        register_user: (user)=>disptach({type:'ADD_USER',user:user})
    }
}

export default connect(null,mapDispatchToProps)(Login)