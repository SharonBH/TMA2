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
    changePasswordErrorAction,
    getUsersListAction,

} from './index';


// login request
export const loginRequest = (userName, password) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Login?username=${userName}&password=${password}`)
            .then((response) => {
                if(response.data.message === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user))
                            dispatch(toggleLoaderAction(false))
                            history.push({pathname: '/home'})
                        })
                        .catch((error) => {
                            console.log([error][0]);
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
                console.log([error][0]);
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
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            history.push({pathname: '/home'})
                            dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            console.log([error][0]);
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
                console.log([error][0]);
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
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    console.log('i add a new user')
                    dispatch(addNewUserAction(false))
                } else {
                    const error = response.data.message
                    dispatch(registerDeniedAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log([error][0]);
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
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUsers`)
            .then((response) => {
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    history.push({pathname: '/all_users'})
                    dispatch(toggleLoaderAction(false))
            })
            .catch((error) => {
                console.log([error][0]);
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
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/EditUser?Email=${email}&Password=${password}&Name=${name}&Role=${userType}&Username=${userName}`)
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
                            console.log([error][0]);
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
                console.log([error][0]);
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
       return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/EditUser?Email=${email}&Password=${password}&Name=${name}&Role=${userType}&Username=${userName}`)
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
                           console.log([error][0]);
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
               console.log([error][0])
               dispatch(catchErrorAction(error))
               dispatch(editDeniedAction(error))
               dispatch(toggleLoaderAction(false))
           });
   }
};

// Account Logout
// export const accountLogout = () => {
//     return (dispatch) => {
//         return axios.get(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/Logout`)
//             .then((response) => {
//                 console.log(response)
//             })
//             .catch((error) => {
//                 console.log([error][0]);
//             });
//     }
// };


// delete user
export const DeleteUserRequest = (userName) => {
    return (dispatch) => {
        // return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/DeleteUser?username=${userName}`)
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/DeleteUser?username=${userName}`)
            .then((response) => {
                console.log('delete response',response)
                if(response.data.message === 'Success') {
                    const data = response.data
                    console.log('delete data',data)
                    dispatch(deleteUserAction(data))
                }
            })
            .catch((error) => {
                console.log([error][0]);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
            });
    }
};


//forgot pass request
export const forgotPassRequest = (email) => {
    return (dispatch) => {
        // dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/ForgotPassword?Email=${email}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    const data = response.data
                    dispatch(forgotPassAction(data))
                } else {
                    const error = response.data.message
                    dispatch(registerDeniedAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log([error][0]);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });
    }
};

// change Password Request
export const changePasswordRequest = (userName, oldPassword, newPassword, confirmNewPassword) => {
    return (dispatch) => {
        dispatch(toggleLoaderAction(true))
        return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/ChangePassword?Username=${userName}&OldPassword=${oldPassword}%40%40A&NewPassword=${newPassword}%40%40A&ConfirmPassword=${confirmNewPassword}&StatusMessage=ret`)
            .then((response) => {
                if(response.data.message === 'Success') {
                    return axios.post(`https://cors-anywhere.herokuapp.com/https://tma-api.azurewebsites.net/Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user))
                            history.push({pathname: '/home'})
                            dispatch(toggleLoaderAction(false))
                        })
                        .catch((error) => {
                            console.log([error][0]);
                            dispatch(catchErrorAction(error))
                            history.push({pathname: '/not_found'})
                            dispatch(toggleLoaderAction(false))
                        });
                } else {
                    const error = response.data.message
                    dispatch(changePasswordErrorAction(error))
                    dispatch(toggleLoaderAction(false))
                }
            })
            .catch((error) => {
                console.log([error][0]);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
                dispatch(toggleLoaderAction(false))
            });
    }
};

