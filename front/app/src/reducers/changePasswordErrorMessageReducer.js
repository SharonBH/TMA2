const InitialState = {
    errorMessage: null
}

const changePasswordErrorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'CHANGE_PASSWORD_ERROR':
            const message = action.payload
            return {
                ...state,
                errorMessage: message
            }

        default:
    }
    return state;
}

export default changePasswordErrorMessageReducer;