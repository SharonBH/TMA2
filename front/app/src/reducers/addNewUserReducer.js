const InitialState = {
    addUser: false
}

const addNewUserReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ADD_A_NEW_USER':
            const boll = action.payload
            return {
                ...state,
                addUser: boll
            }

        default:
    }
    return state;
}

export default addNewUserReducer;