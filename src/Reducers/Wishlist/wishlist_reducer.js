let initialState = {
    wishlist:[]
}

const _wishlist = (state=initialState,action)=>{
    
    switch(action.type){
        case 'ADD_REMOVE_WISHLIST':
        console.log('====================================');
        console.log("WISHLIST : s",state);
        console.log('====================================');
            let i = state.wishlist.findIndex(p=>p.id === action.product.id)
            if(i<0){
                state.wishlist.push(action.product)
            }
            else{
                state.wishlist.splice(i,1)
            }
            
            return state

        default:
            return state
    }
   
}

export default _wishlist