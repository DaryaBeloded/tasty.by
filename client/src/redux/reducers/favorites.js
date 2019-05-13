import * as types from '../../utils/constants';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const favoritesReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.FAVORITES_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.FAVORITES_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.FAVORITES_FAILED : 
            return {
                ...state,
                data: [],
                isLoading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}

export default favoritesReducer;