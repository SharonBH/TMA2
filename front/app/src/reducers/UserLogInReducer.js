const InitialState = {
    userList: [],
    currentUser: {}
}

const UserLogInReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'USER_LIST_CALL':
            const userListArr = action.payload
            return {
                ...state,
                userList: userListArr
            }

        case 'LOGIN_SUBMIT':
            const user = action.payload
            return {
                ...state,
                currentUser: user
            }

        default:
            console.log('UserLogInReducer: InitialState')
    }
    return state;
}

export default UserLogInReducer;