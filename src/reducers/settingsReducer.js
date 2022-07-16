import { ERROR, LOADING } from '../actions/types';

const initialState = {
    error: false,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
