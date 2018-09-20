const InitialState = {
    errorMessage: null
}

const loginErrorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SET_LOGIN_ERROR_MESSAGE':
            const message = action.payload
            return {
                ...state,
                errorMessage: message
            }

        default:
    }
    return state;
}

export default loginErrorMessageReducer;