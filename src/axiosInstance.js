import axios from 'axios';
import { setProgressError } from './actions/progressActions';
import { AUTH_ERROR, REFRESH_TOKEN_SUCCESS } from './actions/types';
import store from './store';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
    async (config) => {
        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        const token = store.getState().auth.token;
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
api.interceptors.response.use(
    (response) => {
        // request was successfull
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = store.getState().auth.refreshToken;
        if (refreshToken) {
            // try to refresh the token failed
            if (error.response.status === 401 && originalRequest._retry) {
                return Promise.reject(error);
            }
            // token was not valid and 1st try to refresh the token
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = store.getState().auth.refreshToken;
                // request to refresh the token, in request-body is the refreshToken
                api.post('/auth/refresh', {
                    token: refreshToken,
                })
                    .then((res) => {
                        if (res.status === 200) {
                            store.dispatch({
                                type: REFRESH_TOKEN_SUCCESS,
                                payload: res.data,
                            });
                            api.defaults.headers.common['Authorization'] =
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
                            return api(originalRequest)
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
                        store.dispatch({
                            type: AUTH_ERROR,
                        });
                        store.dispatch(setProgressError('auth'));
                        return Promise.reject(error);
                    });
            }
        }
        // request status was unequal to 401, no possibility to refresh the token
        return Promise.reject(error);
    }
);

export default api;
