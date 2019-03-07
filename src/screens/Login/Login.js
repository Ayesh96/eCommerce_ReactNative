import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,TextInput, Alert} from 'react-native'
import Api from '../../../Api'
import{connect} from 'react-redux'
import * as actionCreators from "../../Actions/actions"


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
                {/* <Button title="Login" onPress={()=>this.LoginPress()}/> */}
                <Button title="Login" onPress={()=>this.props.register_user(this.state.username,this.state.password)}/>
            </View>
        )
    }
}



mapDispatchToProps = (disptach) => {
    return{
        register_user: (username,password)=>disptach(actionCreators.login(username,password))
    }
}

export default connect(null,mapDispatchToProps)(Login)