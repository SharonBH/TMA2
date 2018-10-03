const InitialState = {
    navAction: true
}

const closeNavReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'CLOSE_NAV':
            const navaction = action.payload
            return {
                ...state,
                navAction: navaction
            }

        default:
    }
    return state;
}

export default closeNavReducer;