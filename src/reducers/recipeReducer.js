import {
    GET_RECIPE,
    SET_RECIPE_SETTINGS,
    SET_RECIPE_ID,
    SET_RECIPE_FAVORITE,
    ADD_RECIPE_PICTURE,
} from '../actions/types';

const initialState = {
    id: null,
    user: null,
    title: null,
    portion: null,
    source: null,
    time: null,
    keywords: null,
    ingredients: null,
    steps: null,
    pictures: null,
    favorite: null,
    settings: {
        count: 0,
        volume: 0,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPE:
            return {
                ...state,
                ...action.payload,
            };
        case SET_RECIPE_SETTINGS:
            return {
                ...state,
                settings: action.payload,
            };
        case SET_RECIPE_ID:
            return {
                ...state,
                id: action.payload,
            };
        case SET_RECIPE_FAVORITE:
            return {
                ...state,
                favorite: action.payload,
            };
        case ADD_RECIPE_PICTURE:
            return {
                ...state,
                pictures: [...state.pictures, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;
