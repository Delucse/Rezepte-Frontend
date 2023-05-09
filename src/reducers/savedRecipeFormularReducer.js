import { SET_SAVED_RECIPE_FORMULAR } from '../actions/types';

const initialState = {
    id: null,
    recipe: null,
    title: '',
    portion: {
        count: 0,
        art: null,
    },
    time: {
        preparation: 0,
        resting: 0,
        baking: 0,
    },
    keywords: [],
    ingredients: [
        {
            food: [
                { amount: '', unit: '', aliment: '' },
                { amount: '', unit: '', aliment: '' },
                { amount: '', unit: '', aliment: '' },
            ],
        },
    ],
    steps: ['', '', ''],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SAVED_RECIPE_FORMULAR:
            return {
                id: action.payload.id,
                recipe: action.payload.recipe,
                title: action.payload.title,
                portion: action.payload.portion,
                time: action.payload.time,
                keywords: action.payload.keywords,
                ingredients: action.payload.ingredients,
                steps: action.payload.steps,
            };
        default:
            return state;
    }
};

export default reducer;
