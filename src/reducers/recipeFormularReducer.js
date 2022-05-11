import { SET_RECIPE_ERROR, SET_RECIPE_TITLE, SET_RECIPE_PORTION, SET_RECIPE_TIME, SET_RECIPE_CATEGORIES, ADD_RECIPE_KEYWORDS, REMOVE_RECIPE_KEYWORDS, SET_RECIPE_SOURCE, SET_RECIPE_INGREDIENTS, SET_RECIPE_STEPS, SET_RECIPE_PICTURES, SET_RECIPE_FORMULAR } from '../actions/types';


const initialState = {
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
        {amount: -1, unit: '', aliment: ''},
        {amount: -1, unit: '', aliment: ''},
        {amount: -1, unit: '', aliment: ''}
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
    }
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
    case SET_RECIPE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload
      }
    case SET_RECIPE_STEPS:
      return {
        ...state,
        steps: action.payload
      }
    case SET_RECIPE_PICTURES:
      return {
        ...state,
        pictures: action.payload
      };
    case SET_RECIPE_ERROR: 
      return {
        ...state,
        error: action.payload
      };
    case SET_RECIPE_TIME:
      return {
        ...state,
        time: action.payload
      };
    case SET_RECIPE_CATEGORIES: 
      return {
        ...state,
       categories: action.payload 
      }
    case SET_RECIPE_FORMULAR: 
      return {
        ...action.payload
      }
    default:
      return state;
  }
}

export default reducer; 