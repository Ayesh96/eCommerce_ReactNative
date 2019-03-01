import React,{Component} from 'react'
import {ScrollView,Text,TouchableOpacity,Button,TextInput,Alert} from 'react-native'
import Api from '../../../Api'
import {connect} from 'react-redux'
import NavigationService from '../../../NavigationService'

class Checkout extends Component {

    state = {  
            billing_firstname:"",
            billing_lastname:"",
            billing_address1:"",
            billing_city:"",
            billing_country:"",
            billing_state:"",
            billing_postcode:"",
            billing_email:"",
            billing_phone:"",

            shipping_firstname:"",
            shipping_lastname:"",
            shipping_address1:"",
            shipping_city:"",
            shipping_country:"",
            shipping_state:"",
            shipping_postcode:""
    }

    setUserDetails = (data) => {
        this.setState({
            billing_firstname:data.billing.first_name,
            billing_lastname:data.billing.last_name,
            billing_address1:data.billing.address_1,
            billing_city:data.billing.city,
            billing_country:data.billing.country,
            billing_state:data.billing.state,
            billing_postcode:data.billing.postcode,
            billing_email:data.billing.email,
            billing_phone:data.billing.phone,

            shipping_firstname:data.shipping.first_name,
            shipping_lastname:data.shipping.last_name,
            shipping_address1:data.shipping.address_1,
            shipping_city:data.shipping.city,
            shipping_country:data.shipping.country,
            shipping_state:data.shipping.state,
            shipping_postcode:data.shipping.postcode
        })
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    fieldsValidated(){
        if (this.state.billing_firstname == null  || 
            this.state.billing_lastname  == null  || 
            this.state.billing_address1  == null  || 
            this.state.billing_city      == null  || 
            this.state.billing_country   == null  || 
            this.state.billing_state     == null  || 
            this.state.billing_postcode  == null  || 
            this.state.billing_email     == null  || 
            this.state.billing_phone     == null  ||
            this.state.billing_firstname == ""    || 
            this.state.billing_lastname  == ""    || 
            this.state.billing_address1  == ""    || 
            this.state.billing_city      == ""    || 
            this.state.billing_country   == ""    || 
            this.state.billing_state     == ""    || 
            this.state.billing_postcode  == ""    || 
            this.state.billing_email     == ""    || 
            this.state.billing_phone     == ""    ||
            this.state.shipping_firstname == null || 
            this.state.shipping_lastname  == null || 
            this.state.shipping_address1  == null || 
            this.state.shipping_city      == null || 
            this.state.shipping_country   == null || 
            this.state.shipping_state     == null || 
            this.state.shipping_postcode  == null ||
            this.state.shipping_firstname == ""   || 
            this.state.shipping_lastname  == ""   || 
            this.state.shipping_address1  == ""   || 
            this.state.shipping_city      == ""   || 
            this.state.shipping_country   == ""   || 
            this.state.shipping_state     == ""   || 
            this.state.shipping_postcode  == "") {

                Alert.alert("Some fields are missing")
                return false
        }else {
            if (!this.validateEmail(this.state.billing_email)) {
                Alert.alert("Invalid Email Entered")
              return false
            }
            else {
              return true
            }
          }
    }

    componentWillMount = () => {

        console.log('====================================');
        console.log("Cart Items : ",this.props.cart);
        console.log('====================================');
        Api.get("customers/"+this.props.user.id,{},
        data=>{
            this.setUserDetails(data)
        },error=>{
            Alert.alert(error.message)
        })
    }

    setBillingDetails(){

        let billing = {
            first_name:this.state.billing_firstname,
            last_name:this.state.billing_lastname,
            address_1:this.state.billing_address1,
            country:this.state.billing_country,
            state:this.state.billing_state,
            city:this.state.billing_city,
            postcode:this.state.billing_postcode,
            phone:this.state.billing_phone,
            email:this.state.billing_email
        }

        return billing
    }

    setShippingDetails(){

        let shipping = {
            first_name:this.state.shipping_firstname,
            last_name:this.state.shipping_lastname,
            address_1:this.state.shipping_address1,
            country:this.state.shipping_country,
            state:this.state.shipping_state,
            city:this.state.shipping_city,
            postcode:this.state.shipping_postcode,
        }

        return shipping
    }
    updateDetails = () => {
        
        let user = {
            billing:this.setBillingDetails,
            shipping:this.setShippingDetails
        }
        
        if(this.fieldsValidated()){
            Api.post("customers/"+this.props.user.id,
            user,
            data => {
                Alert.alert("Details Updated")
            },error => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })
        }       
    }

    confirmOrder = () => {
        this.updateDetails()

        let order = {
            billing:this.setBillingDetails,
            shipping:this.setShippingDetails,
            line_items:[],
            customer_id:this.props.user.id
            
        }

        let item = {
            product_id:0,
            quantity:0

        }

        for(let i=0;i<this.props.cart.length;i++){
            item.product_id = this.props.cart[i].id
            item.quantity = this.props.cart[i].qty
            order.line_items.push(item)
        }

        Api.post("orders",order,
        data=>{
            Alert.alert("Order Created Successfuly, Your Order ID is "+data.id)
            NavigationService.navigate("Profile",{})
        },error=>{
            console.log('====================================');
            console.log("Error : ",error);
            console.log('====================================');
        })
    }
    render(){
        return(
            <ScrollView>

                <Text>Billing</Text>

                <TextInput placeholder="First Name"  
                    value={this.state.billing_firstname}
                    onChangeText={(text)=>{this.setState({billing_firstname:text})}}>
                    </TextInput>
                <TextInput placeholder="Last Name" 
                    value={this.state.billing_lastname}
                    onChangeText={(text)=>{this.setState({billing_lastname:text})}}>
                    </TextInput>
                <TextInput placeholder="Address" 
                    value={this.state.billing_address1}
                    onChangeText={(text)=>{this.setState({billing_address1:text})}}>
                    </TextInput>
                <TextInput placeholder="Country" 
                    value={this.state.billing_country}
                    onChangeText={(text)=>{this.setState({billing_country:text})}}>
                    </TextInput>
                <TextInput placeholder="State" 
                    value={this.state.billing_state}
                    onChangeText={(text)=>{this.setState({billing_state:text})}}>
                    </TextInput>
                <TextInput placeholder="City" 
                    value={this.state.billing_city}
                    onChangeText={(text)=>{this.setState({billing_city:text})}}>
                    </TextInput>
                <TextInput placeholder="Postal Code" 
                    value={this.state.billing_postcode}
                    onChangeText={(text)=>{this.setState({billing_postcode:text})}}>
                    </TextInput>
                <TextInput placeholder="Phone" 
                    value={this.state.billing_phone}
                    onChangeText={(text)=>{this.setState({billing_phone:text})}}>
                    </TextInput>
                <TextInput placeholder="Email Address" 
                    value={this.state.billing_email}
                    onChangeText={(text)=>{this.setState({billing_email:text})}}>
                    </TextInput>


                <Text>Shipping</Text>


                <TextInput placeholder="First Name"  
                    value={this.state.shipping_firstname}
                    onChangeText={(text)=>{this.setState({shipping_firstname:text})}}>
                    </TextInput>
                <TextInput placeholder="Last Name"  
                    value={this.state.shipping_lastname}
                    onChangeText={(text)=>{this.setState({shipping_lastname:text})}}>
                    </TextInput>
                <TextInput placeholder="Address"  
                    value={this.state.shipping_address1}
                    onChangeText={(text)=>{this.setState({shipping_address1:text})}}>
                    </TextInput>
                <TextInput placeholder="Country" 
                    value={this.state.shipping_country}
                    onChangeText={(text)=>{this.setState({shipping_country:text})}}>
                    </TextInput>
                <TextInput placeholder="State"  
                    value={this.state.shipping_state}
                    onChangeText={(text)=>{this.setState({shipping_state:text})}}>
                    </TextInput>
                <TextInput placeholder="City"  
                    value={this.state.shipping_city}
                    onChangeText={(text)=>{this.setState({shipping_city:text})}}>
                    </TextInput>
                <TextInput placeholder="Postal Code"  
                    value={this.state.shipping_postcode}
                    onChangeText={(text)=>{this.setState({shipping_postcode:text})}}>
                    </TextInput>


                <Button title="Confirm Order" onPress={this.confirmOrder}></Button>
            </ScrollView>
        )
    }
}

mapStateToProps = (state) => {
    return {
        user:state.user,
        cart:state.cart
    }
}

export default connect(mapStateToProps)(Checkout)