import * as types from '../../utils/constants';

const initialState = {
    data: {},
    isLoading: false,
    error: null,
}

const top5Reducer = (state = initialState, action) => {

    switch(action.type) {
        case types.TOP5_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.TOP5_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.TOP5_FAILED : 
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

export default top5Reducer;