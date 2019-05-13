import * as types from '../../utils/constants';

const filterSuccess = name => {
    return {
        type: types.FILTER_SUCCESS,
        payload: name,
    }
}

export const setFilter = name => {
    return (dispatch) => {
        dispatch(filterSuccess(name))
    }
}