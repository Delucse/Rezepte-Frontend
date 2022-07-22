import { LOADING_ERROR, LOADING_SUCCESS, LOADING } from '../actions/types';

const initialState = {
    error: false,
    loading: true,
    type: 'user',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                error: false,
                loading: true,
                type: action.payload,
            };
        case LOADING_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                type: action.payload,
            };
        case LOADING_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
                type: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
