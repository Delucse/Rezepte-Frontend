import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REFRESH_TOKEN_SUCCESS
} from '../actions/types';

import axios from 'axios';

// check token & load user
export const loadUser = () => (dispatch) => {
  // user loading
  dispatch({
    type: USER_LOADING
  });
  const config = {
    success: res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    },
    error: err => {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  axios.get(`${process.env.REACT_APP_API_URL}/user`, config, dispatch(authInterceptor()))
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      err.config.error(err);
    });
};

// register User
export const register = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = {"username": username, "password": password};
  axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS
      })
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
    });
};


var logoutTimerId;
const timeToLogout = Number(process.env.REACT_APP_API_TOKEN_EXPIRATION) * 1000 * 0.99; // nearly 15 minutes correspondign to the API

// Login user
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request Body
  const body = {"username": username, "password": password};
  axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, body, config)
  .then(res => {
    // Logout automatically if refreshToken "expired"
    const logoutTimer = () => setTimeout(
      () => dispatch(signout()),
      timeToLogout
    );
    logoutTimerId = logoutTimer();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  })
  .catch(err => {
    dispatch({
      type: LOGIN_FAIL
    });
  });
};


// Logout User
export const signout = () => (dispatch, getState) => {
    const config = {
        success: res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            clearTimeout(logoutTimerId);
        },
        error: err => {
            dispatch({
                type: LOGOUT_FAIL
            });
            clearTimeout(logoutTimerId);
        }
    };
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signout`, {"token": getState().auth.refreshToken}, config)
    .then(res => {
        res.config.success(res);
    })
    .catch(err => {
        err.config.error(err);
    });
};


export const authInterceptor = () => (dispatch, getState) => {
    // Add a request interceptor
    axios.interceptors.request.use(
        config => {
            config.headers['Content-Type'] = 'application/json';
            const token = getState().auth.token;
            if(token){
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        response => {
            // request was successfull
            return response;
        },
      error => {
          const originalRequest = error.config;
          const refreshToken = getState().auth.refreshToken;
          if(refreshToken){
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
                  axios.post('/auth/refresh', {"token": refreshToken})
                      .then(res => {
                          if (res.status === 200) {
                              clearTimeout(logoutTimerId);
                              const logoutTimer = () => setTimeout(
                                  () => dispatch(signout()),
                                  timeToLogout
                              );
                              logoutTimerId = logoutTimer();
                              dispatch({
                                type: REFRESH_TOKEN_SUCCESS,
                                payload: res.data
                              });
                              axios.defaults.headers.common['Authorization'] = 'Bearer ' + getState().auth.token;
                              // request was successfull, new request with the old parameters and the refreshed token
                              return axios(originalRequest)
                                  .then(res => {
                                      originalRequest.success(res);
                                  })
                                  .catch(err => {
                                      originalRequest.error(err);
                                  });
                            }
                          return Promise.reject(error);
                      })
                      .catch(err => {
                          // request failed, token could not be refreshed
                          dispatch({
                              type: AUTH_ERROR
                          });
                          return Promise.reject(error);
                      });
                }
            }
            // request status was unequal to 401, no possibility to refresh the token
            return Promise.reject(error);
        }
    );
};