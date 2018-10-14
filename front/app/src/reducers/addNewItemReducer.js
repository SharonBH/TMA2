const InitialState = {
    addItem: false,
    addTournament: false,
    addEvent: false,
}

const addNewItemReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ADD_A_NEW_ITEM':
            
            const boll = action.payload
            console.log('123', boll)
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

        default:
    }
    return state;
}

export default addNewItemReducer;