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
    return {
        type: 'GET_ALL_TOURS',
        payload: response
    }
}
//get Tournament by ID
export const getTournByIdAction = (response) => {
    return {
        type: 'GET_TOURN_BY_ID',
        payload: response
    }
}
//get all Events
export const getAllEventsAction = (response) => {
    return {
        type: 'GET_ALL_EVENTS',
        payload: response
    }
}
//get all Event Types
export const getAllEventTypesAction = (response) => {
    return {
        type: 'GET_ALL_EVENT_TYPES',
        payload: response
    }
}
// add New Tournament Action
export const addNewTournamentAction = (boll) => {
    return {
        type: 'ADD_A_NEW_TOURNAMENT',
        payload: boll
    }
}
// add New Event Action
export const addNewEventAction = (boll) => {
    return {
        type: 'ADD_A_NEW_EVENT',
        payload: boll
    }
}
// add New User Action
export const addNewItemAction = (boll) => {
    console.log('12', boll)
    return {
        type: 'ADD_A_NEW_ITEM',
        payload: boll
    }
}
// add New User Action
export const addNewGroupAction = (boll) => {
    console.log('12', boll)
    return {
        type: 'ADD_A_NEW_GROUP',
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
// edit This Event Action
export const editThisEventAction = (boll) => {
    return {
        type: 'EDIT_THIS_EVENT',
        payload: boll
    }
}
// get all groups
export const getAllGroups = (arr) => {
    return {
        type: 'GET_ALL_GROUPS',
        payload: arr
    }
}

// edit This group Action
export const editThisGroupAction = (boll) => {
    return {
        type: 'EDIT_THIS_GROUP',
        payload: boll
    }
}







