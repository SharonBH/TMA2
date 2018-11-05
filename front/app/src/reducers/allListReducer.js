const storage = JSON.parse(localStorage.getItem('localStoreTournament'));

const storageData = storage === null ? null : storage


const roles = JSON.parse(localStorage.getItem('localStoreRoles'));
const rolesData = storage === null ? null : roles

const InitialState = {
    allList: [],
    allTournsList: [],
    allEventsList: [],
    allEventTypesList: [],
    groupsList: null,
    tournById: storageData,
    eventDataArr: '',
    tournEventsByIdNoS: [],
    groupById: '',
    allRoles: rolesData,
    tournsDataById: [],
    groupsDataById: [],
    leaderBoardData: []
}

const allListReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ROLES':
        const roles = action.payload
        return {
            ...state,
            allRoles: roles
        }
        case 'GET_ALL_USERS':
            const users = action.payload
            return {
                ...state,
                allList: users
            }
        case 'GET_ALL_TOURS':
            const tours = action.payload
            return {
                ...state,
                allTournsList: tours
            }
        case 'GET_ALL_EVENTS':
            const events = action.payload
            return {
                ...state,
                allEventsList: events
            }
        case 'GET_ALL_EVENT_TYPES':
            const eventTypes = action.payload
            return {
                ...state,
                allEventTypesList: eventTypes
            }
        case 'GET_ALL_GROUPS':
            const groups = action.payload
            return {
                ...state,
                groupsList: groups
            }
        case 'GET_GROUP_BY_ID':
            const groupId = action.payload
            return {
                ...state,
                groupById: groupId
            }
        case 'GET_TOURNAMENTS_BY_USER_ID':
            const tournsData = action.payload
            return {
                ...state,
                tournsDataById: tournsData
            }
            case 'GET_GROUPS_BY_USER_ID':
            const groupsData = action.payload
            return {
                ...state,
                groupsDataById: groupsData
            }
        case 'GET_TOURN_BY_ID':
            const tournId = action.payload
            return {
                ...state,
                tournById: tournId
            }
        case 'GET_TOURN_BY_ID_NO_S':
            const Data = action.payload
            return {
                ...state,
                tournEventsByIdNoS: Data
            }
        case 'SEND_EVENT_DATA':
            const eventData = action.payload
            return {
                ...state,
                eventDataArr: eventData
            }
        case 'GET_LEADERBOARD_DATA':
            const leaderData = action.payload
            return {
                ...state,
                leaderBoardData: leaderData
            }
        default:
    }
    // console.log('ddddddddddddddddd', state.groupsList)
    return state;
}

export default allListReducer;