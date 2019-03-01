const _user = (state={},action)=>{
    let newState = state

    switch(action.type){
        
        case 'SIGNUP':
            return newState
        
        case "LOGIN":
            return newState

        default:
            return newState
    }   
}

export default _user
