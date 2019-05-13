import * as types from '../../utils/constants';
import API from '../../utils/api';

const categoriesPending = () => {
    return {
        type: types.CATEGORIES_PENDING, 
    }
}

const categoriesSuccess = (data) => {
    return {
        type: types.CATEGORIES_SUCCESS,
        payload: data, 
    }
}

const categoriesFailed = (error) => {
    return {
        type: types.CATEGORIES_FAILED,
        payload: error,
    }
}

export const loadCategories = () => {
    return async (dispatch) => {
        dispatch(categoriesPending());
        try {
            const response = await API.loadCategories();
            dispatch(categoriesSuccess(response.data));
        }
        catch(error) {
            dispatch(categoriesFailed(error.response));
        } 
    }
}