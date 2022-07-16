import {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
    RESET_MESSAGE,
} from '../actions/types';

export const resetMessage = () => (dispatch) => {
    dispatch({
        type: RESET_MESSAGE,
    });
};

export const alertMessage = (message, type) => (dispatch) => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
            message,
            type,
            art: 'alert',
        },
    });
};

export const snackbarMessage = (message, type) => (dispatch) => {
    dispatch({
        type: SUCCESS_MESSAGE,
        payload: {
            message,
            type,
            art: 'snackbar',
        },
    });
};

export const alertErrorMessage = (message, type) => (dispatch) => {
    dispatch({
        type: ERROR_MESSAGE,
        payload: {
            message,
            type,
            art: 'alert',
        },
    });
};

export const snackbarErrorMessage = (message, type) => (dispatch) => {
    dispatch({
        type: ERROR_MESSAGE,
        payload: {
            message,
            type,
            art: 'snackbar',
        },
    });
};
