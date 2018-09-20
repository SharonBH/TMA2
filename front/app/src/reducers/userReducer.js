const InitialState = {
    allUsersList: []
}


const userReducer = (state = InitialState, action) => {
    
    switch (action.type) {
        
        case 'GET_ALL_USERS':
        console.log('22222222222222')
        const usersArr = action.payload;
        return {
            ...state,
            allUsersList: usersArr
        }
        default:
        
    }
    return state
}


export default userReducer;