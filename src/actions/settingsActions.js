import { SET_COLOR, SET_COOKIES, SET_COOKIES_OPEN } from '../actions/types';

import { snackbarMessage } from './messageActions';

export const setColors = (colors) => (dispatch) => {
    dispatch({
        type: SET_COLOR,
        payload: colors,
    });
    dispatch(
        snackbarMessage(
            `Das neue Farbschema wurde erfolgreich übernommen.`,
            colors
        )
    );
};

export const setCookies = (cookies) => (dispatch) => {
    dispatch({
        type: SET_COOKIES,
        payload: cookies,
    });
};

export const setCookiesOpen = (open) => (dispatch) => {
    dispatch({
        type: SET_COOKIES_OPEN,
        payload: open,
    });
};
