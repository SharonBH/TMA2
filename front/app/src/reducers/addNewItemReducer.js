const InitialState = {
    addItem: false
}

const addNewItemReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ADD_A_NEW_ITEM':
            const boll = action.payload
            return {
                ...state,
                addItem: boll
            }

        default:
    }
    return state;
}

export default addNewItemReducer;