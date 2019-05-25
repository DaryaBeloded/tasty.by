import * as types from '../../utils/constants';
import { showModal } from '../../utils/utils';
import API from '../../utils/api';
import Cookies from 'js-cookie';

const loginPending = () => {
    return {
        type: types.LOGIN_PENDING, 
    }
}

const loginSuccess = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data, 
    }
}

const loginFailed = (error) => {
    return {
        type: types.LOGIN_FAILED,
        payload: error,
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(loginPending());
        try {
            const response = await API.login(email, password);
            window.location.reload();
            // showModal('ok', `Добро пожаловать, ${response.data.user.name}`);
            Cookies.set('accessToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            Cookies.set('refreshTOken', response.data.token);
            dispatch(loginSuccess(response.data));
        }
        catch(error) {
            dispatch(loginFailed(error.response));
        } 
    }
}