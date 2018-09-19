import axios from 'axios';
import { getUserAction, accessDeniedAction } from './index';

// get users list from api
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