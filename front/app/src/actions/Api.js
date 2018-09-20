import axios from 'axios';
import { getUserAction, accessDeniedAction, registerDeniedAction, catchErrorAction } from './index';
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
//get all users
// export const getAllUsers = () => {
//     console.log('response')
    // return (dispatch) => {
    //     return axios.post(process.env.REACT_APP_CORS + process.env.REACT_APP_URL + `Account/GetUsers`)
    //         .then((response) => {
    //             console.log(response)
    //             const users = response.data
    //             dispatch(getAllUsersAction(users));
    //             // history.push({pathname: '/'})
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         }); 
    // }
// };

