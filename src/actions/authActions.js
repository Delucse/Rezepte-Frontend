import {
    REFRESH_TOKEN_SUCCESS,
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

import Link from '../components/Link';

// check token & load user
export const refreshAuth = () => (dispatch, getState) => {
    // user loading
    if (getState().auth.token) {
        dispatch(setProgress('user'));
        api.post('/auth/refresh')
            .then((res) => {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: res.data,
                });
                dispatch({
                    type: LAST_SIGNIN,
                    payload: Date.now(),
                });
                dispatch(setProgressSuccess('user'));
                dispatch(
                    snackbarMessage(
                        `Herzlich Willkommen, ${res.data.user}!`,
                        'user'
                    )
                );
            })
            .catch((err) => {
                dispatch({
                    type: AUTH_ERROR,
                });
                dispatch(setProgressError('user'));
            });
    } else {
        dispatch(setProgressSuccess('user'));
    }
};

// register User
export const register =
    (username, email, password, confirmPassword, relation, cb) =>
    (dispatch) => {
        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Request Body
        const body = { username, email, password, confirmPassword, relation };
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
                if (err.response) {
                    if (err.response.status !== 401) {
                        if (err.response.status === 500) {
                            dispatch(
                                alertErrorMessage(
                                    'Interner Server-Fehler.',
                                    'user'
                                )
                            );
                        } else {
                            if (
                                err.response.data.message ===
                                'email already exists'
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
                                        'E-Mail-Adresse ist nicht gültig.',
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
                } else {
                    dispatch(
                        alertErrorMessage(
                            'Server ist zurzeit nicht erreichbar.',
                            'user'
                        )
                    );
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
                if (err.response) {
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
                            err.response.data.message ===
                            'user is not verified.'
                        ) {
                            dispatch(
                                alertErrorMessage(
                                    <div>
                                        Dein Nutzer-Konto ist nicht verifiziert
                                        -{' '}
                                        <Link to="/faq#anmeldung">
                                            mehr Infos
                                        </Link>
                                        .
                                    </div>,
                                    'user'
                                )
                            );
                        } else if (
                            err.response.data.message ===
                            'user is not authorized.'
                        ) {
                            dispatch(
                                alertErrorMessage(
                                    <div>
                                        Dein Nutzer-Konto ist noch nicht vom
                                        Admin authorisiert -{' '}
                                        <Link to="/faq#anmeldung">
                                            mehr Infos
                                        </Link>
                                        .
                                    </div>,
                                    'user'
                                )
                            );
                        }
                    }
                } else {
                    dispatch(
                        alertErrorMessage(
                            'Server ist zurzeit nicht erreichbar.',
                            'user'
                        )
                    );
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
export const signout = () => (dispatch) => {
    api.post('/auth/signout')
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
            dispatch(setProgressSuccess('auth'));

            dispatch(resetSignout());
        })
        .catch((err) => {
            dispatch({
                type: LOGOUT_FAIL,
            });
            dispatch(setProgressError('auth'));
            dispatch(resetSignout());
        });
    dispatch(snackbarMessage(`Auf Wiedersehen!`, 'user'));
};

export const signoutIntern = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
};
