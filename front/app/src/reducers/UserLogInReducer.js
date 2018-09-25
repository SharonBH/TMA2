const InitialState = {
    currentUser: null,
}

const UserLogInReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_USER':
            const user = action.payload
            return {
                ...state,
                currentUser: user
            }
        default:
    }
    return state;
}

export default UserLogInReducer;