// user login action 
export const getUserAction = (response) => {
    return {
        type: 'GET_USER',
        payload: response
    }
}
// user login error action
export const accessDeniedAction = (response) => {
    return {
        type: 'SET_LOGIN_ERROR_MESSAGE',
        payload: response
    }
}

// user register error action
export const registerDeniedAction = (response) => {
    return {
        type: 'SET_REGISTER_ERROR_MESSAGE',
        payload: response
    }
}
//catch error
export const catchErrorAction = (number) => {
    return {
        type: 'ERROR_NUM',
        payload: number
    }
}

//get all users
export const getAllUsersAction = (response) => {
    return {
        type: 'GET_ALL_USERS',
        payload: response
    }
}

// user edit error action
export const editDeniedAction = (response) => {
    return {
        type: 'SET_EDIT_ERROR_MESSAGE',
        payload: response
    }
}

// toggle Loader Action
export const toggleLoaderAction = (boll) => {
    return {
        type: 'TOGGLE_SPINNER',
        payload: boll
    }
}
export const deleteUserAction = (data) => {
    return {
        type: 'DELETE_USER',
        payload: data
    }
}
export const forgotPassAction = (data) => {
    console.log('action', data)
    return {
        type: 'FORGOT_PASS',
        payload: data
    }
}