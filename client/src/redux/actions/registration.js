import * as types from '../../utils/constants';
import { showModal } from '../../utils/utils';
import Cookies from 'js-cookie';
import API from '../../utils/api';

const registrationPending = () => {
    return {
        type: types.REGISTRATION_PENDING, 
    }
}

const registrationSuccess = (data) => {
    return {
        type: types.REGISTRATION_SUCCESS,
        payload: data, 
    }
}

const registrationFailed = (error) => {
    return {
        type: types.REGISTRATION_FAILED,
        payload: error,
    }
}

export const registration = obj => {
    return async (dispatch) => {
        dispatch(registrationPending());
        try {
            const response = await API.registration(obj);
            showModal('ok', `Добро пожаловать, ${response.data.user.name}`);
            Cookies.set('accessToken', response.data.token);
            Cookies.set('refreshTOken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(registrationSuccess(response.data));
        }
        catch(error) {
            dispatch(registrationFailed(error.response));
        } 
    }
}