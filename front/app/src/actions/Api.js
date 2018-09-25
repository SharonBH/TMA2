import axios from 'axios';
import history from '../configuration/history';
import { 
    getUserAction, 
    accessDeniedAction, 
    registerDeniedAction, 
    catchErrorAction, 
    getAllUsersAction, 
    editDeniedAction, 
    deleteUserAction,
    toggleLoaderAction,
    forgotPassAction
} from './index';


// login request
// login request
export const loginRequest = (userName, password) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Login?username=${userName}&password=${password}`)
            .then((response) => {
                if(response.data.message === 'Success') {
                    return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user))
                            history.push({pathname: '/home'})
                            dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(catchErrorAction(error))
                            history.push({pathname: '/not_found'})
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(accessDeniedAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });
    }
};

// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            history.push({pathname: '/home'})
                            dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(catchErrorAction(error))
                            history.push({pathname: '/not_found'})
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(registerDeniedAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });
    }
};


// get all users
export const takeAllUsers = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUsers`)
            .then((response) => {
                if(response.statusText === 'OK') {
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    history.push({pathname: '/all_users'})
                    dispatch(toggleLoaderAction(false))
                
                } else {
                    const error = response.data.message
                    dispatch(accessDeniedAction(error))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });  
    }
};

////////
// edit User Request
export const editUserRequest = (name, userName, email, password, userType) => {
    console.log(name, userName, email, password, userType)
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/EditUser?Email=${email}&Password=${password}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/profile'})
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(editDeniedAction(`Sorry It Didn't Work For Us This Time, Error: ${error}`))
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(editDeniedAction(`Sorry It Didn't Work For Us This Time, Error: ${error}`))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                dispatch(editDeniedAction(`Sorry It Didn't Work For Us This Time, Error: ${error}`))
                dispatch(toggleLoaderAction(false))
            });
    }
}

// delete user
export const deleteUser = (userName) => {
    return (dispatch) => {
        // return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/DeleteUser?username=${userName}`)
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/DeleteUser?username=${userName}`)
            .then((response) => {
                console.log('delete response',response)
                if(response.data.message === 'Success') {
                    const data = response.data
                    console.log('delete data',data)
                    dispatch(deleteUserAction(data))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                // history.push({pathname: '/not_found'})
            });
    }
};


//forgot pass request
export const forgotPassRequest = (email) => {
    return (dispatch) => {
        console.log(' to email', dispatch)
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/ForgotPassword?Email=${email}`)
            .then((response) => {
                console.log('pass sent to email', response)
                if (response.data.response === 'Success') {
                    const data = response.data
                    console.log('pass sent to email')
                    dispatch(forgotPassAction(data))
                } else {
                    const error = response.data.message
                    dispatch(registerDeniedAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                // history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });
    }
};

