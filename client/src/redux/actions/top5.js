import * as types from '../../utils/constants';
import API from '../../utils/api';

const topPending = () => {
    return {
        type: types.TOP5_PENDING, 
    }
}

const topSuccess = (data) => {
    return {
        type: types.TOP5_SUCCESS,
        payload: data, 
    }
}

const topFailed = (error) => {
    return {
        type: types.TOP5_FAILED,
        payload: error,
    }
}

export const loadTop5 = () => {
    return async (dispatch) => {
        dispatch(topPending());
        try {
            const response = await API.loadTop5();
            dispatch(topSuccess(response.data));
        }
        catch(error) {
            dispatch(topFailed(error.response));
        } 
    }
}