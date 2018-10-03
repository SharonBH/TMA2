import axios from 'axios';
import history from '../configuration/history';

import {
    getUserAction,
    catchErrorAction,
    toggleLoaderAction,
    addNewUserAction,
    getAllUsersAction,
    changePassAction,
    successMessageAction,
    errorMessageAction,
} from './index';

// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            
                            sessionStorage.setItem('session', JSON.stringify(response.data));
                            const session = JSON.parse(sessionStorage.getItem('session'));
                            dispatch(getUserAction(session))
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/all_users'})
                        })
                        .catch((error) => {
                            dispatch(catchErrorAction([error][0]))
                            dispatch(errorMessageAction([error][0]))
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};

// login request
export const loginRequest = (userName, password) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        console.log('adsdasdasd',errorMessageAction)
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Login?username=${userName}&password=${password}`)
            .then((response) => {
                if(response.data.message === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            sessionStorage.setItem('session', JSON.stringify(response.data));
                            const session = JSON.parse(sessionStorage.getItem('session'));

                            dispatch(getUserAction(session))
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/home', state:[response.data]})
                        })
                        .catch((error) => {
                            dispatch(catchErrorAction([error][0]))
                            dispatch(errorMessageAction([error][0]))
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    // dispatch(accessDeniedAction(error))
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};



// register request
export const addNewUserRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    history.push({pathname: '/all_users'})
                    dispatch(addNewUserAction(false))
                    dispatch(successMessageAction(response.data.message))
                    dispatch(toggleLoaderAction(false))
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};


// get all users
export const takeAllUsers = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUsers`)
            .then((response) => {
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    history.push({pathname: '/all_users'})
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))

            });  
    }
};

// edit profile Request
export const editProfileRequest = (name, userName, email, password, userType) => {
    console.log(name, userName, email, password, userType)
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/EditUser?Email=${email}&Password=${password}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            dispatch(successMessageAction(response.data.message))
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/profile'})
                        })
                        .catch((error) => {
                         dispatch(errorMessageAction([error][0]))
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
 };

// edit User Request
export const editThisUserAction = (email, name, userType, userName) => {
    console.log(name, userName, email, userType)
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/EditUser?Email=${email}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/profile'})
                        })
                        .catch((error) => {
                            dispatch(errorMessageAction([error][0]))
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(`Sorry It Didn't Work For Us This Time, Error: ${error}`))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};


// delete user
export const DeleteUserRequest = (userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/DeleteUser?username=${userName}`)
            .then((response) => {
                if(response.data.response === 'Success') {
                    const data = response.data.message
                    // dispatch(deleteUserAction(data))
                    dispatch(takeAllUsers())
                    dispatch(successMessageAction(data))
                    // history.push({pathname: '/all_users'})
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
            });
    }
};


//forgot pass request
export const forgotPassRequest = (email) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/ForgotPassword?Email=${email}`)
            .then((response) => {
                console.log('QQQQ',response)
                if (response.data.response === 'Success') {
                    const data = response.data.message
                    
                    // dispatch(forgotPassAction(data))
                    dispatch(successMessageAction(data))
                    dispatch(toggleLoaderAction(false))
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};

// change Password Request
export const changePasswordRequest = (username, password, newPassword, confirmPassword) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/ChangePassword?Username=${username}&OldPassword=${password}&NewPassword=${newPassword}&ConfirmPassword=${confirmPassword}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    const data = response.data.message
                    dispatch(changePassAction(data))
                    // dispatch(changePassOpenAction(data))
                    dispatch(successMessageAction(data))
                    dispatch(toggleLoaderAction(false))
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction([error][0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};