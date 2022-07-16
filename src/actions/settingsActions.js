import { ERROR, LOADING } from '../actions/types';

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
