const InitialState = {
    forgotPass: ''
}

const forgotPassReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'FORGOT_PASS':
            const data = action.payload
            console.log('reducer', data)
            return {
                ...state,
                forgotPass: data
            }

        default:
    }
    return state;
}

export default forgotPassReducer;