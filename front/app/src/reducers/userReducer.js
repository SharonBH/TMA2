const InitialState = {
    newUsers: ''
}


const userReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
        const userValue = action.payload
        console.log('reduser', userValue)
        return {
            ...state,
            newUsers:[
                ...state.newUsers,
                userValue
            ]
        }
        default:
        console.log('userReducer: InitialState')
    }
    return state
    }

export default userReducer;