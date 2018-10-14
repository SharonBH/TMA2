const InitialState = {
    editThisItem: false,
    editThisGroup: false
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
        default:
    }
    return state;
}

export default editItemReducer;