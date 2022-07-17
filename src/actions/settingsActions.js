import { ERROR, LOADING, SET_COLOR } from '../actions/types';

import { snackbarMessage } from './messageActions';

export const setError = (error) => (dispatch) => {
    dispatch({
        type: ERROR,
        payload: error,
    });
};

export const setLoading = (loading) => (dispatch) => {
    dispatch({
        type: LOADING,
        payload: loading,
    });
};

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
