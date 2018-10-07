const InitialState = {
    allList: [],
}

const allListReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_ALL_LIST':
            const users = action.payload
            return {
                ...state,
                allList: users
            }

        default:
    }
    return state;
}

export default allListReducer;