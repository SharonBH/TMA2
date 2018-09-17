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
    }
    return state
    }

export default userReducer;