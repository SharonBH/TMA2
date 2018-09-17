// get users list arr from api
export const userstListAction = (userListArr) => {
    return {
        type: 'USER_LIST_CALL',
        payload: userListArr
    }
}

// user login action 
export const loginRequestAction = (userObj) => {
    return {
        type: 'LOGIN_SUBMIT',
        payload: userObj
    }
}