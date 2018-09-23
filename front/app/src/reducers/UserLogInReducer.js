const InitialState = {
    currentUser: {name: 'roi', email: 'roi@beehivebi', username: 'liber.roi', password: 'L!ber21', role: 'Admin'},
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