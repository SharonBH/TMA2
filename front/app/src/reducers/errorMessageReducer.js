const InitialState = {
    errorMessage: null
}

const errorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SET_ERROR_MESSAGE':
            const message = action.payload
            console.log('error', message)
            return {
                ...state,
                errorMessage: message
            }

        default:
            console.log('errorMessageReducer: InitialState')
    }
    return state;
}

export default errorMessageReducer;