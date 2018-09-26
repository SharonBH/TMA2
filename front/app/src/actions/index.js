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
// user edit error action
export const editDeniedAction = (response) => {
    return {
        type: 'SET_EDIT_ERROR_MESSAGE',
        payload: response
    }
}
// catch Error
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


// toggle Loader Action
export const toggleLoaderAction = (boll) => {
    return {
        type: 'TOGGLE_SPINNER',
        payload: boll
    }
}

// add New User Action
export const addNewUserAction = (boll) => {
    return {
        type: 'ADD_A_NEW_USER',
        payload: boll
    }
}

//delete user Action
export const deleteUserAction = (data) => {
    return {
        type: 'DELETE_USER',
        payload: data
    }
}

//forgot pass Action
export const forgotPassAction = (data) => {
    console.log('action', data)
    return {
        type: 'FORGOT_PASS',
        payload: data

    }
}

// edit This User Action
export const editThisUserAction = (boll) => {
    return {
        type: 'EDIT_THIS_USER',
        payload: boll
    }
}

// change pass Action
export const changePassOpenAction = (pass) => {
    
    return {
        type: 'CHANGE_PASSWORD_OPEN',
        payload: pass
    }
}
export const changePassAction = (pass) => {
    
    return {
        type: 'CHANGE_PASSWORD',
        payload: pass
    }
}