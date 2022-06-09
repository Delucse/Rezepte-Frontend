import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import recipeReducer from './recipeReducer';
import recipeFilterReducer from './recipeFilterReducer';
import recipeFormularReducer from './recipeFormularReducer';

export default combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  recipe: recipeReducer,
  recipeFilter: recipeFilterReducer,
  recipeFormular: recipeFormularReducer
});