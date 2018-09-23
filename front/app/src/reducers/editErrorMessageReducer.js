const InitialState = {
    errorMessage: null
}

const editErrorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SET_EDIT_ERROR_MESSAGE':
            const message = action.payload
            return {
                ...state,
                errorMessage: message
            }

        default:
    }
    return state;
}

export default editErrorMessageReducer;