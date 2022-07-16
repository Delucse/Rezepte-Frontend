import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    RESET_MESSAGE,
} from '../actions/types';

const initialState = {
    message: null,
    error: null,
    type: null,
    art: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE:
            return {
                message: null,
                error: null,
                type: null,
                art: null,
            };
        case ERROR_MESSAGE:
            return {
                error: true,
                ...action.payload,
            };
        case SUCCESS_MESSAGE:
            return {
                error: false,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
