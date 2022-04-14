import { SET_RECIPE_TITLE } from '../actions/types';


const initialState = {
    title: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case SET_RECIPE_TITLE:
      return {
        ...state,
        title: action.payload
      };
    default:
      return state;
  }
}

export default reducer; 