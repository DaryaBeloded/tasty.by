import * as types from '../../utils/constants';
import API from '../../utils/api';
import { addFavoritesToFood } from '../../utils/utils';

const foodPending = () => {
    return {
        type: types.FOOD_PENDING, 
    }
}

const foodSuccess = (data) => {
    return {
        type: types.FOOD_SUCCESS,
        payload: data, 
    }
}

const foodFailed = (error) => {
    return {
        type: types.FOOD_FAILED,
        payload: error,
    }
}

export const loadFood = id => {
    return async (dispatch) => {
        dispatch(foodPending());
        try {
            const response = await API.loadFood(id);
            const food = addFavoritesToFood(response.data);
            localStorage.setItem('currentFood', JSON.stringify({...food, count: 1}));
            dispatch(foodSuccess({...food, count: 1}));
        }
        catch(error) {
            dispatch(foodFailed(error.response));
        } 
    }
}