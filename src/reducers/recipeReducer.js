import { SET_RECIPE_TITLE, SET_RECIPE_PORTION } from '../actions/types';


const initialState = {
    title: '',
    portion: {
      count: 0,
      volume: 0
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
    default:
      return state;
  }
}

export default reducer; 