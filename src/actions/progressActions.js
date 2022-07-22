import { LOADING, LOADING_ERROR, LOADING_SUCCESS } from './types';

export const setProgress = (type) => (dispatch) => {
    dispatch({
        type: LOADING,
        payload: type,
    });
};

export const setProgressSuccess = (type) => (dispatch) => {
    dispatch({
        type: LOADING_SUCCESS,
        payload: type,
    });
};

export const setProgressError = (type) => (dispatch) => {
    dispatch({
        type: LOADING_ERROR,
        payload: type,
    });
};
