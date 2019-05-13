import * as types from '../../utils/constants';

const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const registrationReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.REGISTRATION_PENDING :
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };
        
        case types.REGISTRATION_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.REGISTRATION_FAILED : 
            return {
                ...state,
                data: [],
                isLoading: false,
                error: action.payload,
            }

        case types.REGISTRATION_RESET:
            return {
                ...state,
                data: [],
                isLoading: false,
                error: null,
            }

        case types.REGISTRATION_UPDATE:
            return {
                ...state,
                data: [],
                isLoading: false,
                error: null,
            }
        
        default:
            return state;
    }
}

export default registrationReducer;