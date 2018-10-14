const storage = JSON.parse(localStorage.getItem('localStoreTournament'));
const storageData = storage === null ? null : storage

const InitialState = {
    allList: [],
    allTournsList: [],
    allEventsList: [],
    allEventTypesList: [],
    groupsList: null,
    tournById: storageData
}


const allListReducer = (state = InitialState, action) => {
    switch (action.type) {

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
        case 'GET_TOURN_BY_ID':
            const tournId = action.payload
            return {
                ...state,
                tournById: tournId
            }
        default:
    }
    // console.log('ddddddddddddddddd', state.groupsList)
    return state;
}

export default allListReducer;