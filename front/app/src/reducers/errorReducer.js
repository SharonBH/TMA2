const InitialState = {
    catchErrorNum: 404
}

const errorReducer = (state = InitialState, action) => {
    switch (action.type) {

        case 'ERROR_NUM':
            const num = action.payload
            return {
                ...state,
                catchErrorNum: num
            }

        default:
    }
    return state;
}

export default errorReducer;