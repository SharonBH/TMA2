const InitialState = {
    allList: [],
}

const allListReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'GET_ALL_USERS':
            const users = action.payload
            return {
                ...state,
                allList: users
            }
        case 'GET_ALL_TOURS':
            const tours = action.payload
            return {
                ...state,
                allList: tours
            }
        default:
    }
    return state;
}

export default allListReducer;