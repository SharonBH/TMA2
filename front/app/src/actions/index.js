// user login action 
export const getUserAction = (response) => {
    return {
        type: 'GET_USER',
        payload: response
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



//forgot pass Action
export const forgotPassAction = (data) => {
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

// catch Error
export const catchErrorAction = (number) => {
    return {
        type: 'ERROR_NUM',
        payload: number
    }
}

// error action
export const errorMessageAction = (message) => {
    return {
        type: 'ERROR_MESSAGE',
        payload: message
    }
}
// success action
export const successMessageAction = (message) => {
    return {
        type: 'SUCCESS_MESSAGE',
        payload: message
    }
}

export const closeNav = (action) => {
    return {
        type: 'CLOSE_NAV',
        payload: action
    }
}

export const signOutConfirmMessageAction = (bool) => {
    return {
        type: 'MESSAGE_CONFIRMATION_SIGN_OUT',
        payload: bool
    }
}

export const deleteUserConfirmMessageAction = (bool) => {
    return {
        type: 'MESSAGE_CONFIRMATION_DELETE_USER',
        payload: bool
    }
}

