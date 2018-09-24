const InitialState = {
    allUsersList: [],
    isLoading: false
}


const userReducer = (state = InitialState, action) => {
    
    switch (action.type) {
        case 'GET_ALL_USERS':
        const usersArr = action.payload;
        return {
            ...state,
            allUsersList: usersArr,
            isLoading: false
        }
        case 'SET_ISLOADING_TO_TRUE':
            const bool = action.payload
            // console.log('true')
            return {
                ...state,
                isLoading: bool
            }
        case 'DELETE_USER':
            const data = action.payload
            console.log('data reducer', data)
            const newList = data.filter((result, j) => j !== action.data);
            return {
                ...state,
                allUsersList: newList
            }
            // case REMOVE_ACTIONS:
            // const actionList = [...state.groups]
            // const newActionList = actionList.filter((result, j) => j !== action.actionList);
            // return {
            //     ...state,
            //     groups: newActionList
            // }
        default:
    }
    return state
    
}


export default userReducer;