const InitialState = {
    usersList: null,
}

const usersListReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_ALL_USERS':
            const users = action.payload
            return {
                ...state,
                usersList: users
            }

        default:
    }
    return state;
}

export default usersListReducer;