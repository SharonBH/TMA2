const session = JSON.parse(sessionStorage.getItem('session'));
const sessionData = session === null ? null : session

const InitialState = {
    currentUser: sessionData,
    forgotPass: '',
    passwords: false,
}

const userReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_USER':
            const user = action.payload
            return {
                ...state,
                currentUser: user
            }
        case 'FORGOT_PASS':
            const data = action.payload
            return {
                ...state,
                forgotPass: data
            }
        case 'CHANGE_PASSWORD_OPEN':
            const pass = action.payload
            return {
                ...state,
                passwords: pass
            }
        default:
    }
    return state;
}

export default userReducer;