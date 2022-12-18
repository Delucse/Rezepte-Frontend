import {
    LAST_SIGNIN,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refresh-token'),
    user: null,
    last: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LAST_SIGNIN:
            return {
                ...state,
                last: action.payload,
            };
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refresh-token', action.payload.refreshToken);
            return {
                ...state,
                ...action.payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('refresh-token');
            return {
                ...state,
                token: null,
                refreshToken: null,
                user: null,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default reducer;
