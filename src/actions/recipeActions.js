import { SET_RECIPE_TITLE, SET_RECIPE_PORTION} from '../actions/types';

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