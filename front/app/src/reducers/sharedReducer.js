const InitialState = {
    errorMessage: null,
    successMessage: null,
    toggleSpinner: false,
    catchErrorNum: 404,
    navAction: true,
	presetReques: null
}

const sharedReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ERROR_MESSAGE':
            const errorMessage = action.payload
            return {
                ...state,
                errorMessage: errorMessage
            }
        case 'SUCCESS_MESSAGE':
            const successMessage = action.payload
            return {
                ...state,
                successMessage: successMessage
            }
        case 'TOGGLE_SPINNER':
            const bool = action.payload
            return {
                ...state,
                toggleSpinner: bool
            }
        case 'ERROR_NUM':
            const num = action.payload
            return {
                ...state,
                catchErrorNum: num
            }
        case 'CLOSE_NAV':
            const navaction = action.payload
            return {
                ...state,
                navAction: navaction
            }
	    case 'CREATE_PRESET':
		    const presetaction = action.payload
		    return {
			    ...state,
			    presetReques: presetaction
		    }

        default:
    }
    return state;
}

export default sharedReducer;