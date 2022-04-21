import { SET_RECIPE_TITLE, SET_RECIPE_PORTION, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE, SET_INGREDIENTS} from '../actions/types';

export const setRecipeTitle = (title) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_TITLE,
    payload: title
  });
};

export const setRecipePortion = (count, volume) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_PORTION,
    payload: {count, volume}
  });
};

export const setRecipeSource = (source) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_SOURCE,
    payload: source
  });
};

export const addRecipeKeyword = (keyword) => (dispatch, getState) => {
  var keywords = getState().recipe.keywords
  keywords.push(keyword)
  dispatch({
    type: ADD_RECIPE_KEYWORDS,
    payload: keywords
  });
};

export const removeRecipeKeyword = (word) => (dispatch, getState) => {
  var keywords = getState().recipe.keywords
  keywords = keywords.filter(keyword => keyword !== word)
  dispatch({
    type: REMOVE_RECIPE_KEYWORDS,
    payload: keywords
  });
};

export const changeIngredientsTitle = (index, title) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients[index].title = title;
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const changeAmount = (ingredientsIndex, foodIndex, amount) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].amount = amount;
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const changeUnit = (ingredientsIndex, foodIndex, unit) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].unit = unit;
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const changeAliment = (ingredientsIndex, foodIndex, aliment) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].aliment = aliment;
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const addIngredients = (index) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  var ingredient = {
    title: '',
    food: [
      {amount: -1, unit: '', aliment: ''},
      {amount: -1, unit: '', aliment: ''},
      {amount: -1, unit: '', aliment: ''}
    ]
  };
  ingredients.splice(index+1, 0, ingredient);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const removeIngredients = (index) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients.splice(index, 1);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const changeIngredientsPosition = (oldIndex, newIndex) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  var ingredient = ingredients[oldIndex]
  ingredients.splice(oldIndex, 1);
  ingredients.splice(newIndex, 0, ingredient);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const addFood = (ingredientsIndex, foodIndex) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  var food = {amount: -1, unit: '', aliment: ''};
  ingredients[ingredientsIndex].food.splice(foodIndex+1, 0, food);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const removeFood = (ingredientsIndex, foodIndex) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  ingredients[ingredientsIndex].food.splice(foodIndex, 1);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};

export const changeFoodPosition = (ingredientsIndex, oldIndex, newIndex) => (dispatch, getState) => {
  var ingredients = getState().recipe.ingredients;
  var food = ingredients[ingredientsIndex].food[oldIndex]
  ingredients[ingredientsIndex].food.splice(oldIndex, 1);
  ingredients[ingredientsIndex].food.splice(newIndex, 0, food);
  dispatch({
    type: SET_INGREDIENTS,
    payload: ingredients
  });
};