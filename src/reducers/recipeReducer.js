import { SET_RECIPE_TITLE, SET_RECIPE_PORTION, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE } from '../actions/types';


const initialState = {
    title: '',
    portion: {
      count: 0,
      volume: -1
    },
    source: '',
    keywords: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case SET_RECIPE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    case SET_RECIPE_PORTION:
      return {
        ...state,
        portion: action.payload
      }
    case SET_RECIPE_SOURCE:
      return {
        ...state,
        source: action.payload
      }
    case ADD_RECIPE_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      }
    case REMOVE_RECIPE_KEYWORDS:
      return {
        ...state,
        keywords: action.payload
      }
    default:
      return state;
  }
}

export default reducer; 