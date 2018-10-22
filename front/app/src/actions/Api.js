import axios from 'axios';
import history from '../configuration/history';
import {
    getUserAction,
    catchErrorAction,
    toggleLoaderAction,
    addNewItemAction,
    getAllUsersAction,
    // changePassAction,
    successMessageAction,
    errorMessageAction,
} from './index';
import { EDIT, YOUR_PROFILE } from '../configuration/config'

// const cors ='https://cors-anywhere.herokuapp.com/'
const cors =''
const url = 'https://tma-api.azurewebsites.net/'

// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
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


// return axios({
//     method: 'post',
//     headers: {'Content-Type': 'application/json; charset=UTF-8'},
//     url: cors + url + 'Tournaments/GetTournamentById',
//     data: tournamentId
// })

// login request
export const loginRequest = (userName, password) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios
        ({
            "crossDomain": true,
            method: 'POST',
            url: cors + 'https://tma-api.azurewebsites.net/Account/Login',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                "cache-control": "no-cache",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            },
            data: {
                username: userName,
                password: password
            }
        })
        .post(cors + url + `Account/Login`, {
            username: userName,
            password: password
        })
        // return axios.post(`https://tma-api.azurewebsites.net/Account/Login`, {
        //     username: userName,
        //     password: password
        // })
        .then((response) => {
            if(response.data.message === 'Success') {
                return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
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
                dispatch(errorMessageAction(error))
                dispatch(toggleLoaderAction(false))
            }
        })
        .catch((error) => {
            console.log(error)
            dispatch(catchErrorAction([error][0]))
            dispatch(errorMessageAction(error[0]))
            dispatch(toggleLoaderAction(false))
        });
    }
};

// add New-User Request
export const addNewUserRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                console.log('response', response)
                if (response.data.response === 'Success') {
                    return axios.post(cors + url + `Account/GetUsers`)
                        .then((response) => {
                            const users = response.data
                            dispatch(getAllUsersAction(users));
                            history.push({pathname: '/all_users'})
                            dispatch(addNewItemAction(false))
                            dispatch(successMessageAction('User Added Successfuly'))
                            dispatch(toggleLoaderAction(false))
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
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};

// get all users
export const takeAllUsers = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/GetUsers`)
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

// edit User Request
export const editThisUserRequest = (headline, userName, name, email, userType ) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/EditUser?Email=${email}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    if(headline === EDIT){
                        return axios.post(cors + url + `Account/GetUsers`)
                            .then((response) => {
                                    const users = response.data
                                    dispatch(getAllUsersAction(users));
                                    dispatch(successMessageAction('User Edited Successfuly'))
                                    history.push({pathname: '/all_users'})
                                    dispatch(toggleLoaderAction(false))
                            })
                            .catch((error) => {
                                dispatch(errorMessageAction([error][0]))
                                dispatch(toggleLoaderAction(false))
                            });
                    } else if( headline === YOUR_PROFILE ) {
                        return axios.post(cors + url + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            dispatch(successMessageAction(user.username + ' Profile Edited Successfuly'))
                            dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            dispatch(errorMessageAction([error][0]))
                            dispatch(toggleLoaderAction(false))
                        });
                    }
                } else {
                    const error = response.data.message
                    dispatch(errorMessageAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });
    }
};

// delete user
export const DeleteUserRequest = (userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/DeleteUser?username=${userName}`)
            .then((response) => {
                if(response.data.response === 'Success') {
                    const data = response.data.message
                    dispatch(takeAllUsers())
                    dispatch(successMessageAction(data))
                    // history.push({pathname: '/all_users'})
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

//forgot pass request
export const forgotPassRequest = (email) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/ForgotPassword?Email=${email}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    const data = response.data.message
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
        return axios.post(cors + url + `Account/ChangePassword?Username=${username}&OldPassword=${password}&NewPassword=${newPassword}&ConfirmPassword=${confirmPassword}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    const data = response.data.message
                    // dispatch(changePassAction(data))
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

// get all users by app comp
export const appCallTakeAllUsers = () => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(cors + url + `Account/GetUsers`)
            .then((response) => {
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                dispatch(catchErrorAction([error][0]))
                dispatch(errorMessageAction(error[0]))
                dispatch(toggleLoaderAction(false))
            });  
    }
};