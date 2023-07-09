import { SET_COLOR, SET_COOKIES, SET_COOKIES_OPEN } from '../actions/types';

import { getCookie, setCookie } from '../cookies';

const initialState = {
    color: {
        main: getCookie('palette.primary.main') || '#e85917',
        light: getCookie('palette.primary.light') || '#f3ac8b',
        mode: getCookie('palette.mode') || 'light',
    },
    cookies: {
        necessary:
            getCookie('cookie.necessary') === 'true' ? true : false || false,
        preferences:
            getCookie('cookie.preferences') === 'true' ? true : false || false,
        open: false,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COLOR:
            setCookie('palette.primary.main', action.payload.main);
            setCookie('palette.primary.light', action.payload.light);
            setCookie('palette.mode', action.payload.mode);
            return {
                ...state,
                color: action.payload,
            };
        case SET_COOKIES:
            Object.keys(action.payload).forEach((key) => {
                setCookie(`cookie.${key}`, action.payload[key]);
            });
            return {
                ...state,
                cookies: { ...action.payload, open: state.cookies.open },
            };
        case SET_COOKIES_OPEN:
            return {
                ...state,
                cookies: { ...state.cookies, open: action.payload },
            };
        default:
            return state;
    }
};

export default reducer;
