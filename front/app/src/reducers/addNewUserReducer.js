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

        default: console.log('rwducwe:', state)
    }
    return state;
}

export default addNewUserReducer;