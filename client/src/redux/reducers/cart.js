import * as types from '../../utils/constants';

const initialState = {
    data: JSON.parse(localStorage.getItem('cart')) || [],
}

const cartReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.CART_ADD_SUCCESS :
            return {
                ...state,
                data: action.payload,
            };
        
        case types.CART_CHANGE_SUCCESS :
            return {
                ...state,
                data: action.payload,
            };

        case types.CART_REMOVE_SUCCESS :
            return {
                ...state,
                data: action.payload,
            };

        case types.CART_CLEAR_SUCCESS :
            return {
                ...state,
                data: action.payload,
            };
        
        case types.CREATE_ORDER_PENDING : 
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        
        case types.CREATE_ORDER_SUCCESS : 
            return {
                ...state,
                data: [],
                isLoading: false,
                error: null,
            }

        case types.CREATE_ORDER_FAILED : 
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}

export default cartReducer;