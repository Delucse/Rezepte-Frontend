import {
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
    SET_RECIPE_FORMULAR_UPLOADED,
    SET_SAVED_RECIPE_FORMULAR,
    SET_ACTIVE_STEP,
} from '../actions/types';

import {
    singularUnitsDictionary,
    pluralUnitsDictionary,
    singularAlimentsDictionary,
    pluralAlimentsDictionary,
    singularUnitsAlimentDictionary,
    pluralUnitsAlimentDictionary,
} from '../data/dictionaries';

import api from '../axiosInstance';

import { setRecipeId } from './recipeActions';
import { setRoute } from './recipeFilterActions';
import { alertErrorMessage, snackbarMessage } from './messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from './progressActions';
import { resetSaveRecipeFormular } from './savedRecipeFormularActions';

export const setActiveStep = (step) => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_STEP,
        payload: step,
    });
};

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
            if (value.trim() === '') {
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
        case 'keywords':
            error[key] = value.length < 3;
            break;
        case 'steps':
            var errSteps = false;
            value.forEach((val) => {
                if (val.trim() === '') {
                    errSteps = true;
                }
            });
            error[key] = errSteps;
            break;
        case 'portion':
            if (
                !value.count ||
                (value.count &&
                    (isNaN(value.count.toString().replace(',', '.')) ||
                        parseInt(value.count.toString().replace(',', '.')) !==
                            Number(value.count.toString().replace(',', '.')) ||
                        value.count.toString().replace(',', '.') < 1)) ||
                (value.form &&
                    (isNaN(value.form[0].toString().replace(',', '.')) ||
                        value.form[0].toString().replace(',', '.') <= 0)) ||
                (value.form &&
                    value.form.length === 2 &&
                    (isNaN(value.form[1].toString().replace(',', '.')) ||
                        value.form[1].toString().replace(',', '.') <= 0)) ||
                (value.art !== null && value.art.trim() === '')
            ) {
                error[key] = true;
            } else {
                error[key] = false;
            }
            break;
        case 'ingredients':
            var errIngredients = value.map((val) => {
                if (val.title && val.title.trim() === '') {
                    return true;
                }
                if (
                    val.food.filter(
                        (f) =>
                            isFoodAmountError(f.amount) ||
                            f.unit === '' ||
                            f.aliment.trim() === ''
                    ).length > 0
                ) {
                    return true;
                }
                return false;
            });
            error[key] = errIngredients;
            break;
        case 'pictures':
            error[key] = value.new.length > 0 && !value.confirmed;
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

export const setRecipePortion = (count, form, art) => (dispatch, getState) => {
    var payload = { count };
    if (form) {
        payload.form = form;
    }
    if (art !== undefined) {
        payload.art = art;
    }
    dispatch({
        type: SET_RECIPE_PORTION,
        payload: payload,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('portion', payload));
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

export const addRecipeKeyword = (word) => (dispatch, getState) => {
    var keywords = getState().recipeFormular.keywords;
    if (!keywords.includes(word)) {
        keywords.push(word);
    }
    dispatch({
        type: ADD_RECIPE_KEYWORDS,
        payload: [...keywords],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('keywords', keywords));
    }
};

export const addRecipeKeywords = (words) => (dispatch, getState) => {
    var keywords = getState().recipeFormular.keywords;
    words.forEach((word) => {
        if (!keywords.includes(word)) {
            keywords.push(word);
        }
    });
    dispatch({
        type: ADD_RECIPE_KEYWORDS,
        payload: [...keywords],
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
        payload: [...keywords],
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('keywords', keywords));
    }
};

export const removeRecipeKeywords = (words) => (dispatch, getState) => {
    var keywords = getState().recipeFormular.keywords;
    words.forEach((word) => {
        keywords = keywords.filter((keyword) => keyword !== word);
    });
    dispatch({
        type: REMOVE_RECIPE_KEYWORDS,
        payload: [...keywords],
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

        var currentAmount =
            ingredients[ingredientsIndex].food[foodIndex].amount;
        if (currentAmount === ' ') {
            currentAmount = 0;
        } else if (typeof currentAmount === 'string') {
            const amountDecimal = currentAmount.replace(',', '.');
            currentAmount = Number(amountDecimal);
        }
        var newAmount = amount;
        if (newAmount === ' ') {
            newAmount = 0;
        } else if (typeof newAmount === 'string') {
            const amountDecimal = newAmount.replace(',', '.');
            newAmount = Number(amountDecimal);
        }

        const unit = ingredients[ingredientsIndex].food[foodIndex].unit;
        const aliment = ingredients[ingredientsIndex].food[foodIndex].aliment;
        if (
            (currentAmount > 1 || (currentAmount > 0 && currentAmount < 1)) &&
            (newAmount === 1 || newAmount === 0)
        ) {
            if (pluralUnitsDictionary[unit]) {
                ingredients[ingredientsIndex].food[foodIndex].unit =
                    pluralUnitsDictionary[unit];
            }
            const pluralInfo = pluralUnitsAlimentDictionary[unit];
            if (!pluralInfo) {
                if (pluralAlimentsDictionary[aliment]) {
                    ingredients[ingredientsIndex].food[foodIndex].aliment =
                        pluralAlimentsDictionary[aliment];
                }
            }
        } else if (
            (currentAmount === 1 || currentAmount === 0) &&
            (newAmount > 1 || (newAmount > 0 && newAmount < 1))
        ) {
            if (singularUnitsDictionary[unit]) {
                ingredients[ingredientsIndex].food[foodIndex].unit =
                    singularUnitsDictionary[unit];
            }
            const singularInfo = singularUnitsAlimentDictionary[unit];
            if (!singularInfo) {
                if (singularAlimentsDictionary[aliment]) {
                    ingredients[ingredientsIndex].food[foodIndex].aliment =
                        singularAlimentsDictionary[aliment];
                }
            }
        }
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
        const aliment = ingredients[ingredientsIndex].food[foodIndex].aliment;
        var amount = ingredients[ingredientsIndex].food[foodIndex].amount;
        if (amount === ' ') {
            amount = 0;
        } else if (typeof amount === 'string') {
            const amountDecimal = amount.replace(',', '.');
            amount = Number(amountDecimal);
        }
        if (amount === 1 || amount === 0) {
            const singularInfo = singularUnitsAlimentDictionary[unit];
            if (singularInfo) {
                if (singularInfo === 'singular') {
                    if (pluralAlimentsDictionary[aliment]) {
                        ingredients[ingredientsIndex].food[foodIndex].aliment =
                            pluralAlimentsDictionary[aliment];
                    }
                } else {
                    if (singularAlimentsDictionary[aliment]) {
                        ingredients[ingredientsIndex].food[foodIndex].aliment =
                            singularAlimentsDictionary[aliment];
                    }
                }
            } else {
                if (pluralAlimentsDictionary[aliment]) {
                    ingredients[ingredientsIndex].food[foodIndex].aliment =
                        pluralAlimentsDictionary[aliment];
                }
            }
        } else {
            const pluralInfo = pluralUnitsAlimentDictionary[unit];
            if (pluralInfo) {
                if (pluralInfo === 'singular') {
                    if (pluralAlimentsDictionary[aliment]) {
                        ingredients[ingredientsIndex].food[foodIndex].aliment =
                            pluralAlimentsDictionary[aliment];
                    }
                } else {
                    if (singularAlimentsDictionary[aliment]) {
                        ingredients[ingredientsIndex].food[foodIndex].aliment =
                            singularAlimentsDictionary[aliment];
                    }
                }
            } else {
                if (singularAlimentsDictionary[aliment]) {
                    ingredients[ingredientsIndex].food[foodIndex].aliment =
                        singularAlimentsDictionary[aliment];
                }
            }
        }
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
    ingredients[0].title = '';
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
    if (ingredients.length === 1) {
        delete ingredients[0].title;
    }
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
        pictures.confirmed = false;
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
        dispatch(setError('pictures', pictures));
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
    if (pictures.new.length === 0) {
        pictures.confirmed = false;
    }
    dispatch({
        type: SET_RECIPE_PICTURES,
        payload: pictures,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('pictures', pictures));
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

export const confirmPicture = (confirmed) => (dispatch, getState) => {
    const pictures = getState().recipeFormular.pictures;
    pictures.confirmed = confirmed;
    dispatch({
        type: SET_RECIPE_PICTURES,
        payload: pictures,
    });
    if (getState().recipeFormular.error.submit) {
        dispatch(setError('pictures', pictures));
    }
};

export const checkRecipeError = () => (dispatch, getState) => {
    const { title, portion, time, keywords, ingredients, steps, pictures } =
        getState().recipeFormular;
    dispatch(setError('title', title));
    dispatch(setError('portion', portion));
    dispatch(setError('time', time));
    dispatch(setError('keywords', keywords));
    dispatch(setError('ingredients', ingredients));
    dispatch(setError('steps', steps));
    dispatch(setError('pictures', pictures));
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
        if (value !== null) {
            if (typeof value === 'object') {
                formData = objectToFormData(data[key], formData, newkey);
            } else {
                formData.append(newkey, value);
            }
        }
    });
    return formData;
};

export const submitRecipe = () => (dispatch, getState) => {
    dispatch(setProgress('recipeFormular'));
    var { id, title, portion, time, keywords, steps, pictures } =
        getState().recipeFormular;

    if (portion.form) {
        portion.form = portion.form.map((f) =>
            Number(f.toString().replace(',', '.'))
        );
    }
    if (portion.art) {
        portion.art = portion.art.trim();
    }

    var data = {
        title: title.trim(),
        portion,
        time,
        keywords,
        ingredients: getState().recipe.ingredients.map((i) => {
            if (i.title) {
                i.title = i.title.trim();
            }
            i.food = i.food.map((f) => {
                f.aliment = f.aliment.trim();
                return f;
            });
            return i;
        }),
        steps: steps.map((s) => s.trim()),
    };
    if (getState().savedRecipeFormular.id) {
        data.prototype = getState().savedRecipeFormular.id;
    }
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
        url: `/recipe${id ? `/${id}` : ''}`,
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
            dispatch(resetSaveRecipeFormular());
            dispatch(
                snackbarMessage(
                    `Dein Rezept "${title}" wurde erfolgreich ${
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

    api(config)
        .then((res) => {
            res.config.success(res);
        })
        .catch((err) => {
            err.config.error(err);
        });
};

export const resetRecipeFormular = () => (dispatch) => {
    dispatch({
        type: SET_RECIPE_FORMULAR,
        payload: {
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
        id,
        title,
        portion,
        time,
        keywords,
        ingredients,
        steps,
        pictures,
        prototype,
    } = getState().recipe;

    const orderPicture = [];
    pictures.forEach((pic) =>
        orderPicture.push({
            id: pic._id,
            url: pic.file,
            user: pic.user,
            date: pic.date,
        })
    );
    if (!portion.art && !portion.form) {
        portion.art = null;
    }
    dispatch({
        type: SET_SAVED_RECIPE_FORMULAR,
        payload: {
            id: prototype,
            recipe: id,
            title,
            portion,
            time,
            keywords,
            ingredients,
            steps,
        },
    });
    dispatch({
        type: SET_RECIPE_FORMULAR,
        payload: {
            id,
            title,
            portion,
            time,
            keywords,
            ingredients,
            steps,
            pictures: {
                confirmed: false,
                new: [],
                removed: [],
                order: orderPicture,
            },
            error: {
                submit: false,
                title: false,
                portion: false,
                keywords: false,
                ingredients: ingredients.map((i) => false),
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
