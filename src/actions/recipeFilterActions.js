import { GET_RECIPES, FILTER_OPEN, SET_WORD, SET_SORT, SET_TYPE, SET_CATEGORIES, RESET_RECIPES_FILTER } from '../actions/types';

import { setLoading, setError } from './settingsActions';

import axios from 'axios';

export const getRecipes = (route) => (dispatch, getState) => {
  const {word, sort, type, categories} = getState().recipeFilter;
  dispatch(setError(false));
  dispatch(setLoading(true));
  const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      onUploadProgress: progressEvent => {
        // console.log('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
      },
      onDownloadProgress: progressEvent => {
        // console.log('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
      }
    };
    axios.get(`${process.env.REACT_APP_API_URL}/recipe${route === 'user' ? '/user' : ''}?search=${word}&type=${type}&keywords=${categories.join(',')}&sort=${sort.type}&ascending=${sort.ascending}`, config)
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

export const setType = (type) => (dispatch) => {
  dispatch({
    type: SET_TYPE,
    payload: type
  });
}

export const addCategory = (category) => (dispatch, getState) => {
  var categories = getState().recipeFilter.categories;
  categories.push(category);
  dispatch({
    type: SET_CATEGORIES,
    payload: category
  });
}

export const removeCategory = (category) => (dispatch, getState) => {
  var categories = getState().recipeFilter.categories;
  categories = categories.filter(cat => cat !== category);
  dispatch({
    type: SET_CATEGORIES,
    payload: category
  });
}

export const resetFilterSettings = () => (dispatch) => {
  dispatch({
    type: RESET_RECIPES_FILTER,
    payload: {
      word: '',
      type: 'all',
      sort: {
        type: 'score',
        ascending: true
      },
      open: false,
      categories: [],
      recipes: []
    }
  })
}