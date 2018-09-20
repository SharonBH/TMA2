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
        console.log('GET_ALL_USERS')
    }
    return state
}


export default userReducer;