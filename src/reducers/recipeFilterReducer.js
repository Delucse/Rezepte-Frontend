import { GET_RECIPES, SET_WORD, FILTER_OPEN, SET_FILTER, SET_SORT } from '../actions/types';


const initialState = {
    word: '',
    open: false,
    filter: {

    },
    sort: {
      type: 'title',
      ascending: true
    },
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
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
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