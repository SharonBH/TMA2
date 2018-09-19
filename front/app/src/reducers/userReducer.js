const InitialState = {
    newUsers: ''
}


const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
        const userValue = action.payload;
        return {
            ...state,
            newUsers:[
                ...state.newUsers,
                userValue
            ]
        }
        default: console.log('userReducer')
    }
    return state
}


export default userReducer;