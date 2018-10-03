const InitialState = {
    errorMessage: null
}

const errorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ERROR_MESSAGE':
            const message = action.payload
            return {
                ...state,
                errorMessage: message
            }

        default:
    }
    return state;
}

export default errorMessageReducer;