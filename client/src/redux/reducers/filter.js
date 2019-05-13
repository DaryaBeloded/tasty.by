import * as types from '../../utils/constants';

const initialState = {
    data: '',
}

const filterReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.FILTER_SUCCESS :
            return {
                ...state,
                data: action.payload,
            } 

        default : 
            return state;
    }
}

export default filterReducer;