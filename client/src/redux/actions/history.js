import * as types from '../../utils/constants';
import { showModal } from '../../utils/utils';
import API from '../../utils/api';

const historyPending = () => {
    return {
        type: types.HISTORY_PENDING, 
    }
}

const historySuccess = (data) => {
    return {
        type: types.HISTORY_SUCCESS,
        payload: data, 
    }
}

const historyFailed = (error) => {
    return {
        type: types.HISTORY_FAILED,
        payload: error,
    }
}

export const sendRating = (dishId, rating, target) => {
    return async () => {
        try {
            await API.sendRating(dishId, rating);
            target.parentNode.style.pointerEvents = 'none';
            showModal('ok', 'Спасибо за отзыв!');
        }
        catch(error) {
            //showModal
        } 
    }
}

export const loadHistory = () => {
    return async (dispatch) => {
        dispatch(historyPending());
        try {
            const response = await API.loadHistory();
            dispatch(historySuccess(response.data));
        }
        catch(error) {
            dispatch(historyFailed(error.response));
        } 
    }
}