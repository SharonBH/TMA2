const InitialState = {
    editThisItem: false,
    editThisGroup: false,
    editThisEvent: false
}

const editItemReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'EDIT_THIS_ITEM':
            const boll = action.payload
            return {
                ...state,
                editThisItem: boll
            }
        case 'EDIT_THIS_GROUP':
            const group = action.payload
            return {
                ...state,
                editThisGroup: group
            }
        case 'EDIT_THIS_EVENT':
            const event = action.payload
            return {
                ...state,
                editThisEvent: event
            }
        default:
    }
    return state;
}

export default editItemReducer;