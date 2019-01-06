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
export const closeRespNav = (action) => {
	return {
		type: 'CLOSE_RESP_NAV',
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



// get user roles 
export const getAllRoles = (response) => {
    return {
        type: 'GET_ALL_ROLES',
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
//get all Tournaments
export const getAllToursAction = (response) => {
    return {
        type: 'GET_ALL_TOURS',
        payload: response,

    }
}
//get Tournament by ID
export const getTournByIdAction = (response) => {
    return {
        type: 'GET_TOURN_BY_ID',
        payload: response
    }
}
export const getTournByIdNoSAction = (response) => {
    return {
        type: 'GET_TOURN_BY_ID_NO_S',
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
    return {
        type: 'ADD_A_NEW_ITEM',
        payload: boll
    }
}
// add New User Action
export const addNewGroupAction = (boll) => {
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
export const getGroupById = (group) => {
    return {
        type: 'GET_GROUP_BY_ID',
        payload: group
    }
}
//take tournaments by id
export const takeMyTournaments = (tourns) => {
    return {
        type: 'GET_TOURNAMENTS_BY_USER_ID',
        payload: tourns
    }
}
//take groups by user id
export const takeMyGroups = (groups) => {
    return {
        type: 'GET_GROUPS_BY_USER_ID',
        payload: groups
    }
}
//take events by user id
export const takeMyEvents = (events) => {
    return {
        type: 'TAKE_EVENTS_BY_ID_ACTION',
        payload: events
    }
}
//take events by user id
export const takeMyHomeLeader = (allData) => {
    return {
        type: 'TAKE_HOME_LEADERBOARD_ACTION',
        payload: allData
    }
}
// edit This group Action
export const editThisGroupAction = (boll) => {
    return {
        type: 'EDIT_THIS_GROUP',
        payload: boll
    }
}

export const sendEventDataAction = (data, match) => {
    return {
        type: 'SEND_EVENT_DATA',
        payload: data
    }
}
export const sendEvetnMatchAction = (match) => {
    return {
        type: 'SEND_EVENT_MATCH',
        payload: match
    }
}
export const getLeaderboardsSAction = (leaderData) => {

    return {
        type: 'GET_LEADERBOARD_DATA',
        payload: leaderData
    }
}

export const takeGroupIdPop = (groupId) => {
    return {
        type: 'TAKE_GROUP_ID',
        payload: groupId
    }
}
export const takeGroupIdPopAction = (boll) => {
    return {
        type: 'TAKE_GROUP_ID_ACTION',
        payload: boll
    }
}

export const deleteEventAction = (boll) => {
    //console.log(boll)
	return {
		type: 'DELETE_EVENT_ACTION',
		payload: boll
	}
}
export const CreateTournamentPresetsAction = (response) => {
	return {
		type: 'CREATE_PRESET',
		payload: response
	}
}