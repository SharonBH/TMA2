const InitialState = {
    allUsersList: [],
    isLoading: false,
    message: ''
}


const userReducer = (state = InitialState, action) => {
    
    switch (action.type) {
        case 'GET_ALL_USERS':
        const usersArr = action.payload;
        return {
            ...state,
            allUsersList: usersArr,
            isLoading: false
        }
        case 'SET_ISLOADING_TO_TRUE':
            const bool = action.payload
            return {
                ...state,
                isLoading: bool
            }
        
        default:
    }
    return state
    
}


export default userReducer;