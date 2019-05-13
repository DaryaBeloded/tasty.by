import * as types from '../../utils/constants';
import API from '../../utils/api';

const updatePending = () => {
    return {
        type: types.UPDATE_USER_PENDING, 
    }
}

const updateLoginSuccess = data => {
    return {
        type: types.LOGIN_UPDATE,
        payload: data, 
    }
}

const updateRegSuccess = data => {
    return {
        type: types.REGISTRATION_UPDATE,
        payload: data, 
    }
}

const updateFailed = (error) => {
    return {
        type: types.UPDATE_USER_FAILED,
        payload: error,
    }
}

export const updateUser = newUser => {
    return async (dispatch) => {
        dispatch(updatePending());
        try {
            await API.updateUser(newUser);
            const user = JSON.parse(localStorage.getItem('user'));
            user.user.name = newUser.name;
            user.user.phone = newUser.phone;
            user.user.email = newUser.email;
            user.user.address = newUser.address;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(updateLoginSuccess(user));
            dispatch(updateRegSuccess(user));
        }
        catch(error) {
            dispatch(updateFailed(error.response));
        } 
    }
}