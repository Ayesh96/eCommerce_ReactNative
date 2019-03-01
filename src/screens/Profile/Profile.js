import React from 'react'
import {View,Text,Image} from 'react-native'
import Api from '../../../Api'
import {connect} from 'react-redux'


class Profile extends React.Component {

    render(){
        return(
            <View>
                <Image style={{width:300,height:300}} source={{uri:this.props.user.avatar}}/>
                <Text>Username : {this.props.user.username}</Text>
                <Text>Email Address : {this.props.user.username}</Text>
                <Text>Display Name : {this.props.user.displayname}</Text>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Profile)