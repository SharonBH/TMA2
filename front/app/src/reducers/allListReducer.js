const storage = JSON.parse(localStorage.getItem('localStoreTournament'));
const storageData = storage === null ? this.state.tournById : storage

const InitialState = {
    allList: [],
    allTournsList: [],
    allEventsList: [],
    allEventTypesList: [],
    groupsList: null,
    tournById: storageData,
    eventDataArr: '',
    tournByIdNoS: []
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
        case 'GET_TOURN_BY_ID_NO_S':
            const Data = action.payload
            return {
                ...state,
                tournByIdNoS: Data
            }
        case 'SEND_EVENT_DATA':
            const eventData = action.payload
            return {
                ...state,
                eventDataArr: eventData
            }
        default:
    }
    // console.log('ddddddddddddddddd', state.groupsList)
    return state;
}

export default allListReducer;