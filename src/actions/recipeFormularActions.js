import {
    SET_RECIPE_BLOCKED,
    SET_RECIPE_ERROR,
    SET_RECIPE_TITLE,
    SET_RECIPE_PORTION,
    SET_RECIPE_TIME,
    SET_RECIPE_CATEGORIES,
    ADD_RECIPE_KEYWORDS,
    REMOVE_RECIPE_KEYWORDS,
    SET_RECIPE_SOURCE,
    SET_RECIPE_INGREDIENTS,
    SET_RECIPE_STEPS,
    SET_RECIPE_PICTURES,
    SET_RECIPE_FORMULAR,
    SET_RECIPE_FORMULAR_UPLOADED,
} from '../actions/types';

import params from '../data/params.json';

import axios from 'axios';

import { setRecipeId } from './recipeActions';
import { setRoute } from './recipeFilterActions';
import { alertErrorMessage, snackbarMessage } from './messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';

export const isFoodAmountError = (amount) => {
    var amountDecimal = amount;
    if (typeof amountDecimal === 'string') {
        amountDecimal = amountDecimal.replace(',', '.');
    }
    if (!isNaN(amountDecimal) && amountDecimal >= 0) {
        return false;
    }
    return true;
};

const setError = (key, value) => (dispatch, getState) => {
    var error = getState().recipeFormular.error;
    switch (key) {
        case 'title':
        case 'source':
            if (value === '') {
                error[key] = true;
            } else {
                error[key] = false;
            }
            break;
        case 'time':
            var sum = 0;
            Object.values(value).forEach((val) => {
                sum += val;
            });
            if (sum > 0) {
                error[key] = false;
            } else {
                error[key] = true;
            }
            break;
        case 'categories':
            var errCategory = false;
            Object.values(value).forEach((val) => {
                if (val && val.length === 0) {
                    errCategory = true;
                }
            });
            error[key] = errCategory;
            break;
        case 'keywords':
        case 'pictures':
            if (value.length === 0) {
                error[key] = true;
            } else {
                error[key] = false;
            }
            break;
        case 'steps':
            var errSteps = false;
            value.forEach((val) => {
                if (val === '') {
                    errSteps = true;
                }
            });
            error[key] = errSteps;
            break;
        case 'portion':
            if (value.count < 1 || value.volume === 1) {
                error[key] = true;
            } else {
                error[key] = false;
            }
            break;
        case 'ingredients':
            var errIngredients = value.map((val) => {
                if (val.title === '') {
                    return true;
                }
                if (
                    val.food.filter(
                        (f) =>
                            isFoodAmountError(f.amount) ||
                            f.unit === '' ||
                            f.aliment === ''
                    ).length > 0
                ) {
                    return true;
                }
                return false;
            });
            error[key] = errIngredients;
            break;
        case 'submit':
            error[key] = true;
            break;
        default:
            break;
    }
    dispatch({
        type: SET_RECIPE_ERROR,
        payload: { ...error },
    });
};

export const setRecipeTitle = (title) => (dispatch, getState) => {
    dispatch({
        type: SET_RECIPE_TITLE,
        payload: title,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('title', title));
    }
};

export const setRecipePortion = (count, volume) => (dispatch, getState) => {
    dispatch({
        type: SET_RECIPE_PORTION,
        payload: { count, volume },
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('portion', { count, volume }));
    }
};

export const setRecipeSource = (source) => (dispatch, getState) => {
    dispatch({
        type: SET_RECIPE_SOURCE,
        payload: source,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('source', source));
    }
};

export const setRecipeTime = (time, type) => (dispatch, getState) => {
    var timeState = getState().recipeFormular.time;
    timeState[type] = time;
    dispatch({
        type: SET_RECIPE_TIME,
        payload: timeState,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('time', timeState));
    }
};

export const setRecipeCategories = (category, type) => (dispatch, getState) => {
    var categories = getState().recipeFormular.categories;
    if (category) {
        categories[type] = [...category];
    } else {
        categories[type] = category;
    }
    dispatch({
        type: SET_RECIPE_CATEGORIES,
        payload: { ...categories },
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('categories', categories));
    }
};

export const addRecipeKeyword = (keyword) => (dispatch, getState) => {
    var keywords = getState().recipeFormular.keywords;
    var filter = keywords.filter((key) => key === keyword);
    if (filter.length === 0) {
        keywords.push(keyword);
    }
    dispatch({
        type: ADD_RECIPE_KEYWORDS,
        payload: keywords,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('keywords', keywords));
    }
};

export const removeRecipeKeyword = (word) => (dispatch, getState) => {
    var keywords = getState().recipeFormular.keywords;
    keywords = keywords.filter((keyword) => keyword !== word);
    dispatch({
        type: REMOVE_RECIPE_KEYWORDS,
        payload: keywords,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('keywords', keywords));
    }
};

export const changeIngredientsTitle =
    (index, title) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        ingredients[index].title = title;
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const changeAmount =
    (ingredientsIndex, foodIndex, amount) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        ingredients[ingredientsIndex].food[foodIndex].amount = amount;
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const changeUnit =
    (ingredientsIndex, foodIndex, unit) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        ingredients[ingredientsIndex].food[foodIndex].unit = unit;
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const changeAliment =
    (ingredientsIndex, foodIndex, aliment) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        ingredients[ingredientsIndex].food[foodIndex].aliment = aliment;
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const addIngredients = (index) => (dispatch, getState) => {
    var ingredients = getState().recipeFormular.ingredients;
    var ingredient = {
        title: '',
        food: [
            { amount: '', unit: '', aliment: '' },
            { amount: '', unit: '', aliment: '' },
            { amount: '', unit: '', aliment: '' },
        ],
    };
    ingredients.splice(index + 1, 0, ingredient);
    dispatch({
        type: SET_RECIPE_INGREDIENTS,
        payload: [...ingredients],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('ingredients', ingredients));
    }
};

export const removeIngredients = (index) => (dispatch, getState) => {
    var ingredients = getState().recipeFormular.ingredients;
    ingredients.splice(index, 1);
    dispatch({
        type: SET_RECIPE_INGREDIENTS,
        payload: [...ingredients],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('ingredients', ingredients));
    }
};

export const changeIngredientsPosition =
    (oldIndex, newIndex) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        var ingredient = ingredients[oldIndex];
        ingredients.splice(oldIndex, 1);
        ingredients.splice(newIndex, 0, ingredient);
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
    };

export const addFood =
    (ingredientsIndex, foodIndex) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        var food = { amount: '', unit: '', aliment: '' };
        ingredients[ingredientsIndex].food.splice(foodIndex + 1, 0, food);
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const removeFood =
    (ingredientsIndex, foodIndex) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        ingredients[ingredientsIndex].food.splice(foodIndex, 1);
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
        if (getState().recipeFormular.error.submit) {
            dispatch(setError('ingredients', ingredients));
        }
    };

export const changeFoodPosition =
    (ingredientsIndex, oldIndex, newIndex) => (dispatch, getState) => {
        var ingredients = getState().recipeFormular.ingredients;
        var food = ingredients[ingredientsIndex].food[oldIndex];
        ingredients[ingredientsIndex].food.splice(oldIndex, 1);
        ingredients[ingredientsIndex].food.splice(newIndex, 0, food);
        dispatch({
            type: SET_RECIPE_INGREDIENTS,
            payload: [...ingredients],
        });
    };

export const changeStep = (index, step) => (dispatch, getState) => {
    var steps = getState().recipeFormular.steps;
    steps[index] = step;
    dispatch({
        type: SET_RECIPE_STEPS,
        payload: [...steps],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('steps', steps));
    }
};

export const addStep = (index) => (dispatch, getState) => {
    var steps = getState().recipeFormular.steps;
    var step = '';
    steps.splice(index + 1, 0, step);
    dispatch({
        type: SET_RECIPE_STEPS,
        payload: [...steps],
    });
};

export const removeStep = (index) => (dispatch, getState) => {
    var steps = getState().recipeFormular.steps;
    steps.splice(index, 1);
    dispatch({
        type: SET_RECIPE_STEPS,
        payload: [...steps],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('steps', steps));
    }
};

export const changeStepPosition =
    (oldIndex, newIndex) => (dispatch, getState) => {
        var steps = getState().recipeFormular.steps;
        var step = steps[oldIndex];
        steps.splice(oldIndex, 1);
        steps.splice(newIndex, 0, step);
        dispatch({
            type: SET_RECIPE_STEPS,
            payload: [...steps],
        });
    };

export const changePictures = (files) => (dispatch, getState) => {
    var pictures = getState().recipeFormular.pictures;
    pictures.new = [...pictures.new];
    pictures.order = [...pictures.order];
    // files is a FileList object (similar to NodeList)
    // loop through files to prevent that an image is stored twice
    for (const key of Object.keys(files)) {
        var url = URL.createObjectURL(files[key]);
        pictures.new.push({ file: files[key], url });
        pictures.order.push({
            url,
            user: getState().auth.user,
        });
    }
    dispatch({
        type: SET_RECIPE_PICTURES,
        payload: pictures,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('pictures', pictures.order));
    }
};

export const removePicture = (url) => (dispatch, getState) => {
    var pictures = getState().recipeFormular.pictures;
    const index = pictures.order.findIndex((pic) => pic.url === url);
    if (pictures.order[index].id) {
        pictures.removed.push(pictures.order[index].id);
    } else {
        pictures.new = [...pictures.new].filter((pic) => pic.url !== url);
    }
    pictures.order = pictures.order.filter((el, idx) => index !== idx);
    dispatch({
        type: SET_RECIPE_PICTURES,
        payload: pictures,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('pictures', pictures.order));
    }
};

export const changePicturePosition =
    (oldIndex, newIndex) => (dispatch, getState) => {
        const pictures = getState().recipeFormular.pictures;
        pictures.order = [...pictures.order];
        var picture = pictures.order[oldIndex];
        pictures.order.splice(oldIndex, 1);
        pictures.order.splice(newIndex, 0, picture);
        dispatch({
            type: SET_RECIPE_PICTURES,
            payload: pictures,
        });
    };

export const checkRecipeError = () => (dispatch, getState) => {
    const {
        title,
        portion,
        source,
        time,
        categories,
        keywords,
        ingredients,
        steps,
        pictures,
    } = getState().recipeFormular;
    dispatch(setError('title', title));
    dispatch(setError('portion', portion));
    dispatch(setError('source', source));
    dispatch(setError('time', time));
    dispatch(setError('categories', categories));
    dispatch(setError('keywords', keywords));
    dispatch(setError('ingredients', ingredients));
    dispatch(setError('steps', steps));
    dispatch(setError('pictures', pictures.order));
    dispatch(setError('submit'));
};

const objectToFormData = (data, formData, subkey) => {
    Object.entries(data).forEach(([key, value]) => {
        var newkey;
        if (subkey) {
            newkey = `${subkey}[${key}]`;
        } else {
            newkey = key;
        }
        if (typeof value === 'object') {
            formData = objectToFormData(data[key], formData, newkey);
        } else {
            formData.append(newkey, value);
        }
    });
    return formData;
};

export const submitRecipe = (id) => (dispatch, getState) => {
    dispatch(setProgress('recipeFormular'));
    var {
        title,
        portion,
        source,
        time,
        categories,
        keywords,
        steps,
        pictures,
    } = getState().recipeFormular;

    Object.entries(categories).forEach(([key]) => {
        if (categories[key]) {
            keywords = keywords.concat(categories[key]);
        }
    });

    var data = {
        title,
        source,
        portion,
        time,
        keywords,
        ingredients: getState().recipe.ingredients,
        steps,
    };
    if (id) {
        data.removedPictures = pictures.removed;
        data.picturesOrder = pictures.order.map((order) => order.id);
    }

    var body = new FormData();
    body = objectToFormData(data, body);

    if (pictures.new.length > 0) {
        pictures.new.forEach((pic) => {
            body.append('pictures', pic.file);
        });
    }

    const config = {
        method: id ? 'PUT' : 'POST',
        url: `${process.env.REACT_APP_API_URL}/recipe${id ? `/${id}` : ''}`,
        data: body,
        headers: {
            'Content-Type': 'multipart/form-data', // necessary to upload files
        },
        onUploadProgress: (progressEvent) => {
            // console.info('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
        },
        onDownloadProgress: (progressEvent) => {
            // console.info('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
        },
        success: (res) => {
            dispatch(setRoute('nutzer'));
            dispatch(setRecipeId(res.data.id));
            dispatch(setBlocked(false));
            dispatch(setUploaded(true));
            dispatch(resetRecipeFormular());
            dispatch(
                snackbarMessage(
                    `Das Rezept "${title}" wurde erfolgreich ${
                        id ? 'aktualisiert' : 'erstellt'
                    }.`,
                    'recipeFormular'
                )
            );
            dispatch(setProgressSuccess('recipeFormular'));
        },
        error: (err) => {
            console.error(err.message);
            if (err.response.status !== 401) {
                dispatch(
                    alertErrorMessage(
                        `Fehler: ${err.response.data.message}`,
                        'recipeFormular'
                    )
                );
                dispatch(setProgressError('recipeFormular'));
            }
        },
    };

    axios(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const resetRecipeFormular = () => (dispatch, getState) => {
    dispatch({
        type: SET_RECIPE_FORMULAR,
        payload: {
            title: '',
            portion: {
                count: 0,
                volume: -1,
            },
            source: '',
            time: {
                preparation: 0,
                resting: 0,
                baking: 0,
            },
            categories: {
                ingredients: [],
                dish: [],
                season: [],
                heat: [],
            },
            keywords: [],
            ingredients: [
                {
                    title: '',
                    food: [
                        { amount: '', unit: '', aliment: '' },
                        { amount: '', unit: '', aliment: '' },
                        { amount: '', unit: '', aliment: '' },
                    ],
                },
            ],
            steps: ['', '', ''],
            pictures: {
                new: [],
                removed: [],
                order: [],
            },
            error: {
                submit: false,
                title: false,
                portion: false,
                source: false,
                keywords: false,
                ingredients: [false, false, false],
                steps: false,
                pictures: false,
            },
        },
    });
};

export const setBlocked = (bool) => (dispatch) => {
    dispatch({
        type: SET_RECIPE_BLOCKED,
        payload: bool,
    });
};

export const setRecipeFormular = () => (dispatch, getState) => {
    const {
        title,
        portion,
        source,
        time,
        keywords,
        ingredients,
        steps,
        pictures,
    } = getState().recipe;
    const categories = {
        ingredients: [],
        dish: [],
        season: [],
        heat: [],
    };
    const otherKeywords = [];
    keywords.forEach((word) => {
        if (params.filter['Lebensmittel'].includes(word)) {
            categories.ingredients.push(word);
        } else if (params.filter['Gericht'].includes(word)) {
            categories.dish.push(word);
        } else if (params.filter['Saison'].includes(word)) {
            categories.season.push(word);
        } else if (params.filter['Wärmegrad'].includes(word)) {
            categories.heat.push(word);
        } else {
            otherKeywords.push(word);
        }
    });
    const orderPicture = [];
    pictures.forEach((pic) =>
        orderPicture.push({ id: pic._id, url: pic.file, user: pic.user })
    );
    dispatch({
        type: SET_RECIPE_FORMULAR,
        payload: {
            title,
            portion,
            source,
            time,
            categories,
            keywords: otherKeywords,
            ingredients,
            steps,
            pictures: {
                new: [],
                removed: [],
                order: orderPicture,
            },
            error: {
                submit: false,
                title: false,
                portion: false,
                source: false,
                keywords: false,
                ingredients: [false, false, false],
                steps: false,
                pictures: false,
            },
            blocked: true,
        },
    });
};

export const setUploaded = (bool) => (dispatch) => {
    dispatch({
        type: SET_RECIPE_FORMULAR_UPLOADED,
        payload: bool,
    });
};
