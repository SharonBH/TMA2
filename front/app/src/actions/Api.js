import axios from 'axios';
import { getUserAction, accessDeniedAction, registerDeniedAction, catchErrorAction, getAllUsersAction, setIsLoadingToTrue, editDeniedAction, deleteUserAction } from './index';
import history from '../configuration/history';

// login request
export const loginRequest = (userName, password) => {
    return (dispatch) => {
        
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Login?username=${userName}&password=${password}`)
            .then((response) => {
                if(response.data.message === 'Success') {
                    return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            history.push({pathname: '/home'})
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(catchErrorAction(error))
                            history.push({pathname: '/not_found'})
                        });
                } else {
                    const error = response.data.message
                    dispatch(accessDeniedAction(error))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
            });
    }
};

// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/Register?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)
            .then((response) => {
                if (response.data.response === 'Success') {
                    return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                        .then((response) => {
                            const user = response.data
                            dispatch(getUserAction(user));
                            history.push({pathname: '/home'})
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(catchErrorAction(error))
                            history.push({pathname: '/not_found'})
                        });
                } else {
                    const error = response.data.message
                    console.log(error)
                    console.log(response)
                    dispatch(registerDeniedAction(error))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
            });
    }
};
// get all users
export const takeAllUsers = () => {
    console.log('response')
    return (dispatch) => {
        dispatch(setIsLoadingToTrue(true))
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUsers`)
            .then((response) => {
                console.log('response', response)
                if(response.statusText === 'OK') {
                    const users = response.data
                    dispatch(getAllUsersAction(users));
                    history.push({pathname: '/all_users'})
                
                } else {
                    const error = response.data.message
                    dispatch(accessDeniedAction(error))
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(catchErrorAction(error))
                history.push({pathname: '/not_found'})
            });  
    }
};

// קגןא request
export const editUserRequest = (email, password, confirmPassword, name, userType, userName) => {
    return (dispatch) => {
        return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/EditUser?Email=${email}&Password=${password}&ConfirmPassword=${confirmPassword}&Name=${name}&Role=${userType}&Username=${userName}`)   
        .then((response) => {
            console.log('edit response', response )
            if (response.data.response === 'Success') {
                
                return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUserAsync?username=${userName}`)
                    .then((response) => {
                        const user = response.data
                        dispatch(getUserAction(user));
                        history.push({pathname: '/all_users'})
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch(catchErrorAction(error))
                        history.push({pathname: '/not_found'})
                    });
            } else {
                const error = response.data.message
                console.log('error',error)
                dispatch(editDeniedAction(error))
            }
        })
        .catch((error) => {
            console.error('error ',error);
            dispatch(catchErrorAction(error))
            // history.push({pathname: '/not_found'})
        });
    }
};

// delete user
export const deleteUser = (userName) => {
    return (dispatch) => {
        // return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/DeleteUser?username=${userName}`)
        return axios.post(process.env.REACT_APP_CORS + `https://tma-api.azurewebsites.net/Account/DeleteUser?username=${userName}`)
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
