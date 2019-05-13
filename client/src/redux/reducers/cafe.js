import * as types from '../../utils/constants';

const initialState = {
    data: JSON.parse(localStorage.getItem('currentCafe')) || [],
    isLoading: false,
    error: null,
}

const cafeReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.CAFE_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.CAFE_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.CAFE_FAILED : 
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

export default cafeReducer;