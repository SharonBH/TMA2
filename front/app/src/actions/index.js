// user login action 
// export const loginRequestAction = (response) => {
//     return {
//         type: 'LOGIN_SUBMIT',
//         payload: response
//     }
// }

export const getUserAction = (response) => {
    return {
        type: 'GET_USER',
        payload: response
    }
}

export const accessDeniedAction = (response) => {
    return {
        type: 'SET_ERROR_MESSAGE',
        payload: response
    }
}