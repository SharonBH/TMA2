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
//toggle Loader Action
export const toggleLoaderAction = (boll) => {
    return {
        type: 'TOGGLE_SPINNER',
        payload: boll
    }
}