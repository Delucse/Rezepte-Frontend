import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REFRESH_TOKEN_SUCCESS,
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

import axios from 'axios';

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
            if (err.response.status !== 401 || !getState().auth.refreshToken) {
                dispatch({
                    type: AUTH_ERROR,
                });
                dispatch(setProgressError('user'));
            }
        },
    };
    axios
        .get(
            `${process.env.REACT_APP_API_URL}/user`,
            config,
            dispatch(authInterceptor())
        )
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

// register User
export const register = (username, password, email, cb) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // Request Body
    const body = { username: username, password: password, email: email };
    axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body, config)
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
                    if (err.response.data.message === 'Email already exists') {
                        dispatch(
                            alertErrorMessage(
                                'E-Mail bereits vorhanden.',
                                'user'
                            )
                        );
                    } else if (
                        err.response.data.message === 'Username already exists'
                    ) {
                        dispatch(
                            alertErrorMessage(
                                'Nutzername bereits vorhanden.',
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

var logoutTimerId;
const timeToLogout =
    Number(process.env.REACT_APP_API_TOKEN_EXPIRATION) * 1000 * 0.99; // nearly 15 minutes correspondign to the API

// Login user
export const login = (username, password) => (dispatch) => {
    dispatch(setProgress('signin'));
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    // Request Body
    const body = { username: username, password: password };
    axios
        .post(`${process.env.REACT_APP_API_URL}/auth/signin`, body, config)
        .then((res) => {
            // Logout automatically if refreshToken "expired"
            dispatch({
                type: LAST_SIGNIN,
                payload: Date.now(),
            });
            const logoutTimer = () =>
                setTimeout(() => dispatch(signoutIntern()), timeToLogout);
            logoutTimerId = logoutTimer();
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
                dispatch(alertErrorMessage('Interner Server-Fehler.', 'user'));
            } else {
                if (
                    err.response.data.message ===
                    'Username or password is wrong.'
                ) {
                    dispatch(
                        alertErrorMessage(
                            'Benutzername oder Passwort ist nicht korrekt.',
                            'user'
                        )
                    );
                } else if (
                    err.response.data.message === 'User is not verified.'
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
            clearTimeout(logoutTimerId);
            dispatch(snackbarMessage(`Auf Wiedersehen!`, 'user'));
            dispatch(resetSignout());
        },
        error: (err) => {
            dispatch({
                type: LOGOUT_FAIL,
            });
            dispatch(setProgressError('auth'));
            clearTimeout(logoutTimerId);
            dispatch(resetSignout());
        },
    };
    axios
        .post(
            `${process.env.REACT_APP_API_URL}/auth/signout`,
            { token: getState().auth.refreshToken },
            config
        )
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

const signoutIntern = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    });
    clearTimeout(logoutTimerId);
};

export const authInterceptor = () => (dispatch, getState) => {
    // Add a request interceptor
    axios.interceptors.request.use(
        async (config) => {
            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json';
            }
            const token = getState().auth.token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        (response) => {
            // request was successfull
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            const refreshToken = getState().auth.refreshToken;
            if (refreshToken) {
                // try to refresh the token failed
                if (error.response.status === 401 && originalRequest._retry) {
                    // router.push('/login');
                    return Promise.reject(error);
                }
                // token was not valid and 1st try to refresh the token
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = getState().auth.refreshToken;
                    // request to refresh the token, in request-body is the refreshToken
                    axios
                        .post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
                            token: refreshToken,
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                clearTimeout(logoutTimerId);
                                const logoutTimer = () =>
                                    setTimeout(
                                        () => dispatch(signoutIntern()),
                                        timeToLogout
                                    );
                                logoutTimerId = logoutTimer();
                                dispatch({
                                    type: REFRESH_TOKEN_SUCCESS,
                                    payload: res.data,
                                });
                                // dispatch(setProgressSuccess('auth'));
                                axios.defaults.headers.common['Authorization'] =
                                    'Bearer ' + res.data.token;
                                // request was successfull, new request with the old parameters and the refreshed token
                                if (
                                    originalRequest.data &&
                                    originalRequest.data.includes &&
                                    originalRequest.data.includes('token')
                                ) {
                                    originalRequest.data = JSON.stringify({
                                        token: res.data.refreshToken,
                                    });
                                }
                                return axios(originalRequest)
                                    .then((res) => {
                                        originalRequest.success(res);
                                    })
                                    .catch((err) => {
                                        console.error(err);
                                        originalRequest.error(err);
                                    });
                            }
                            return Promise.reject(error);
                        })
                        .catch((err) => {
                            // request failed, token could not be refreshed
                            dispatch({
                                type: AUTH_ERROR,
                            });
                            dispatch(setProgressError('auth'));
                            return Promise.reject(error);
                        });
                }
            }
            // request status was unequal to 401, no possibility to refresh the token
            return Promise.reject(error);
        }
    );
};
