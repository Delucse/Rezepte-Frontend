import { SET_SAVED_RECIPE_FORMULAR } from '../actions/types';

import { cloneDeep, isEqual } from 'lodash';

import api from '../axiosInstance';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';

export const saveRecipeFormular = () => (dispatch, getState) => {
    const recipeFormular = cloneDeep(getState().recipeFormular);

    const formular = {
        title: recipeFormular.title,
        portion: recipeFormular.portion,
        time: recipeFormular.time,
        keywords: recipeFormular.keywords,
        ingredients: recipeFormular.ingredients,
        steps: recipeFormular.steps,
    };

    const originFormular = {
        title: '',
        portion: {},
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
    if (!isEqual(formular, originFormular)) {
        const { id, recipe, ...savedRecipeFormular } = cloneDeep(
            getState().savedRecipeFormular
        );
        if (!isEqual(formular, savedRecipeFormular)) {
            dispatch(setProgress('saveRecipeFormular'));
            var { title, portion, time, keywords, ingredients, steps } =
                recipeFormular;

            if (portion.form) {
                portion.form = portion.form.map((f) =>
                    Number(f.toString().replace(',', '.'))
                );
            }

            const config = {
                method: id ? 'PUT' : 'POST',
                url: `/recipe/prototype${id ? `/${id}` : ''}`,
                data: {
                    id: recipe,
                    title,
                    portion,
                    time,
                    keywords,
                    ingredients,
                    steps,
                },
                success: (res) => {
                    dispatch({
                        type: SET_SAVED_RECIPE_FORMULAR,
                        payload: {
                            id: id ? id : res.data.id,
                            recipe,
                            title: recipeFormular.title,
                            portion: recipeFormular.portion,
                            time: recipeFormular.time,
                            keywords: recipeFormular.keywords,
                            ingredients: recipeFormular.ingredients,
                            steps: recipeFormular.steps,
                        },
                    });
                    dispatch(setProgressSuccess('saveRecipeFormular'));
                },
                error: (err) => {
                    console.error(err.message);
                    if (err.response.status !== 401) {
                        dispatch(setProgressError('saveRecipeFormular'));
                    }
                },
            };
            api(config)
                .then((res) => {
                    res.config.success(res);
                })
                .catch((err) => {
                    err.config.error(err);
                });
        }
    }
};

export const resetSaveRecipeFormular = () => (dispatch, getState) => {
    dispatch({
        type: SET_SAVED_RECIPE_FORMULAR,
        payload: {
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
        },
    });
};
