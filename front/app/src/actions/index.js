// user login action 
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


export const getAllUsers = (a) => {
    console.log('111111111111')
    return {
        type: 'GET_ALL_USERS',
        payload: a
    }
}
// export const getAllUsersAction = (response) => {
//     return {
//         type: 'GET_ALL_USERS',
//         payload: response
//     }
// }