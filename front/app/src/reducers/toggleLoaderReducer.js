const InitialState = {
    toggleSpinner: false
}

const toggleLoaderReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'TOGGLE_SPINNER':
            const bool = action.payload
            return {
                ...state,
                toggleSpinner: bool
            }

        default:
    }
    return state;
}

export default toggleLoaderReducer;