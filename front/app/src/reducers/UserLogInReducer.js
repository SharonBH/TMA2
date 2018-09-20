const InitialState = {
    currentUser: null,
}

const UserLogInReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_USER':
            const user = action.payload
            console.log('111111')
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