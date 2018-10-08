//USER ACTIONS

// user login action 
export const getUserAction = (response) => {
    return {
        type: 'GET_USER',
        payload: response
    }
}
//forgot pass Action
export const forgotPassAction = (data) => {
    return {
        type: 'FORGOT_PASS',
        payload: data

    }
}
// change pass Action
export const changePassOpenAction = (pass) => {
    
    return {
        type: 'CHANGE_PASSWORD_OPEN',
        payload: pass
    }
}

//SHARED ACTIONS

// toggle Loader Action
export const toggleLoaderAction = (boll) => {
    return {
        type: 'TOGGLE_SPINNER',
        payload: boll
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

//CONFIRM MESSAGES

// sign-Out Confirm Message Action
export const signOutConfirmMessageAction = (bool) => {
    return {
        type: 'MESSAGE_CONFIRMATION_SIGN_OUT',
        payload: bool
    }
}
// delete-User Confirm Message Action
export const deleteConfirmMessageAction = (bool) => {
    return {
        type: 'MESSAGE_CONFIRMATION_DELETE_USER',
        payload: bool
    }
}





//get all users
export const getAllUsersAction = (response) => {
    return {
        type: 'GET_ALL_USERS',
        payload: response
    }
}
//get all Tournaments
export const getAllToursAction = (response) => {
    console.log('22', response)
    return {
        type: 'GET_ALL_TOURS',
        payload: response
    }
}

// add New User Action
export const addNewItemAction = (boll) => {
    return {
        type: 'ADD_A_NEW_ITEM',
        payload: boll
    }
}

// edit This User Action
export const editThisItemAction = (boll) => {
    return {
        type: 'EDIT_THIS_ITEM',
        payload: boll
    }
}







