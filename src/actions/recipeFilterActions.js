import { GET_RECIPES, FILTER_OPEN, SET_WORD, SET_SORT } from '../actions/types';

import { setLoading, setError } from './settingsActions';

import axios from 'axios';

export const getRecipes = (type) => (dispatch, getState) => {
  const {word, sort} = getState().recipeFilter;
  dispatch(setError(false));
  dispatch(setLoading(true));
  const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      onUploadProgress: progressEvent => {
        console.log('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
      },
      onDownloadProgress: progressEvent => {
        console.log('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
      }
    };
    axios.get(`${process.env.REACT_APP_API_URL}/recipe${type === 'user' ? '/user' : ''}?search=${word}&sort=${sort.type}&ascending=${sort.ascending}`, config)
      .then(res => {
          dispatch({
            type: GET_RECIPES,
            payload: res.data
          });
          dispatch(setError(false));
          dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setError(true));
        dispatch(setLoading(false));
      });
};

export const setOpen = (bool) => (dispatch) => {
  dispatch({
    type: FILTER_OPEN,
    payload: bool
  });
};

export const setWord = (word) => (dispatch) => {
  dispatch({
    type: SET_WORD,
    payload: word
  });
};

export const setSort = (type, isAscending) => (dispatch) => {
  dispatch({
    type: SET_SORT,
    payload: {
      type: type,
      ascending: isAscending
    }
  });
}