import * as types from '../../utils/constants';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const cuisinesReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.CUISINES_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.CUISINES_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.CUISINES_FAILED : 
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

export default cuisinesReducer;