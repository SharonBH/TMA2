const InitialState = {
    signOutConfirmMessage: false,
    deleteUserConfirmMessage: false,
	deleteEvent: ''
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
        case 'MESSAGE_CONFIRMATION_DELETE_TOURNAMENT':
            const boole = action.payload
            return {
                ...state,
                deleteUserConfirmMessage: boole
            }
        case 'MESSAGE_CONFIRMATION_DELETE_EVENT':
            const boolea = action.payload
            return {
                ...state,
                deleteUserConfirmMessage: boolea
            }
	    case 'DELETE_EVENT_ACTION':
            const item = action.payload
		    return {
			    ...state,
			    deleteEvent: item
		    }
        default:
    }
    return state;
}

export default confirmMessageReducer;