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

// get Users List Action
export const getUsersListAction = (arr) => {
    return {
        type: 'GET_ALL_USERS',
        payload: arr
    }
}

// edit This User Action
export const editThisUserAction = (boll) => {
    return {
        type: 'EDIT_THIS_USER',
        payload: boll
    }
}