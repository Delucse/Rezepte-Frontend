import { SET_RECIPE_TITLE, SET_RECIPE_PORTION, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE, SET_INGREDIENTS, SET_STEPS, SET_PICTURES} from '../actions/types';

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


export const changeStep = (index, step) => (dispatch, getState) => {
  var steps = getState().recipe.steps;
  steps[index] = step;
  dispatch({
    type: SET_STEPS,
    payload: steps
  });
};


export const addStep = (index) => (dispatch, getState) => {
  var steps = getState().recipe.steps;
  var step = '';
  steps.splice(index+1, 0, step);
  dispatch({
    type: SET_STEPS,
    payload: steps
  });
};

export const removeStep = (index) => (dispatch, getState) => {
  var steps = getState().recipe.steps;
  steps.splice(index, 1);
  dispatch({
    type: SET_STEPS,
    payload: steps
  });
};

export const changeStepPosition = (oldIndex, newIndex) => (dispatch, getState) => {
  var steps = getState().recipe.steps;
  var step = steps[oldIndex]
  steps.splice(oldIndex, 1);
  steps.splice(newIndex, 0, step);
  dispatch({
    type: SET_STEPS,
    payload: steps
  });
};


export const changePictures = (files) => (dispatch, getState) => {
  var pictures = getState().recipe.pictures;
  pictures = [...pictures];
  // files is a FileList object (similar to NodeList)
  // loop through files to prevent that an image is stored twice
  for (const key of Object.keys(files)) {
    var filter = pictures.filter(pic => pic.title === files[key].name);
    if(filter.length === 0){
      pictures.push({file: files[key], url: URL.createObjectURL(files[key]), title: files[key].name});
    }
    else {
      alert('already exists');
      // error: image already exists
    }
  }
  dispatch({
    type: SET_PICTURES,
    payload: pictures
  });
};


export const removePicture = (url) => (dispatch, getState) => {
  var pictures = getState().recipe.pictures;
  pictures = [...pictures];
  const index = pictures.findIndex(pic => pic.url === url);
  var newPictures = pictures.filter((el, idx) => index !== idx);
  dispatch({
    type: SET_PICTURES,
    payload: newPictures
  });
};


export const onDragEndPicture = (pictures) => (dispatch) => {
  dispatch({
    type: SET_PICTURES,
    payload: pictures
  });
};