import { SET_RECIPE_TITLE, SET_RECIPE_PORTION, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE} from '../actions/types';

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