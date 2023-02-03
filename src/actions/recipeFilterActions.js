import {
    GET_RECIPES,
    FILTER_OPEN,
    SET_WORD,
    SET_SORT,
    SET_TYPE,
    SET_CATEGORIES,
    RESET_RECIPES_FILTER,
    SET_ROUTE,
    SET_AUTHOR,
} from '../actions/types';

import { snackbarMessage } from './messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';

import api from '../axiosInstance';

export const getRecipes =
    (loadUi = true) =>
    (dispatch, getState) => {
        const { word, sort, type, categories, route, author, recipes } =
            getState().recipeFilter;
        if (loadUi) {
            dispatch(setProgress('recipeFilter'));
        }
        const config = {
            onDownloadProgress: (progressEvent) => {
                // console.info('Progress: ' + (Math.round(progressEvent.loaded / progressEvent.total * 100)) +' %');
            },
            success: (res) => {
                const newRecipes = res.data.map((recipe, index) => {
                    recipe.rotate = loadUi
                        ? Math.floor(Math.random() * (10 - -10 + 1)) + -10
                        : recipes[index].rotate;
                    return recipe;
                });
                dispatch({
                    type: GET_RECIPES,
                    payload: [...newRecipes],
                });
                dispatch(setProgressSuccess('recipeFilter'));
            },
            error: (err) => {
                if (err.response.status !== 401) {
                    dispatch(setProgressError('recipeFilter'));
                }
            },
        };
        api.get(
            `/recipe${
                route === 'favoriten'
                    ? '/favorite'
                    : route === 'nutzer'
                    ? '/user'
                    : route === 'kleinkind'
                    ? '/baby'
                    : route === 'basis'
                    ? '/basic'
                    : ''
            }?search=${word}&type=${type}&keywords=${categories.join(
                ','
            )}&author=${author}&sort=${sort.type}&ascending=${sort.ascending}`,
            config
        )
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

export const setOpen = (bool) => (dispatch) => {
    dispatch({
        type: FILTER_OPEN,
        payload: bool,
    });
};

export const setWord = (word) => (dispatch) => {
    dispatch({
        type: SET_WORD,
        payload: word,
    });
};

export const setAuthor = (author) => (dispatch) => {
    dispatch({
        type: SET_AUTHOR,
        payload: author,
    });
};

export const setSort = (type, isAscending) => (dispatch) => {
    dispatch({
        type: SET_SORT,
        payload: {
            type: type,
            ascending: isAscending,
        },
    });
};

export const setType = (type) => (dispatch) => {
    dispatch({
        type: SET_TYPE,
        payload: type,
    });
};

export const removeCategory = (category) => (dispatch, getState) => {
    var categories = getState().recipeFilter.categories;
    categories = categories.filter((cat) => cat !== category);
    dispatch({
        type: SET_CATEGORIES,
        payload: [...categories],
    });
};

export const removeCategories = (words) => (dispatch, getState) => {
    var categories = getState().recipeFilter.categories;
    words.forEach((word) => {
        categories = categories.filter((cat) => cat !== word);
    });
    dispatch({
        type: SET_CATEGORIES,
        payload: [...categories],
    });
};

export const addCategory = (category) => (dispatch, getState) => {
    var categories = getState().recipeFilter.categories;
    categories.push(category);
    dispatch({
        type: SET_CATEGORIES,
        payload: [...categories],
    });
};

export const addCategories = (words) => (dispatch, getState) => {
    var categories = getState().recipeFilter.categories;
    words.forEach((word) => {
        if (!categories.includes(word)) {
            categories.push(word);
        }
    });
    dispatch({
        type: SET_CATEGORIES,
        payload: [...categories],
    });
};

export const setCategories = (categories) => (dispatch) => {
    dispatch({
        type: SET_CATEGORIES,
        payload: categories,
    });
};

export const resetFilterSettings = () => (dispatch) => {
    dispatch({
        type: RESET_RECIPES_FILTER,
        payload: {
            word: '',
            type: 'all',
            sort: {
                type: 'score',
                ascending: false,
            },
            author: '',
            open: false,
            categories: [],
            recipes: null,
        },
    });
};

export const setRoute = (route) => (dispatch) => {
    dispatch({
        type: SET_ROUTE,
        payload: route,
    });
};

export const setRecipesFavorite = (id) => (dispatch, getState) => {
    const config = {
        method: 'POST',
        url: `/recipe/favorite/${id}`,
        success: (res) => {
            const recipes = getState().recipeFilter.recipes;
            const index = recipes.findIndex((recipe) => recipe._id === id);
            recipes[index].favorite = true;
            dispatch({
                type: GET_RECIPES,
                payload: [...recipes],
            });
            dispatch(
                snackbarMessage(
                    `"${recipes[index].title}" wurde erfolgreich in dein Kochbuch aufgenommen.`,
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

export const deleteRecipesFavorite = (id) => (dispatch, getState) => {
    const config = {
        method: 'DELETE',
        url: `/recipe/favorite/${id}`,
        success: (res) => {
            var recipes = getState().recipeFilter.recipes;
            const index = recipes.findIndex((recipe) => recipe._id === id);
            const title = recipes[index].title;
            if (getState().recipeFilter.route === 'favoriten') {
                recipes = recipes.filter((recipe) => recipe._id !== id);
            } else {
                recipes[index].favorite = false;
            }
            dispatch({
                type: GET_RECIPES,
                payload: [...recipes],
            });
            dispatch(
                snackbarMessage(
                    `"${title}" wurde erfolgreich aus deinem Kochbuch entfernt.`,
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

export const resetRecipes = () => (dispatch) => {
    dispatch({ type: GET_RECIPES, payload: null });
};
