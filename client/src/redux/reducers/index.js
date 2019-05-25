import { combineReducers } from 'redux';
import top from './top';
import top5 from './top5';
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
import history from './history';
import cart from './cart';

export default combineReducers({
    top,
    top5,
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
    history,
})