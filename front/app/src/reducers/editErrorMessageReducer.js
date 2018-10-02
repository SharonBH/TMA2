const InitialState = {
    editErrorMessage: null
}

const editErrorMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'SET_EDIT_ERROR_MESSAGE':
            const message = action.payload
            console.log('action error' , message)
            return {
                ...state,
                editErrorMessage: message
            }

        default:
    }
    return state;
}

export default editErrorMessageReducer;