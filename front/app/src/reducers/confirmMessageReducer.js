const InitialState = {
    signOutConfirmMessage: false,
    deleteUserConfirmMessage: false,
}

const confirmMessageReducer = (state = InitialState, action) => {
    switch (action.type) {
        
        case 'MESSAGE_CONFIRMATION_SIGN_OUT':
            const boll = action.payload
            return {
                ...state,
                signOutConfirmMessage: boll
            }
        case 'MESSAGE_CONFIRMATION_DELETE_USER':
            const boolean = action.payload
            return {
                ...state,
                deleteUserConfirmMessage: boolean
            }
        default:
    }
    return state;
}

export default confirmMessageReducer;