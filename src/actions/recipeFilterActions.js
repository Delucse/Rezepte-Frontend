import { GET_RECIPES, FILTER_OPEN, SET_WORD, SET_SORT, SET_TYPE, SET_CATEGORIES, RESET_RECIPES_FILTER, SET_ROUTE } from '../actions/types';

import { setLoading, setError } from './settingsActions';

import axios from 'axios';

export const getRecipes = () => (dispatch, getState) => {
  const {word, sort, type, categories, route} = getState().recipeFilter;
  dispatch(setError(false));
  dispatch(setLoading(true));
  const config = {
      onDownloadProgress: progressEvent => {
        console.info('Progress: ' + (Math.round(progressEvent.loaded / progressEvent.total * 100)) +' %');
      },
      success: res => {
        const recipes = res.data.map(recipe => {
          recipe.rotate = Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
          return recipe;
        });
        dispatch({
          type: GET_RECIPES,
          payload: recipes
        });
        dispatch(setError(false));
        dispatch(setLoading(false));
      },
      error: err => {
        dispatch(setError(true));
        dispatch(setLoading(false));
      }
    };
    axios.get(`${process.env.REACT_APP_API_URL}/recipe${route === 'user' ? '/user' : ''}?search=${word}&type=${type}&keywords=${categories.join(',')}&sort=${sort.type}&ascending=${sort.ascending}`, config)
      .then(res => {
        res.config.success(res);
      })
      .catch(err => {
        err.config.error(err);
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


export const removeCategory = (category) => (dispatch, getState) => {
  var categories = getState().recipeFilter.categories;
  categories = categories.filter(cat => cat !== category);
  dispatch({
    type: SET_CATEGORIES,
    payload: categories
  });
}

export const setCategories = (categories) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES,
    payload: categories
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

export const setRoute = (route) => (dispatch) => {
  dispatch({
    type: SET_ROUTE,
    payload: route
  })
}