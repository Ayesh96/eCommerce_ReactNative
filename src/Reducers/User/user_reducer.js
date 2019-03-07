const _user = (state={},action)=>{
    let newState = state

    switch(action.type){
        
        case 'ADD_USER':
            newState = action.user
            console.log('====================================');
            console.log("New State  : ",newState);
            console.log('====================================');
            return newState

        case 'CLEAR_USER':
            return {}
            
        default:
            return newState
    }   
}

export default _user
