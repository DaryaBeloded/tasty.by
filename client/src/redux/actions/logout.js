import * as types from '../../utils/constants';
import Cookies from 'js-cookie';

const resetLogin = () => {
    return {
        type: types.LOGIN_RESET,
    }
}

const resetRegistration = () => {
    return {
        type: types.REGISTRATION_RESET,
    }
}

export const logout = () => {
    return (dispatch) => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshTOken');
        localStorage.removeItem('user');
        dispatch(resetLogin());
        dispatch(resetRegistration());
    }
}