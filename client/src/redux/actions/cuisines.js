import * as types from '../../utils/constants';
import API from '../../utils/api';

const cuisinesPending = () => {
    return {
        type: types.CUISINES_PENDING, 
    }
}

const cuisinesSuccess = (data) => {
    return {
        type: types.CUISINES_SUCCESS,
        payload: data, 
    }
}

const cuisinesFailed = (error) => {
    return {
        type: types.CUISINES_FAILED,
        payload: error,
    }
}

export const loadCuisines = () => {
    return async (dispatch) => {
        dispatch(cuisinesPending());
        try {
            const response = await API.loadCuisines();
            dispatch(cuisinesSuccess(response.data));
        }
        catch(error) {
            dispatch(cuisinesFailed(error.response));
        } 
    }
}