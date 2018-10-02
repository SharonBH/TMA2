const session = JSON.parse(sessionStorage.getItem('session'));
const sessionData = session === null ? null : session

const InitialState = {
    
    currentUser: sessionData
}

const UserLogInReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_USER':
            
            const user = action.payload
            return {
                ...state,
                currentUser: user
            }
        default:
    }
    console.log('111', InitialState)
    return state;
}

export default UserLogInReducer;