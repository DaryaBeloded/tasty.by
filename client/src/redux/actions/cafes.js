import * as types from '../../utils/constants';
import API from '../../utils/api';

const cafesPending = () => {
    return {
        type: types.CAFES_PENDING, 
    }
}

const cafesSuccess = (data) => {
    return {
        type: types.CAFES_SUCCESS,
        payload: data, 
    }
}

const cafesFailed = (error) => {
    return {
        type: types.CAFES_FAILED,
        payload: error,
    }
}

export const loadCafes = () => {
    return async (dispatch) => {
        dispatch(cafesPending());
        try {
            const response = await API.loadCafes();
            dispatch(cafesSuccess(response.data));
        }
        catch(error) {
            dispatch(cafesFailed(error.response));
        } 
    }
}