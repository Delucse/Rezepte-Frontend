import { GET_RECIPES, SET_WORD, FILTER_OPEN, SET_CATEGORIES, SET_SORT, SET_TYPE } from '../actions/types';


const initialState = {
    word: '',
    type: 'all',
    sort: {
      type: 'score',
      ascending: true
    },
    open: false,
    categories: [],
    recipes: []
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };
    case SET_WORD:
      return {
        ...state,
        word: action.payload
      };
    case SET_TYPE:
      return {
        ...state,
        type: action.payload
      }
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case SET_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case FILTER_OPEN:
      return {
        ...state,
        open: action.payload
      }
    default:
      return state;
  }
}

export default reducer; 