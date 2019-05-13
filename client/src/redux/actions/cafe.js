import * as types from '../../utils/constants';
import API from '../../utils/api';

const cafePending = () => {
    return {
        type: types.CAFE_PENDING, 
    }
}

const cafeSuccess = (data) => {
    return {
        type: types.CAFE_SUCCESS,
        payload: data, 
    }
}

const cafeFailed = (error) => {
    return {
        type: types.CAFE_FAILED,
        payload: error,
    }
}

export const loadCafe = (id, filter, filterId) => {
    return async (dispatch) => {
        dispatch(cafePending());
        try {
            const response = await API.getCafeByFilter(id, filter, filterId);
            localStorage.setItem('currentCafe', JSON.stringify(response.data));
            dispatch(cafeSuccess(response.data));
        }
        catch(error) {
            dispatch(cafeFailed(error.response));
        } 
    }
}