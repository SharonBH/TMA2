const InitialState = {
    passwords: false,
    messageErr: ''
}
const changePassReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'CHANGE_PASSWORD_OPEN':
            const pass = action.payload
            return {
                ...state,
                passwords: pass
            }
        case 'CHANGE_PASSWORD':
        const data = action.payload
        return {
            ...state,
            messageErr: data
        }

        default:
    }
    return state;
}

export default changePassReducer;