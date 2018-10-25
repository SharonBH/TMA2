const InitialState = {
    addItem: false,
    addTournament: false,
    addEvent: false,
    addGroup: false,
}

const addNewItemReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ADD_A_NEW_ITEM':
            const boll = action.payload
            return {
                ...state,
                addItem: boll
            }
        case 'ADD_A_NEW_TOURNAMENT':
            const tourn = action.payload
            return {
                ...state,
                addTournament: tourn
            }
        case 'ADD_A_NEW_EVENT':
            const event = action.payload
            return {
                ...state,
                addEvent: event
            }
        case 'ADD_A_NEW_GROUP':
            const group = action.payload
            return {
                ...state,
                addGroup: group
            }

        default:
    }
    return state;
}

export default addNewItemReducer;