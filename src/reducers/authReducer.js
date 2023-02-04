import {
    LAST_SIGNIN,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
} from '../actions/types';

import store from '../store';
import { signoutIntern } from '../actions/authActions';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    last: null,
};

var logoutTimerId;
const timeToLogout =
    Number(process.env.REACT_APP_API_TOKEN_EXPIRATION) * 1000 * 0.99; // nearly xx minutes correspondign to the API

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LAST_SIGNIN:
            return {
                ...state,
                last: action.payload,
            };
        case LOGIN_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            clearTimeout(logoutTimerId);
            const logoutTimer = () =>
                setTimeout(() => {
                    store.dispatch(signoutIntern());
                }, timeToLogout);
            logoutTimerId = logoutTimer();
            localStorage.setItem('token', true);
            return {
                ...state,
                ...action.payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
            clearTimeout(logoutTimerId);
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
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
