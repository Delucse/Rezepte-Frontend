import { GET_RECIPE, SET_RECIPE_SETTINGS } from '../actions/types';


const initialState = {
    id: null,
    title: null,
    portion: null,
    source: null,
    time: null,
    keywords: null,
    ingredients: null,
    steps: null,
    pictures: null,
    settings: {
      count: 0,
      volume: 0
    },
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case GET_RECIPE:
      return {
        ...action.payload
      };
    case SET_RECIPE_SETTINGS:
      return {
        ...state,
        settings: action.payload
      }
    default:
      return state;
  }
}

export default reducer; 