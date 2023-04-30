import {
    GET_RECIPE,
    SET_RECIPE_SETTINGS,
    SET_RECIPE_ID,
    SET_RECIPE_FAVORITE,
    SET_RECIPE_NOTE,
    ADD_RECIPE_PICTURE,
} from '../actions/types';

import { snackbarMessage } from './messageActions';
import {
    setProgress,
    setProgressSuccess,
    setProgressError,
} from './progressActions';

import api from '../axiosInstance';

import moment from 'moment';

export const setRecipeSettings = (count, form, rounded) => (dispatch) => {
    var payload = { count, rounded };
    if (form) {
        payload.form = form;
    }
    dispatch({
        type: SET_RECIPE_SETTINGS,
        payload: payload,
    });
};

export const getRecipePreview = () => (dispatch, getState) => {
    const recipeFormular = getState().recipeFormular;
    const recipe = getState().recipe;

    var ingredients = [];
    recipeFormular.ingredients.forEach((ingredient) => {
        var i = {};
        if (ingredient.title) {
            i.title = ingredient.title;
        }
        i.food = [];
        ingredient.food.forEach((food) => {
            var f = {};
            f.unit = food.unit;
            f.aliment = food.aliment;
            if (food.amount === ' ') {
                f.amount = 0;
            } else if (typeof food.amount === 'string') {
                const amountDecimal = food.amount.replace(',', '.');
                f.amount = Number(amountDecimal);
            } else {
                f.amount = food.amount;
            }
            i.food.push(f);
        });
        ingredients.push(i);
    });

    var payload = {
        id: recipe.id,
        date: moment().format(),
        user: getState().auth.user,
        title: recipeFormular.title,
        portion: recipeFormular.portion,
        time: recipeFormular.time,
        keywords: recipeFormular.keywords,
        ingredients: ingredients,
        steps: recipeFormular.steps,
        pictures: recipeFormular.pictures.order.map((pic) => {
            return { _id: pic.id, file: pic.url };
        }),
        settings: {
            count: recipeFormular.portion.count,
            rounded: true,
        },
        note: recipe.note,
        favorite: recipe.favorite,
    };

    if (recipeFormular.portion.form) {
        const formDecimal = recipeFormular.portion.form.map((f) =>
            Number(f.toString().replace(',', '.'))
        );
        payload.settings.form = formDecimal;
    }

    dispatch({
        type: GET_RECIPE,
        payload: payload,
    });
    dispatch(setProgressSuccess('recipe'));
};

export const setRecipeId = (id) => (dispatch) => {
    dispatch({
        type: SET_RECIPE_ID,
        payload: id,
    });
};

export const getRecipe =
    (id, loadUi = true) =>
    (dispatch, getState) => {
        if (loadUi) {
            dispatch(setProgress('recipe'));
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: `/recipe/${id}`,
            onDownloadProgress: (progressEvent) => {
                // console.info('Progress: ' + (Math.round(progressEvent.loaded / progressEvent.total * 100)) +' %');
            },
            success: (res) => {
                const { id, settings } = getState().recipe;

                var payload = {
                    id: res.data._id,
                    date: res.data.date,
                    user: res.data.user,
                    title: res.data.title,
                    portion: res.data.portion,
                    time: res.data.time,
                    keywords: res.data.keywords,
                    ingredients: res.data.ingredients,
                    steps: res.data.steps,
                    pictures: res.data.pictures,
                    favorite: res.data.favorite,
                    note: res.data.note,
                    prototype: res.data.prototype,
                };
                if (loadUi) {
                    payload.settings = {
                        count:
                            !id && settings.count
                                ? settings.count
                                : res.data.portion.count,
                        rounded: true,
                    };
                    if (res.data.portion.form) {
                        payload.settings.form =
                            !id && settings.form
                                ? settings.form
                                : res.data.portion.form;
                    }
                }
                dispatch({
                    type: GET_RECIPE,
                    payload: payload,
                });
                dispatch(setProgressSuccess('recipe'));
            },
            error: (err) => {
                if (!err.response || err.response.status === 500) {
                    dispatch(setProgressError('recipeError'));
                } else {
                    dispatch(setProgressError('recipe'));
                }
                console.error(err);
            },
        };
        api(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

export const getRecipePrototype = (id) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
        url: `/recipe/prototype/${id}`,
        success: (res) => {
            dispatch({
                type: GET_RECIPE,
                payload: {
                    id: res.data.recipe,
                    date: res.data.date,
                    user: res.data.user,
                    title: res.data.title,
                    portion: res.data.portion,
                    time: res.data.time,
                    keywords: res.data.keywords,
                    ingredients: res.data.ingredients,
                    steps: res.data.steps,
                    pictures: res.data.pictures,
                    favorite: res.data.favorite,
                    note: res.data.note,
                    prototype: res.data._id,
                    settings: {
                        count:
                            res.data.portion && res.data.portion.count
                                ? res.data.portion.count
                                : 0,
                        rounded: true,
                        form:
                            res.data.portion && res.data.portion.form
                                ? res.data.portion.form
                                : null,
                    },
                },
            });
            dispatch(setProgressSuccess('recipe'));
        },
        error: (err) => {
            if (!err.response || err.response.status === 500) {
                dispatch(setProgressError('recipeError'));
            } else {
                dispatch(setProgressError('recipe'));
            }
            console.error(err);
        },
    };
    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const resetRecipe = () => (dispatch) => {
    dispatch({
        type: GET_RECIPE,
        payload: {
            id: null,
            date: null,
            user: null,
            title: null,
            portion: null,
            time: null,
            keywords: null,
            ingredients: null,
            steps: null,
            pictures: null,
            favorite: null,
            note: null,
            prototype: null,
            settings: {
                count: 0,
                rounded: true,
            },
        },
    });
    dispatch(setProgressSuccess('recipe'));
};

export const addPicture = (pic) => (dispatch) => {
    dispatch({
        type: ADD_RECIPE_PICTURE,
        payload: pic,
    });
};

export const setRecipeFavorite = () => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: `/recipe/favorite/${getState().recipe.id}`,
        success: (res) => {
            dispatch({
                type: SET_RECIPE_FAVORITE,
                payload: true,
            });
            dispatch(
                snackbarMessage(
                    `"${
                        getState().recipe.title
                    }" wurde erfolgreich in dein Kochbuch aufgenommen.`,
                    'recipe'
                )
            );
        },
        error: (err) => {
            console.error(err);
        },
    };
    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const deleteRecipeFavorite = () => (dispatch, getState) => {
    const config = {
        method: 'DELETE',
        url: `/recipe/favorite/${getState().recipe.id}`,
        success: (res) => {
            dispatch({
                type: SET_RECIPE_FAVORITE,
                payload: false,
            });
            dispatch(
                snackbarMessage(
                    `"${
                        getState().recipe.title
                    }" wurde erfolgreich aus deinem Kochbuch entfernt.`,
                    'recipe'
                )
            );
        },
        error: (err) => {
            console.error(err);
        },
    };
    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const setRecipeNote = (note) => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: `/recipe/note/${getState().recipe.id}`,
        data: { text: note },
        success: (res) => {
            dispatch({
                type: SET_RECIPE_NOTE,
                payload: note,
            });
        },
        error: (err) => {
            console.error(err);
        },
    };
    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const deleteRecipeNote = () => (dispatch, getState) => {
    const config = {
        method: 'DELETE',
        url: `/recipe/note/${getState().recipe.id}`,
        success: (res) => {
            dispatch({
                type: SET_RECIPE_NOTE,
                payload: '',
            });
            dispatch(
                snackbarMessage(
                    `Deine Notiz zum Rezept "${
                        getState().recipe.title
                    }" wurde erfolgreich entfernt.`,
                    'recipe'
                )
            );
        },
        error: (err) => {
            console.error(err);
        },
    };
    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};
