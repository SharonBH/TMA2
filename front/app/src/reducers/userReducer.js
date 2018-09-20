const InitialState = {
    allUsersList: []
}


const userReducer = (state = InitialState, action) => {
    
    switch (action.type) {
        
        case 'GET_ALL_USERS':
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