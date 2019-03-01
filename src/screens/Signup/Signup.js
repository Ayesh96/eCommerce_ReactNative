import React,{Component} from 'react'
import {View,Text,TouchableOpacity,Button,TextInput, Alert} from 'react-native'
import Api from '../../../Api'
//import alert from '../../sharedUI/componenets_UI'
import ToastAndroid from 'react-native'


class Signup extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    fieldsValidated(){
        if (this.state.username == null || this.state.email == null || this.state.password == null || this.state.confirmPassword == null || this.state.username == "" || this.state.email == "" || this.state.password == "" || this.state.confirmPassword == "") {
            Alert.alert("Some fields are missing")
            return false
          }
          else {
            if (!this.validateEmail(this.state.email)) {
                Alert.alert("Invalid Email Entered")
              return false
            }
            else {
              if (this.state.password != this.state.confirmPassword) {
                Alert.alert("Passwords donot match")
                return false
              }
              else {
                if (this.state.password.length > 6) {
                  return true
                }
                else {
                    Alert.alert("Password must contain more than 6 characters")
                  return false
                }
              }
            }
          }
    }

    SignupPress(){

        if(this.fieldsValidated()){
            Api.post("customers",{username:this.state.username,password:this.state.password,email:this.state.email},data=>{
                if(data.data.status === 400){
                    Alert.alert(data.message)
                }
            },error=>{
                console.log('====================================');
                console.log("Error : ",error);
                console.log('====================================');
            })
        }

       
    }
    render(){
        return(
            <View>
                <TextInput placeholder="Usermame" value={this.state.username} onChangeText={(text) => this.setState({username:text})} textContentType="name"></TextInput>
                <TextInput placeholder="Email Address" value={this.state.email} onChangeText={(text) => this.setState({email:text})} ></TextInput>
                <TextInput placeholder="Password" value={this.state.password} onChangeText={(text) => this.setState({password:text})} secureTextEntry={true}></TextInput>
                <TextInput placeholder="Confirm Password" value={this.state.confirmPassword} onChangeText={(text) => this.setState({confirmPassword:text})} secureTextEntry={true}></TextInput>
                <Button title="Signup" onPress={()=>this.SignupPress()}></Button>
            </View>
        )
    }
}

export default Signup