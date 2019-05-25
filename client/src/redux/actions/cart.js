import * as types from '../../utils/constants';
import { showModal } from '../../utils/utils';
import API from '../../utils/api';

const cardAdd = data => {
    return {
        type: types.CART_ADD_SUCCESS,
        payload: data,
    } 
}

const cartRemove = data => {
    return {
        type: types.CART_REMOVE_SUCCESS,
        payload: data,
    } 
}

const cartChange = data => {
    return {
        type: types.CART_CHANGE_SUCCESS,
        payload: data,
    } 
}

const cartClear = data => {
    return {
        type: types.CART_ADD_SUCCESS,
        payload: data,
    } 
}

const createOrderPending = () => {
    return {
        type: types.CREATE_ORDER_PENDING,
    }
}

const createOrderSuccess = () => {
    return {
        type: types.CREATE_ORDER_SUCCESS,
    }
}

const createOrderFailed = error => {
    return {
        type: types.CREATE_ORDER_FAILED,
        payload: error,
    }
}

export const addToCart = (food, foods) => {
    return (dispatch) => {
        let newFoods = [];
        const needFood = foods.find(item => item._id === food._id);
        if (needFood) {
            needFood.count += food.count;
            newFoods = [...foods];
        }
        else {
            foods.length === 0 ? newFoods = [food] : newFoods = [food, ...foods];
        }
        localStorage.setItem('cart', JSON.stringify(newFoods));
        dispatch(cardAdd(newFoods));
    }
}

export const removeFromCart = (food, foods) => {
    return (dispatch) => {
        const newFoods = foods.filter(item => item._id !== food._id);
        localStorage.setItem('cart', JSON.stringify(newFoods));
        dispatch(cartRemove(newFoods));
    }
}

export const changeFoodInCart = (food, foods) => {
    return (dispatch) => {
        let newFoods = foods.filter(item => item._id !== food._id);
        newFoods.unshift(food);
        localStorage.setItem('cart', JSON.stringify(newFoods));
        dispatch(cartChange(newFoods));
    }
}

export const clearCart = () => {
    return (dispatch) => {
        const newFoods = [];
        localStorage.setItem('cart', JSON.stringify(newFoods));
        dispatch(cartClear(newFoods));
    }
}

export const createOrder = order => {
    return async (dispatch) => {
        dispatch(createOrderPending());
        try {
            await API.creteOrder(order);
            showModal('ok', 'Заказ оформлен. Ожидайте звонка!');
            document.getElementsByClassName('cover')[0].classList.remove('on');
    	    document.getElementsByClassName('container-order')[0].classList.remove('on');
            dispatch(createOrderSuccess());
            const newFoods = [];
            localStorage.setItem('cart', JSON.stringify(newFoods));
        }
        catch(error) {
            dispatch(createOrderFailed(error));
        }        
    }
}