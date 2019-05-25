import * as types from '../../utils/constants';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const historyReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.HISTORY_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.HISTORY_SUCCESS : 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.HISTORY_FAILED : 
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

export default historyReducer;