import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import settingsReducer from './settingsReducer';
import recipeReducer from './recipeReducer';
import recipeFilterReducer from './recipeFilterReducer';
import recipeFormularReducer from './recipeFormularReducer';

export default combineReducers({
  auth: authReducer,
  message: messageReducer,
  settings: settingsReducer,
  recipe: recipeReducer,
  recipeFilter: recipeFilterReducer,
  recipeFormular: recipeFormularReducer
});