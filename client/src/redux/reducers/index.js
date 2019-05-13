import { combineReducers } from 'redux';
import top from './top';
import cafes from './cafes';
import cafe from './cafe';
import categories from './categories';
import cuisines from './cuisines';
import food from './food';
import login from './login';
import registration from './registration';
import filter from './filter';
import update from './updateUser';
import favorites from './favorites';
import cart from './cart';

export default combineReducers({
    top,
    cafes,
    cafe,
    categories,
    cuisines,
    food,
    login,
    registration,
    filter,
    update,
    favorites,
    cart,
})