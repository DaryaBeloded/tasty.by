import * as types from '../../utils/constants';

const initialState = {
    data: JSON.parse(localStorage.getItem('user')) || [],
    isLoading: false,
    error: null,
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN_PENDING:
            return {
                ...state,
                data: [],
                isLoading: true,
                error: null,
            };

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        case types.LOGIN_FAILED:
            return {
                ...state,
                data: [],
                isLoading: false,
                error: action.payload,
            }

        case types.LOGIN_RESET:
            return {
                ...state,
                data: [],
                isLoading: false,
                error: null,
            }
            
        case types.LOGIN_UPDATE:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                error: null,
            };

        default:
            return state;
    }
}

export default loginReducer;