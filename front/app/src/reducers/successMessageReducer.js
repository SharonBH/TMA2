const InitialState = {
    successMessage: null
}

const successMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SUCCESS_MESSAGE':
            const message = action.payload
            return {
                ...state,
                successMessage: message
            }

        default:
    }
    return state;
}

export default successMessageReducer;