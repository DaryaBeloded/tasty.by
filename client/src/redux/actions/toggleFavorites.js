import API from '../../utils/api';
import * as types from '../../utils/constants';

const favoritesFoodSuccess = (data) => {
    return {
        type: types.FOOD_SUCCESS,
        payload: data,
    }
}

const favoritesSuccess = (data) => {
    return {
        type: types.FAVORITES_SUCCESS,
        payload: data,
    }
}

export const toggleFavorites = (food, oldFoods) => {
    return async (dispatch) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')).user;
            let { favorites } = user;
            if (!favorites) favorites = [];
            if (favorites.indexOf(food._id) === -1) {
                const newFood = { ...food, favorites: true };
                await API.addToFavorites(food._id);
                favorites.push(food._id);
                const user = { ...JSON.parse(localStorage.getItem('user')) };
                user.user.favorites = favorites;
                localStorage.setItem('user',
                    JSON.stringify(user)
                );
                dispatch(favoritesFoodSuccess(newFood));
            }
            else {
                await API.deleteFromFavorites(food._id);
                let newFavorites = favorites.filter(item => item !== food._id);
                const user = { ...JSON.parse(localStorage.getItem('user')) };
                user.user.favorites = newFavorites;
                localStorage.setItem('user',
                    JSON.stringify(user)
                );
                const newFood = { ...food, favorites: false };
                dispatch(favoritesFoodSuccess(newFood));
                newFavorites = oldFoods.filter(item => item._id !== food._id)
                dispatch(favoritesSuccess(newFavorites));
            }
        }
        catch (error) {
            console.log(error.response);
        }
    }
}