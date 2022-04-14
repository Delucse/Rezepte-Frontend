import { SET_RECIPE_TITLE } from '../actions/types';

export const setRecipeTitle = (title) => (dispatch) => {
  dispatch({
    type: SET_RECIPE_TITLE,
    payload: title
  });
};