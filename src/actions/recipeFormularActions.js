import { SET_RECIPE_BLOCKED, SET_RECIPE_ERROR, SET_RECIPE_TITLE, SET_RECIPE_PORTION, SET_RECIPE_TIME, SET_RECIPE_CATEGORIES, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE, SET_RECIPE_INGREDIENTS, SET_RECIPE_STEPS, SET_RECIPE_PICTURES, SET_RECIPE_FORMULAR } from '../actions/types';

import axios from 'axios';

import { setRecipeId } from './recipeActions';

export const isFoodAmountError = (amount) => {
  var amountDecimal = amount;
  if(typeof(amountDecimal) === 'string'){
      amountDecimal = amountDecimal.replace(',','.');
  }
  if(amountDecimal.length > 0 && !isNaN(amountDecimal) && amountDecimal >= 0){
      return false
  }
  if(amount !== ' '){
      return true
  }
  return true;
};

const setError = (key, value) => (dispatch, getState) => {
  var error = getState().recipeFormular.error;
  switch (key) {
    case 'title':
    case 'source':
      if(value === ""){
        error[key] = true;
      } else{
        error[key] = false;
      }
      break;
    case 'time':
      var sum = 0
      Object.values(value).forEach(val => {
        sum += val;
      });
      if(sum > 0){
        error[key] = false
      }
      else {
        error[key] = true
      }
      break;
    case 'categories':
      var errCategory = false
      Object.values(value).forEach(val => {
        if(val && val.length === 0){
          errCategory = true
        }
      });
      error[key] = errCategory;
      break;
    case 'keywords':
    case 'pictures':
      if(value.length === 0){
        error[key] = true;
      } else{
        error[key] = false;
      }
      break;
    case 'steps':
      var errSteps = false
      value.forEach(val => {
        if(val === ''){
          errSteps = true;
        }
      });
      error[key] = errSteps;
      break;
    case 'portion':
      if(value.count < 1 || value.volume === 1){
        error[key] = true;
      } else {
        error[key] = false;
      }
      break;
    case 'ingredients':
      var errIngredients = value.map(val => {
        if(val.title === ''){
          return true;
        }
        if(val.food.filter(f => (isFoodAmountError(f.amount) || f.unit === '' || f.aliment === '')).length > 0){
          return true;
        }
        return false;
      });
      error[key] = errIngredients
      break;
    case 'submit':
      error[key] = true;
      break;
    default:
      break;
  }
  dispatch({
    type: SET_RECIPE_ERROR,
    payload: {...error}
  })
}

export const setRecipeTitle = (title) => (dispatch, getState) => {
  dispatch({
    type: SET_RECIPE_TITLE,
    payload: title
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('title', title));
  }
};

export const setRecipePortion = (count, volume) => (dispatch, getState) => {
  dispatch({
    type: SET_RECIPE_PORTION,
    payload: {count, volume}
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('portion', {count, volume}));
  }
};

export const setRecipeSource = (source) => (dispatch, getState) => {
  dispatch({
    type: SET_RECIPE_SOURCE,
    payload: source
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('source', source));
  }
};

export const setRecipeTime = (time, type) => (dispatch, getState) => {
  var timeState = getState().recipeFormular.time
  timeState[type] = time
  dispatch({
    type: SET_RECIPE_TIME,
    payload: timeState
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('time', timeState));
  }
};

export const setRecipeCategories = (category, type) => (dispatch, getState) => {
  var categories = getState().recipeFormular.categories
  if(category){
    categories[type] = [...category]
  } else {
    categories[type] = category;
  }
  dispatch({
    type: SET_RECIPE_CATEGORIES,
    payload: {...categories}
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('categories', categories));
  }
};

export const addRecipeKeyword = (keyword) => (dispatch, getState) => {
  var keywords = getState().recipeFormular.keywords
  var filter = keywords.filter(key => key === keyword);
  if(filter.length === 0){
    keywords.push(keyword)
  }
  dispatch({
    type: ADD_RECIPE_KEYWORDS,
    payload: keywords
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('keywords', keywords));
  }
};

export const removeRecipeKeyword = (word) => (dispatch, getState) => {
  var keywords = getState().recipeFormular.keywords
  keywords = keywords.filter(keyword => keyword !== word)
  dispatch({
    type: REMOVE_RECIPE_KEYWORDS,
    payload: keywords
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('keywords', keywords));
  }
};

export const changeIngredientsTitle = (index, title) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients[index].title = title;
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const changeAmount = (ingredientsIndex, foodIndex, amount) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].amount = amount;
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const changeUnit = (ingredientsIndex, foodIndex, unit) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].unit = unit;
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const changeAliment = (ingredientsIndex, foodIndex, aliment) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients[ingredientsIndex].food[foodIndex].aliment = aliment;
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const addIngredients = (index) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  var ingredient = {
    title: '',
    food: [
      {amount: '', unit: '', aliment: ''},
      {amount: '', unit: '', aliment: ''},
      {amount: '', unit: '', aliment: ''}
    ]
  };
  ingredients.splice(index+1, 0, ingredient);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const removeIngredients = (index) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients.splice(index, 1);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const changeIngredientsPosition = (oldIndex, newIndex) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  var ingredient = ingredients[oldIndex]
  ingredients.splice(oldIndex, 1);
  ingredients.splice(newIndex, 0, ingredient);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
};

export const addFood = (ingredientsIndex, foodIndex) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  var food = {amount: '', unit: '', aliment: ''};
  ingredients[ingredientsIndex].food.splice(foodIndex+1, 0, food);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const removeFood = (ingredientsIndex, foodIndex) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  ingredients[ingredientsIndex].food.splice(foodIndex, 1);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('ingredients', ingredients));
  }
};

export const changeFoodPosition = (ingredientsIndex, oldIndex, newIndex) => (dispatch, getState) => {
  var ingredients = getState().recipeFormular.ingredients;
  var food = ingredients[ingredientsIndex].food[oldIndex]
  ingredients[ingredientsIndex].food.splice(oldIndex, 1);
  ingredients[ingredientsIndex].food.splice(newIndex, 0, food);
  dispatch({
    type: SET_RECIPE_INGREDIENTS,
    payload: [...ingredients]
  });
};


export const changeStep = (index, step) => (dispatch, getState) => {
  var steps = getState().recipeFormular.steps;
  steps[index] = step;
  dispatch({
    type: SET_RECIPE_STEPS,
    payload: [...steps]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('steps', steps));
  }
};


export const addStep = (index) => (dispatch, getState) => {
  var steps = getState().recipeFormular.steps;
  var step = '';
  steps.splice(index+1, 0, step);
  dispatch({
    type: SET_RECIPE_STEPS,
    payload: [...steps]
  });
};

export const removeStep = (index) => (dispatch, getState) => {
  var steps = getState().recipeFormular.steps;
  steps.splice(index, 1);
  dispatch({
    type: SET_RECIPE_STEPS,
    payload: [...steps]
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('steps', steps));
  }
};

export const changeStepPosition = (oldIndex, newIndex) => (dispatch, getState) => {
  var steps = getState().recipeFormular.steps;
  var step = steps[oldIndex]
  steps.splice(oldIndex, 1);
  steps.splice(newIndex, 0, step);
  dispatch({
    type: SET_RECIPE_STEPS,
    payload: [...steps]
  });
};


export const changePictures = (files) => (dispatch, getState) => {
  var pictures = getState().recipeFormular.pictures;
  pictures = [...pictures];
  // files is a FileList object (similar to NodeList)
  // loop through files to prevent that an image is stored twice
  for (const key of Object.keys(files)) {
    var filter = pictures.filter(pic => pic.title === files[key].name);
    if(filter.length === 0){
      pictures.push({
        file: files[key],
        url: URL.createObjectURL(files[key]), 
        title: files[key].name
      });
    }
    // else {
    //   alert('already exists');
    //   // error: image already exists
    // }
  }
  dispatch({
    type: SET_RECIPE_PICTURES,
    payload: pictures
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('pictures', pictures));
  } 
};


export const removePicture = (url) => (dispatch, getState) => {
  var pictures = getState().recipeFormular.pictures;
  pictures = [...pictures];
  const index = pictures.findIndex(pic => pic.url === url);
  var newPictures = pictures.filter((el, idx) => index !== idx);
  dispatch({
    type: SET_RECIPE_PICTURES,
    payload: newPictures
  });
  if(getState().recipeFormular.error.submit){
    dispatch(setError('pictures', newPictures));
  }
};


export const onDragEndPicture = (pictures) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_PICTURES,
    payload: pictures
  });
};


export const checkRecipeError = () => (dispatch, getState) => {
  const {title, portion, source, time, categories, keywords, ingredients, steps, pictures} = getState().recipeFormular;
  dispatch(setError('title', title));
  dispatch(setError('portion', portion));
  dispatch(setError('source', source));
  dispatch(setError('time', time));
  dispatch(setError('categories', categories));
  dispatch(setError('keywords', keywords));
  dispatch(setError('ingredients', ingredients));
  dispatch(setError('steps', steps));
  dispatch(setError('pictures', pictures));
  dispatch(setError('submit'));
}


const objectToFormData = (data, formData, subkey) => {
  Object.entries(data).forEach(([key, value]) => {
    var newkey;
    if(subkey){
      newkey = `${subkey}[${key}]`;
    } else {
      newkey = key;
    }
    if(typeof(value) === 'object') {
      formData = objectToFormData(data[key], formData, newkey);
    }
    else {
      formData.append(newkey, value);
    }
  });
  return formData;
}

export const submitRecipe = () => (dispatch, getState) => {
  var {title, portion, source, time, categories, keywords, steps, pictures} = getState().recipeFormular;

  Object.entries(categories).forEach(([key])  => {
    if(categories[key]){
      keywords = keywords.concat(categories[key]);
    }
  });

  var data = {
    title, source, portion, time, keywords, ingredients: getState().recipe.ingredients, steps
  }

  var body = new FormData();
  body = objectToFormData(data, body);
  
  if(pictures.length > 0){
    pictures.forEach((pic, i) => {
      body.append('pictures', pic.file);
    });
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // necessary to upload files
    },
    // onUploadProgress: progressEvent => {
    //   console.log('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
    // },
    // onDownloadProgress: progressEvent => {
    //   console.log('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
    // },
    success: res => {
      dispatch(setRecipeId(res.data.id));
      dispatch(setBlocked(false));
      dispatch(resetRecipeFormular());
    },
    error: err => {
      console.error(err);
    }
  };

  axios.post(`${process.env.REACT_APP_API_URL}/recipe`, body, config)
    .then(res => {
      res.config.success(res);
    })
    .catch(err => {
      err.config.error(err);
    });
};

export const resetRecipeFormular = () => (dispatch, getState) => {
  dispatch({
    type: SET_RECIPE_FORMULAR,
    payload: {
      title: '',
      portion: {
        count: 0,
        volume: -1
      },
      source: '',
      time: {
        preparation: 0,
        resting: 0,
        baking: 0
      },
      categories: {
        ingredients: [],
        dish: [],
        season: [],
        heat: []
      },
      keywords: [],
      ingredients: [{
        title: '',
        food: [
          {amount: '', unit: '', aliment: ''},
          {amount: '', unit: '', aliment: ''},
          {amount: '', unit: '', aliment: ''}
        ]
      }],
      steps: ['','',''],
      pictures: [],
      error: {
        submit: false,
        title: false,
        portion: false,
        source: false,
        keywords: false,
        ingredients: [false, false, false],
        steps: false,
        pictures: false
      },
      blocked: getState().recipeFormular.blocked
    }
  })
}

export const setBlocked = (bool) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_BLOCKED,
    payload: bool
  });
};