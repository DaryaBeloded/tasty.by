import * as types from '../../utils/constants';
import API from '../../utils/api';

const favoritesPending = () => {
    return {
        type: types.FAVORITES_PENDING,
    }
}

const favoritesSuccess = data => {
    return {
        type: types.FAVORITES_SUCCESS,
        payload: data,
    }
}

const favoritesFailed = error => {
    return {
        type: types.FAVORITES_FAILED,
        payload: error,
    }
}

export const loadFavorites = () => {
    return async (dispatch) => {
        dispatch(favoritesPending());
        try {
            const response = await API.loadFavorites();
            dispatch(favoritesSuccess(response.data));
        }
        catch(error) {
            dispatch(favoritesFailed(error))
        }
    }
}