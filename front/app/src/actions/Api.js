import axios from 'axios';
import { getUserAction, accessDeniedAction } from './index';

// login request
export const loginRequest = (email, pass) => {
    console.log('this is:', email, pass)
    return (dispatch) => {
        return axios.post(`http://localhost:59610/Account/Login?email=${email}&password=${pass}`)
            .then((response) => {
                console.log(response)
                if(response.message === 'Success') {
                    return axios.post(`http://localhost:59610/Account/GetUser?username=${email}`)
                        .then((response) => {
                            console.log(response)
                            if (response.message === 'Success') {
                                dispatch(getUserAction(response));
                            } else {
                                dispatch(accessDeniedAction(response.message))
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    dispatch(accessDeniedAction(response.message))
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// register request
export const registerRequest = (email, password, confirmPassword, name, userType, userName) => {
    console.log('this is:', email, password, confirmPassword, name, userType, userName)
    return (dispatch) => {
        return axios.post(`http://localhost:59610/Account/Login?email=${email}&password=${password}`)
            .then((response) => {
                console.log(response)
                if (response.message === 'Success') {
                    return axios.post(`http://localhost:59610/Account/GetUser?username=${email}`)
                        .then((response) => {
                            console.log(response)
                            if (response.message === 'Success') {
                                dispatch(getUserAction(response));
                            } else {
                                dispatch(accessDeniedAction(response.message))
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    dispatch(accessDeniedAction(response.message))
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};