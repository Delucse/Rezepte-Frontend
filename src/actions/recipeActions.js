import { GET_RECIPE, SET_RECIPE_SETTINGS, SET_RECIPE_ID } from '../actions/types';

import { setError, setLoading } from '../actions/settingsActions';

import axios from 'axios';

export const setRecipeSettings = (count, volume) => (dispatch, getState) => {
  var settings = getState().recipe.settings;
  settings.count = count;
  settings.volume = volume;
  dispatch({
    type: SET_RECIPE_SETTINGS,
    payload: settings
  });
};

export const getRecipePreview = () => (dispatch, getState) => {

  const recipeFormular = getState().recipeFormular;
  var keywords = recipeFormular.keywords;
  Object.entries(recipeFormular.categories).forEach(([key])  => {
    if(recipeFormular.categories[key]){
      keywords = keywords.concat(recipeFormular.categories[key]);
    }
  });

  var ingredients = [];
  recipeFormular.ingredients.forEach(ingredient => {
    var i = {};
    i.title = ingredient.title;
    i.food = [];
    ingredient.food.forEach(food => {
      var f = {};
      f.unit = food.unit;
      f.aliment = food.aliment;
      if(food.amount === " "){
        f.amount = 0
      } else {
        const amountDecimal = food.amount.replace(',','.')
        f.amount = Number(amountDecimal);
      }
      i.food.push(f);
    });
    ingredients.push(i);
  });

  dispatch({
    type: GET_RECIPE,
    payload: {
      id: null,
      title: recipeFormular.title,
      portion: recipeFormular.portion,
      source: recipeFormular.source,
      time: recipeFormular.time,
      keywords: keywords,
      ingredients: ingredients,
      steps: recipeFormular.steps,
      pictures: recipeFormular.pictures,
      settings: {
        count: recipeFormular.portion.count,
        volume: recipeFormular.portion.volume
      },
  }});
  dispatch(setError(false));
  dispatch(setLoading(false));
}

export const setRecipeId = (id) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_ID,
    payload: id
  });
}

export const getRecipe = (id) => (dispatch) => {
  dispatch(setError(false));
  dispatch(setLoading(true));
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    onDownloadProgress: progressEvent => {
      console.info('Progress: ' + (Math.round(progressEvent.loaded / progressEvent.total * 100)) +' %');
    }
  };
  axios.get(`${process.env.REACT_APP_API_URL}/recipe/${id}`, config)
    .then(res => {
      dispatch({
        type: GET_RECIPE,
        payload: {
          id: res.data._id,
          title: res.data.title,
          portion: res.data.portion,
          source: res.data.source,
          time: res.data.time,
          keywords: res.data.keywords,
          ingredients: res.data.ingredients,
          steps: res.data.steps,
          pictures: res.data.pictures,
          settings: {
            count: res.data.portion.count,
            volume: res.data.portion.volume
          },
      }});
      dispatch(setError(false));
      dispatch(setLoading(false));
      console.info(res.data)
    })
    .catch(err => {
      dispatch(setError(true));
      dispatch(setLoading(false));
      console.error(err);
    });
};

export const resetRecipe = () => (dispatch, getState) => {
  dispatch({
    type: GET_RECIPE,
    payload: {
      id: null,
      title: null,
      portion: null,
      source: null,
      time: null,
      keywords: null,
      ingredients: null,
      steps: null,
      pictures: null,
      settings: {
        count: 0,
        volume: 0
      },
  }});
  dispatch(setError(false));
  dispatch(setLoading(false));
}