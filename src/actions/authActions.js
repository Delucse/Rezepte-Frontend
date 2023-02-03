import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LAST_SIGNIN,
} from '../actions/types';

import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';
import {
    alertErrorMessage,
    alertMessage,
    snackbarMessage,
} from './messageActions';

import api from '../axiosInstance';

// check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch(setProgress('user'));
    const config = {
        success: (res) => {
            dispatch({
                type: LAST_SIGNIN,
                payload: Date.now(),
            });
            dispatch({
                type: USER_LOADED,
                payload: res.data.username,
            });
            dispatch(setProgressSuccess('user'));
            dispatch(
                snackbarMessage(
                    `Herzlich Willkommen, ${res.data.username}!`,
                    'user'
                )
            );
        },
        error: (err) => {
            if (err.response) {
                if (
                    err.response.status !== 401 ||
                    !getState().auth.refreshToken
                ) {
                    dispatch({
                        type: AUTH_ERROR,
                    });
                    dispatch(setProgressError('user'));
                }
            } else {
                dispatch(loadUser());
            }
        },
    };
    api.get('/user', config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

// register User
export const register =
    (username, email, password, confirmPassword, cb) => (dispatch) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Request Body
        const body = { username, email, password, confirmPassword };
        api.post('/auth/signup', body, config)
            .then((res) => {
                dispatch(
                    alertMessage(
                        'Du hast dich erfolgreich registriert. Schaue nun in deinem Postfach nach, um deine E-Mail-Adresse zu bestätigen.',
                        'user'
                    )
                );
                dispatch({
                    type: REGISTER_SUCCESS,
                });
                dispatch(setProgressSuccess('auth'));
                cb();
            })
            .catch((err) => {
                if (err.response.status !== 401) {
                    if (err.response.status === 500) {
                        dispatch(
                            alertErrorMessage('Interner Server-Fehler.', 'user')
                        );
                    } else {
                        if (
                            err.response.data.message === 'email already exists'
                        ) {
                            dispatch(
                                alertErrorMessage(
                                    'E-Mail-Adresse ist bereits vorhanden.',
                                    'user'
                                )
                            );
                        } else if (
                            err.response.data.message ===
                            'invalid email address'
                        ) {
                            dispatch(
                                alertErrorMessage(
                                    'E-Mail-Adresse ist nicht valide.',
                                    'user'
                                )
                            );
                        } else if (
                            err.response.data.message ===
                            'username already exists'
                        ) {
                            dispatch(
                                alertErrorMessage(
                                    'Nutzername ist bereits vorhanden.',
                                    'user'
                                )
                            );
                        }
                    }
                }
                dispatch({
                    type: REGISTER_FAIL,
                });
                dispatch(setProgressError('auth'));
            });
    };

// Login user
export const login = (username, password) => (dispatch) => {
    dispatch(setProgress('signin'));

    if (username.trim() === '') {
        dispatch(setProgressError('signin'));
        dispatch(alertErrorMessage('Gib deinen Nutzernamen an.', 'user'));
    } else if (password.trim() === '') {
        dispatch(setProgressError('signin'));
        dispatch(alertErrorMessage('Gib dein Passwort an.', 'user'));
    } else {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Request Body
        const body = { username: username, password: password };
        api.post('/auth/signin', body, config)
            .then((res) => {
                // Logout automatically if refreshToken "expired"
                dispatch({
                    type: LAST_SIGNIN,
                    payload: Date.now(),
                });
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
                dispatch(setProgressSuccess('auth'));
                dispatch(
                    snackbarMessage(
                        `Herzlich Willkommen, ${res.data.user}!`,
                        'user'
                    )
                );
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    dispatch(
                        alertErrorMessage('Interner Server-Fehler.', 'user')
                    );
                } else {
                    if (
                        err.response.data.message ===
                        'username or password is wrong.'
                    ) {
                        dispatch(
                            alertErrorMessage(
                                'Benutzername oder Passwort ist nicht korrekt.',
                                'user'
                            )
                        );
                    } else if (
                        err.response.data.message === 'user is not verified.'
                    ) {
                        dispatch(
                            alertErrorMessage(
                                'Nutzer-Konto ist nicht verifiziert.',
                                'user'
                            )
                        );
                    }
                }
                dispatch({
                    type: LOGIN_FAIL,
                });
                dispatch(setProgressError('auth'));
            });
    }
};

export const resetSignout = () => (dispatch) => {
    dispatch({
        type: LAST_SIGNIN,
        payload: null,
    });
};

// Logout User
export const signout = () => (dispatch, getState) => {
    const config = {
        success: (res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
            dispatch(setProgressSuccess('auth'));
            dispatch(snackbarMessage(`Auf Wiedersehen!`, 'user'));
            dispatch(resetSignout());
        },
        error: (err) => {
            dispatch({
                type: LOGOUT_FAIL,
            });
            dispatch(setProgressError('auth'));
            dispatch(resetSignout());
        },
    };
    api.post('/auth/signout', { token: getState().auth.refreshToken }, config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const signoutIntern = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};
