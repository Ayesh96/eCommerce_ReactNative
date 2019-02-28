const _cart = (state=[],action)=>{
    let newState = state

    switch(action.type){
        
        case 'ADD_REMOVE_CART':

        if(state != null && state.length > 0){
            newState= [...state];
        }
 
        if(newState.length > 0){
            let i = newState.findIndex(p=>p.id === action.product.id)
            if(i<0){
                newState.splice(newState.length,0,action.product)                
            }
            else{
                newState = newState.filter(product=> product.id != action.product.id)
                console.log('====================================');
                console.log("Removed : ",i,"  ",action.product.id);
                console.log('====================================');
                
            }
        }
        else{
            newState = []
            newState.push(action.product)        
        } 
            return newState
        
        default:
            return newState

    }


   
}

export default _cart
