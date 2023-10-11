import {
    SET_RECIPE_FORMULAR_UPLOADED,
    SET_RECIPE_BLOCKED,
    SET_RECIPE_ERROR,
    SET_RECIPE_TITLE,
    SET_RECIPE_PORTION,
    SET_RECIPE_TIME,
    ADD_RECIPE_KEYWORDS,
    REMOVE_RECIPE_KEYWORDS,
    SET_RECIPE_INGREDIENTS,
    SET_RECIPE_STEPS,
    SET_RECIPE_PICTURES,
    SET_RECIPE_FORMULAR,
    SET_ACTIVE_STEP,
    SET_RECIPE_CREDITS,
} from '../actions/types';

const initialState = {
    activeStep: 0,
    id: null,
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
    credits: '',
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
    pictures: {
        confirmed: false,
        new: [],
        removed: [],
        order: [],
    },
    error: {
        submit: false,
        title: false,
        portion: false,
        keywords: false,
        ingredients: [false],
        steps: false,
        pictures: false,
    },
    blocked: true,
    uploaded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_STEP:
            return {
                ...state,
                activeStep: action.payload,
            };
        case SET_RECIPE_TITLE:
            return {
                ...state,
                title: action.payload,
            };
        case SET_RECIPE_CREDITS:
            return {
                ...state,
                credits: action.payload,
            };
        case SET_RECIPE_PORTION:
            return {
                ...state,
                portion: action.payload,
            };
        case ADD_RECIPE_KEYWORDS:
            return {
                ...state,
                keywords: action.payload,
            };
        case REMOVE_RECIPE_KEYWORDS:
            return {
                ...state,
                keywords: action.payload,
            };
        case SET_RECIPE_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
            };
        case SET_RECIPE_STEPS:
            return {
                ...state,
                steps: action.payload,
            };
        case SET_RECIPE_PICTURES:
            return {
                ...state,
                pictures: action.payload,
            };
        case SET_RECIPE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case SET_RECIPE_TIME:
            return {
                ...state,
                time: action.payload,
            };
        case SET_RECIPE_FORMULAR:
            return {
                ...state,
                ...action.payload,
            };
        case SET_RECIPE_BLOCKED:
            return {
                ...state,
                blocked: action.payload,
            };
        case SET_RECIPE_FORMULAR_UPLOADED:
            return {
                ...state,
                uploaded: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
