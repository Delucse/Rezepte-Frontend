import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import recipeReducer from './recipeReducer';
import recipeFormularReducer from './recipeFormularReducer';

export default combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  recipe: recipeReducer,
  recipeFormular: recipeFormularReducer
});