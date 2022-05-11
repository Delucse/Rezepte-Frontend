import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import recipeReducer from './recipeReducer';
import recipeFormularReducer from './recipeFormularReducer';

export default combineReducers({
  settings: settingsReducer,
  recipe: recipeReducer,
  recipeFormular: recipeFormularReducer
});