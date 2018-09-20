import axios from 'axios';
import { getUserAction, accessDeniedAction, registerDeniedAction, catchErrorAction, toggleLoaderAction } from './index';
import history from '../configuration/history';

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