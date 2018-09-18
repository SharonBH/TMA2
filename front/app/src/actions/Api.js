import axios from 'axios';
import { userstListAction } from './index';

// get users list from api
export const getUsersList = () => {
    return (dispatch) => {
        return axios.get()
            .then((response) => {
                dispatch(userstListAction(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }
};