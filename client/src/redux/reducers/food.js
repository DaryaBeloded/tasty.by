import * as types from '../../utils/constants';

const initialState = {
    data: JSON.parse(localStorage.getItem('currentFood')) || [],
    isLoading: false,
    error: null,
}

const foodReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.FOOD_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.FOOD_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.FOOD_FAILED : 
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

export default foodReducer;