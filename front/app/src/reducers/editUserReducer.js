const InitialState = {
    editThisUser: false
}

const editUserReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'EDIT_THIS_USER':
            const boll = action.payload
            return {
                ...state,
                editThisUser: boll
            }

        default:
    }
    return state;
}

export default editUserReducer;