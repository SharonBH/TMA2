import axios from 'axios';
import history from '../configuration/history';

import {
    getUserAction,
    accessDeniedAction,
    registerDeniedAction,
    catchErrorAction,
    toggleLoaderAction,
    addNewUserAction,
    editDeniedAction,
    getAllUsersAction, 
    deleteUserAction,
    forgotPassAction,
    changePassAction,
    changePassOpenAction,
    getUsersListAction,

} from './index';


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
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/all_users'})
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

// register request
export const addNewUserRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    console.log('i add a new user')
                    history.push({pathname: '/home'})
                    dispatch(addNewUserAction(false))
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
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    history.push({pathname: '/all_users'})
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))

            });  
    }
};


// edit User Request
export const editThisUserAction = (name, userName, email, password, userType) => {
    console.log(name, userName, email, password, userType)
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/EditUser?Email=${email}&Name=${name}&Role=${userType}&Username=${userName}`)
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
};
// edit profile Request
export const editProfileRequest = (name, userName, email, password, userType) => {
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
                           dispatch(editDeniedAction(error))
                           dispatch(toggleLoaderAction(false))
                       });
               } else {
                   const error = response.data.message
                   dispatch(editDeniedAction(error))
                   dispatch(toggleLoaderAction(false))
               }
           })
           .catch((error) => {
               console.log(error);
               dispatch(catchErrorAction(error))
               dispatch(editDeniedAction(error))
               dispatch(toggleLoaderAction(false))
           });
   }
};

// Account Logout
// export const accountLogout = () => {
//     return (dispatch) => {
//         return axios.get(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Logout`)
//             .then((response) => {
//                 console.log(response)
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
// };


// delete user
export const DeleteUserRequest = (userName) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/DeleteUser?username=${userName}`)
        // return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/DeleteUser?`,`{username: ${userName}}`)
            .then((response) => {
                if(response.data.response === 'Success') {
                    const data = response.data
                    dispatch(deleteUserAction(data))
                    dispatch(takeAllUsers())
                    // history.push({pathname: '/all_users'})
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

export const changePasswordRaquest = (username, password, newPassword, confirmPassword) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/ChangePassword?Username=${username}&OldPassword=${password}&NewPassword=${newPassword}&ConfirmPassword=${confirmPassword}`)
            .then((response) => {
                console.log('pass sent to email', response)
                if (response.data.response === 'Success') {
                    const data = response.data
                    dispatch(changePassAction(data))
                    console.log('pass sent to email')
                    dispatch(changePassOpenAction(data))
                    
                } else {
                    const error = response.data.message
                    dispatch(editDeniedAction(error))
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