const InitialState = {
    confirmMessage: false
}

const confirmMessageReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'MESSAGE_CONFIRMATION':
            const boll = action.payload
            return {
                ...state,
                confirmMessage: boll
            }

        default:
    }
    return state;
}

export default confirmMessageReducer;