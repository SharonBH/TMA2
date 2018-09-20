const InitialState = {
    errorMessage: null
}

const registerErrorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SET_REGISTER_ERROR_MESSAGE':
            const message = action.payload
            return {
                ...state,
                errorMessage: message
            }

        default:
    }
    return state;
}

export default registerErrorMessageReducer;