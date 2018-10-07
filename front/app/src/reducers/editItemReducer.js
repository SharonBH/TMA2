const InitialState = {
    editThisItem: false
}

const editItemReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'EDIT_THIS_ITEM':
            const boll = action.payload
            return {
                ...state,
                editThisItem: boll
            }

        default:
    }
    return state;
}

export default editItemReducer;