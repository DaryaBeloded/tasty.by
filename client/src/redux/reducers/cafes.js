import * as types from '../../utils/constants';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const cafesReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.CAFES_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.CAFES_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.CAFES_FAILED : 
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

export default cafesReducer;