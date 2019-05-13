import * as types from '../../utils/constants';
import API from '../../utils/api';

const topPending = () => {
    return {
        type: types.TOP_PENDING, 
    }
}

const topSuccess = (data) => {
    return {
        type: types.TOP_SUCCESS,
        payload: data, 
    }
}

const topFailed = (error) => {
    return {
        type: types.TOP_FAILED,
        payload: error,
    }
}

export const loadTop = () => {
    return async (dispatch) => {
        dispatch(topPending());
        try {
            const response = await API.loadTop1();
            dispatch(topSuccess(response.data));
        }
        catch(error) {
            dispatch(topFailed(error.response));
        } 
    }
}