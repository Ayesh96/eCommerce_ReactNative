let initialState = {
    cart:[]
}

const _cart = (state=initialState,action)=>{
    let newState = initialState

    switch(action.type){
        
        case 'ADD_REMOVE_CART':
        console.log('====================================');
        console.log("Latest State",state);
        console.log('====================================');

        if(state.cart != null && state.cart.length > 0){
            newState.cart = [...state.cart]
        }
       
            
        //let state = state.cart
        if(newState.cart.length > 0){
            let i = newState.cart.findIndex(p=>p.id === action.product.id)
            if(i<0){
                //newState.cart.push(action.product)
                newState.cart.splice(newState.cart.length,0,action.product)
            }
            else{
                newState.cart.filter(product=> product.id != action.product.id)
            }
        }
        else{
            newState.cart.push(action.product)
        }
          
            
            return newState
        
        default:
            return newState

    }
   
}

export default _cart