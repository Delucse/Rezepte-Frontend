import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    isFoodAmountError,
    changeIngredientsTitle,
    changeIngredientsPosition,
    addIngredients,
    changeAmount,
    changeUnit,
    changeAliment,
    addFood,
    removeFood,
    changeFoodPosition,
    removeIngredients,
    addOtherIngredients,
    addOtherFood,
} from '../../actions/recipeFormularActions';
import { alertErrorMessage, resetMessage } from '../../actions/messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from '../../actions/progressActions';

import Tape from '../Tape';
import Ripped from '../Recipes/Ripped';
import Portion from '../Recipe/Portion';
import Ingredients from '../Recipe/Ingredients';
import Textfield from '../Textfield';
import Autocomplete from '../Autocomplete';
import Alert from '../Alert';
import Button from '../Button';
import Dialog from '../Dialog';

import { Box, Typography } from '@mui/material';

import Icon from '@mdi/react';
import {
    mdiFoodVariant,
    mdiDelete,
    mdiChevronUp,
    mdiChevronDown,
    mdiPlus,
    mdiTextShadow,
    mdiPlaylistEdit,
} from '@mdi/js';

import api from '../../axiosInstance';

import {
    singularUnits,
    pluralUnits,
    singularAliments,
    pluralAliments,
    singularUnitsAlimentDictionary,
    pluralUnitsAlimentDictionary,
} from '../../helpers/dictionaries';
import {
    getAmount,
    getUnit,
    getAliment,
    getUnitFromDescription,
} from '../../helpers/portion';

function Title(props) {
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', width: '60%' }}>
            <div
                style={{
                    display: 'grid',
                    marginRight: '5px',
                    height: '56px',
                    marginBottom: props.length === 1 ? '20px' : null,
                }}
            >
                <Button
                    onClick={() =>
                        dispatch(
                            changeIngredientsPosition(
                                props.iIndex,
                                props.iIndex - 1
                            )
                        )
                    }
                    disabled={props.iIndex === 0}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronUp} size={1} />
                </Button>
                <Button
                    onClick={() => dispatch(addIngredients(props.iIndex))}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiPlus} size={0.7} />
                </Button>
                <Button
                    onClick={() =>
                        dispatch(
                            changeIngredientsPosition(
                                props.iIndex,
                                props.iIndex + 1
                            )
                        )
                    }
                    disabled={props.length - 1 === props.iIndex}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronDown} size={1} />
                </Button>
            </div>
            {props.length > 1 ? (
                <div style={{ display: 'flex', width: '100%' }}>
                    <Textfield
                        value={props.title}
                        onChange={(e) =>
                            dispatch(
                                changeIngredientsTitle(
                                    props.iIndex,
                                    e.target.value
                                )
                            )
                        }
                        error={props.title.trim() === '' && props.error}
                        margin
                        label="Titel"
                        start={<Icon path={mdiTextShadow} size={1} />}
                    />

                    <Button
                        disabled={props.length === 1}
                        onClick={() =>
                            dispatch(removeIngredients(props.iIndex))
                        }
                        sx={{
                            height: '56px',
                            marginLeft: '5px',
                            minWidth: '23px',
                            padding: '0px',
                        }}
                        variant="outlined"
                    >
                        <Icon path={mdiDelete} size={1} />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

function Food(props) {
    const dispatch = useDispatch();

    const setUnit = (unit) => {
        if (unit) {
            dispatch(changeUnit(props.iIndex, props.fIndex, unit));
        } else {
            dispatch(changeUnit(props.iIndex, props.fIndex, ''));
        }
    };
    const setAliment = (aliment) => {
        if (aliment) {
            dispatch(changeAliment(props.iIndex, props.fIndex, aliment));
        } else {
            dispatch(changeAliment(props.iIndex, props.fIndex, ''));
        }
    };

    var amountDecimal = props.amount;
    if (amountDecimal === ' ') {
        amountDecimal = 0;
    } else if (typeof amountDecimal === 'string') {
        const decimal = amountDecimal.replace(',', '.');
        amountDecimal = Number(decimal);
    }

    return (
        <div
            style={{
                display: 'flex',
                marginLeft: '5%',
                marginRight: '5%',
                marginBottom: props.length - 1 === props.fIndex ? 0 : '10px',
            }}
        >
            <div style={{ display: 'grid', marginRight: '5px' }}>
                <Button
                    onClick={() =>
                        dispatch(
                            changeFoodPosition(
                                props.iIndex,
                                props.fIndex,
                                props.fIndex - 1
                            )
                        )
                    }
                    disabled={props.fIndex === 0}
                    sx={{
                        height: { xs: 'inherit', sm: 'calc(56px/3)' },
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronUp} size={1} />
                </Button>
                <Button
                    onClick={() =>
                        dispatch(addFood(props.iIndex, props.fIndex))
                    }
                    sx={{
                        height: { xs: 'inherit', sm: 'calc(56px/3)' },
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiPlus} size={0.7} />
                </Button>
                <Button
                    onClick={() =>
                        dispatch(
                            changeFoodPosition(
                                props.iIndex,
                                props.fIndex,
                                props.fIndex + 1
                            )
                        )
                    }
                    disabled={props.length - 1 === props.fIndex}
                    sx={{
                        height: { xs: 'inherit', sm: 'calc(56px/3)' },
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronDown} size={1} />
                </Button>
            </div>
            <Box sx={{ width: '100%', display: { xs: 'inline', sm: 'flex' } }}>
                <Box sx={{ width: { xs: '100%', sm: '50%' }, display: 'flex' }}>
                    <div style={{ width: '40%', marginRight: '5px' }}>
                        <Textfield
                            value={
                                props.amount === 0
                                    ? ' '
                                    : props.amount.toString().replace('.', ',')
                            }
                            onChange={(e) =>
                                dispatch(
                                    changeAmount(
                                        props.iIndex,
                                        props.fIndex,
                                        e.target.value
                                    )
                                )
                            }
                            error={
                                isFoodAmountError(props.amount) && props.error
                            }
                            label="Menge"
                        />
                    </div>
                    <Box
                        sx={{ width: '60%', marginRight: { xs: 0, sm: '5px' } }}
                    >
                        <Autocomplete
                            value={props.unit}
                            options={
                                amountDecimal === 1 || amountDecimal === 0
                                    ? singularUnits
                                    : pluralUnits
                            }
                            optionLabel={'description'}
                            optionGroup={'group'}
                            optionChange={'unit'}
                            label="Einheit"
                            fullWidth
                            onChange={setUnit}
                            freeSolo
                            error={props.unit === '' && props.error}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                        marginTop: { xs: '10px', sm: 0 },
                    }}
                >
                    <Autocomplete
                        value={props.aliment}
                        options={
                            amountDecimal === 1 || amountDecimal === 0
                                ? singularUnitsAlimentDictionary[props.unit]
                                    ? singularUnitsAlimentDictionary[
                                          props.unit
                                      ] === 'singular'
                                        ? singularAliments
                                        : pluralAliments
                                    : singularAliments
                                : pluralUnitsAlimentDictionary[props.unit]
                                ? pluralUnitsAlimentDictionary[props.unit] ===
                                  'singular'
                                    ? singularAliments
                                    : pluralAliments
                                : pluralAliments
                        }
                        optionLabel={'aliment'}
                        optionGroup={'group'}
                        label="Lebensmittel"
                        fullWidth
                        onChange={setAliment}
                        freeSolo
                        error={props.aliment.trim() === '' && props.error}
                        start={<Icon path={mdiFoodVariant} size={1} />}
                    />
                </Box>
            </Box>
            <Button
                disabled={props.length === 1}
                onClick={() => dispatch(removeFood(props.iIndex, props.fIndex))}
                sx={{
                    height: { xs: 'inherit', sm: '56px' },
                    marginLeft: '5px',
                    minWidth: '23px',
                    padding: '0px',
                }}
                variant="outlined"
            >
                <Icon path={mdiDelete} size={1} />
            </Button>
        </div>
    );
}

function ExistingIngredients() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [portion, setPortion] = useState({});
    const [settings, setSettings] = useState({});

    const recipesLoading = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'recipesLoading'
    );
    const ingredientsLoading = useSelector(
        (state) =>
            state.progress.loading &&
            state.progress.type === 'ingredientsLoading'
    );

    useEffect(() => {
        if (open && recipes.length === 0) {
            getRecipes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, recipes]);

    useEffect(() => {
        if (!open) {
            setIngredients([]);
            setPortion({});
            setSettings({});
            dispatch(setProgressSuccess('recipesLoading'));
            dispatch(setProgressSuccess('ingredientsLoading'));
            dispatch(resetMessage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const toggleDialog = () => {
        setOpen(!open);
    };

    const getRecipes = () => {
        dispatch(setProgress('recipesLoading'));
        const config = {
            success: (res) => {
                setRecipes(res.data);
                dispatch(setProgressSuccess('recipesLoading'));
            },
            error: (err) => {
                dispatch(
                    alertErrorMessage(
                        'Server ist zurzeit nicht erreichbar.',
                        'recipesLoading'
                    )
                );
                dispatch(setProgressError('recipesLoading'));
            },
        };
        api.get(`/recipe?sort=title&ascending=true`, config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                if (err.config) {
                    err.config.error(err);
                } else {
                    config.error();
                }
            });
    };

    const getRecipe = (id) => {
        if (id) {
            dispatch(setProgress('ingredientsLoading'));
            dispatch(resetMessage());
            const config = {
                success: (res) => {
                    setIngredients(res.data.ingredients);
                    setPortion(res.data.portion);
                    setSettings({ ...res.data.portion });
                    dispatch(setProgressSuccess('ingredientsLoading'));
                },
                error: (err) => {
                    setIngredients([]);
                    dispatch(
                        alertErrorMessage(
                            'Server ist zurzeit nicht erreichbar.',
                            'ingredientsLoading'
                        )
                    );
                    dispatch(setProgressError('ingredientsLoading'));
                },
            };
            api.get(`/recipe/${id}`, config)
                .then((res) => {
                    res.config.success(res);
                })
                .catch((err) => {
                    if (err.config) {
                        err.config.error(err);
                    } else {
                        config.error();
                    }
                });
        } else {
            setIngredients([]);
            setPortion({});
            setSettings({});
        }
    };

    const submit = () => {
        var calculatedIngredients = ingredients.map((i) => {
            var calculatedFood = i.food.map((f) => {
                f.amount = getAmount(f.amount, portion, settings).replace(
                    '.',
                    ''
                );
                f.unit = getUnit(f.amount, f.unit);
                f.aliment = getAliment(f.amount, f.unit, f.aliment);
                return f;
            });
            i.food = calculatedFood;
            return i;
        });
        dispatch(addOtherIngredients(calculatedIngredients));
        toggleDialog();
    };

    return (
        <>
            <Typography
                sx={{
                    fontStyle: 'italic',
                    color: (theme) => theme.palette.text.primary,
                    marginBottom: '20px',
                }}
            >
                Zutaten aus bestehendem Rezept{' '}
                <Box
                    onClick={toggleDialog}
                    sx={{
                        display: 'inline',
                        cursor: 'pointer',
                        color: (theme) => theme.palette.primary.main,
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    hinzufügen
                </Box>
                .
            </Typography>

            <Dialog
                open={open}
                onClose={toggleDialog}
                closeIcon
                title={'Zutaten aus bestehendem Rezept hinzufügen'}
                fullWidth
                content={
                    <div>
                        <Alert
                            type={'recipesLoading'}
                            style={{ marginBottom: '20px' }}
                        />
                        <Alert
                            type={'ingredientsLoading'}
                            style={{ marginBottom: '20px' }}
                        />
                        <Autocomplete
                            disabled={ingredientsLoading}
                            loading={recipesLoading}
                            options={recipes}
                            optionLabel={'title'}
                            optionChange={'_id'}
                            label="Rezept wählen"
                            fullWidth
                            onChange={(id) => getRecipe(id)}
                            style={{ marginTop: '5px' }}
                        />
                        {ingredientsLoading ? (
                            <Box sx={{ marginTop: '20px' }}>
                                Zutaten werden geladen ...
                            </Box>
                        ) : ingredients && ingredients.length > 0 ? (
                            <div
                                style={{
                                    position: 'relative',
                                    marginTop: '20px',
                                }}
                            >
                                <Typography sx={{ fontStyle: 'italic' }}>
                                    <Portion
                                        portion={portion}
                                        settings={settings}
                                        onSubmit={(number, form) => {
                                            setSettings({
                                                count: number,
                                                form: form,
                                            });
                                        }}
                                        start="Alle angezeigten Zutaten beziehen sich auf "
                                        end=" und können bei Übernahme im Anschluss noch
                                        beliebig verändert oder gelöscht werden."
                                    />
                                </Typography>
                                <Tape
                                    rotate={
                                        Math.floor(
                                            Math.random() * (10 - -10 + 1)
                                        ) + -10
                                    }
                                    top
                                />
                                <Box sx={{ position: 'relative' }}>
                                    <Ripped />
                                </Box>
                                <Box
                                    sx={{
                                        height: 'inherit',
                                        margin: 0,
                                        background: (theme) =>
                                            theme.palette.action.hover,
                                        boxShadow: (theme) =>
                                            `0 4px 4px ${theme.palette.action.disabled}`, // original: hsla(0,0%,0%,.25)
                                        position: 'relative',
                                        backgroundImage: (theme) =>
                                            `radial-gradient(transparent 21%, transparent 21%), radial-gradient(transparent 10%, transparent 12%), linear-gradient(to top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,0) 95%, ${`${theme.palette.primary.light}33`} 95%, ${`${theme.palette.primary.light}33`} 100%)`,
                                        backgroundPosition:
                                            '0px 6px, 6px 5px, 50% 18px',
                                        backgroundRepeat:
                                            'repeat-y, repeat-y, repeat',
                                        backgroundSize:
                                            '48px 48px, 48px 48px, 24px 24px',
                                        paddingLeft: '24px',
                                        marginTop: '24px',
                                        paddingBottom: '6px',
                                    }}
                                >
                                    <Box sx={{ marginTop: '-10px' }}>
                                        <Ingredients
                                            ingredients={ingredients}
                                            portion={portion}
                                            settings={settings}
                                        />
                                    </Box>
                                </Box>
                            </div>
                        ) : null}
                    </div>
                }
                actions={
                    <div style={{ paddingTop: '16px' }}>
                        <Button
                            variant="outlined"
                            onClick={toggleDialog}
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button variant="contained" onClick={submit}>
                            Zutaten übernehmen
                        </Button>
                    </div>
                }
            />
        </>
    );
}

function DetectedFood({ index }) {
    const dispatch = useDispatch();

    const food = useSelector(
        (state) => state.recipeFormular.ingredients[index].food
    );
    const translateFood = (food) => {
        var tFood = [];
        food.forEach((f) => {
            if (f.amount !== '' || f.unit !== '' || f.aliment !== '') {
                var note = '-  ';
                if (f.amount !== '' && f.amount !== 0) {
                    note += ` ${f.amount.toLocaleString('de-De')}`;
                }
                if (f.unit.trim() !== '') {
                    note += ` ${f.unit}`;
                }
                if (f.aliment !== '') {
                    note += ` ${f.aliment}`;
                }
                tFood.push(note);
            }
        });
        return tFood.join('\n');
    };

    const [open, setOpen] = useState(false);
    const [ingredients, setIngredients] = useState(translateFood(food));

    useEffect(() => {
        if (open) {
            setIngredients(translateFood(food));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const toggleDialog = () => {
        setOpen(!open);
    };

    const submit = () => {
        dispatch(addOtherFood(index, calculateIngredients()));
        toggleDialog();
    };

    const onChange = (e) => {
        const note = '-  ';
        var value = e.target.value.replace(/\t/g, '');
        var rows = value.split('\n').map((r) => {
            if (r.length > 1) {
                if (r[2] !== ' ') {
                    if (r[0] !== '-') {
                        r = note + r;
                    } else {
                        r = note + r.slice(2);
                    }
                }
            } else {
                r = note + r;
            }
            return r;
        });
        rows = rows.join('\n');
        setIngredients(rows);
    };

    const calculateIngredients = () => {
        var rows = ingredients.split('\n').map((r) => r.slice(3));
        rows = rows.map((row) => {
            row = row.trim().split(' ');
            var amountIndex = 0;
            var amount = 0;
            var unitIndex = 1;
            var unit = ' ';
            var alimentIndex = 2;
            var aliment = '';
            if (row[amountIndex]) {
                amount = Number(
                    row[amountIndex].replace('.', '').replace(',', '.')
                );
                if (isNaN(amount)) {
                    amount = 0;
                    unitIndex = amountIndex;
                }
            }
            if (row.length - 1 > unitIndex) {
                if (row[unitIndex]) {
                    unit = row[unitIndex];
                    while (unit[unit.length - 1] === ',') {
                        unitIndex += 1;
                        unit += ' ' + row[unitIndex];
                    }
                    unit = getUnitFromDescription(amount, unit);
                    alimentIndex = unitIndex + 1;
                }
            } else {
                alimentIndex = unitIndex;
            }
            if (row[alimentIndex]) {
                aliment = getAliment(
                    amount,
                    unit,
                    row.slice(alimentIndex).join(' ')
                );
            }
            return { amount, unit, aliment };
        });
        return rows;
    };

    return (
        <>
            <Box
                sx={{
                    padding: '0 3px',
                    zIndex: 1,
                    background: (theme) => theme.palette.background.default,
                }}
            >
                <Button
                    onClick={toggleDialog}
                    sx={{
                        height: '36px',
                        minWidth: '36px',
                        padding: '0px !important',
                        margin: '10px 0',
                        '&:hover': {
                            background: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.background.default,
                        },
                    }}
                >
                    <Icon path={mdiPlaylistEdit} size={1.2} />
                </Button>
            </Box>
            <Dialog
                open={open}
                onClose={toggleDialog}
                closeIcon
                title={'Zutaten einfügen'}
                fullWidth
                content={
                    <div>
                        <Typography
                            sx={{ fontStyle: 'italic', marginBottom: '20px' }}
                        >
                            Alle eingetragenen Zutaten werden bei Übernahme im
                            Anschluss automatisert dem jeweiligen Eingabefeld
                            zugeordnet und können noch beliebig verändert oder
                            gelöscht werden. (Es kann ggf. zu einer falschen
                            Zuordnung kommen, weshalb mitunter eine manuelle
                            Nachbearbeitung im Formular notwendig ist.)
                        </Typography>
                        <Textfield
                            autoFocus
                            value={ingredients}
                            onChange={(e) => onChange(e)}
                            multiline
                            minRows={4}
                            label="Zutaten"
                            placeholder="-  Menge Einheit Lebensmittel"
                        />
                    </div>
                }
                actions={
                    <div style={{ paddingTop: '16px' }}>
                        <Button
                            variant="outlined"
                            onClick={toggleDialog}
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button variant="contained" onClick={submit}>
                            Zutaten übernehmen
                        </Button>
                    </div>
                }
            />
        </>
    );
}

function NewIngredients() {
    const ingredients = useSelector(
        (state) => state.recipeFormular.ingredients
    );
    const errorIngredients = useSelector(
        (state) => state.recipeFormular.error.ingredients
    );

    return (
        <div style={{ marginBottom: '28px' }}>
            {errorIngredients.includes(true) ? (
                <Box
                    sx={{
                        paddingBottom: '10px',
                        position: 'sticky',
                        top: 'calc(55px + 78px + 34px)',
                        background: (theme) => theme.palette.background.default,
                        zIndex: 2,
                    }}
                >
                    <Alert
                        error
                        message={
                            <div>
                                Gib mindestens eine vollständig ausgefüllte
                                Zutatenliste an (überflüssige Listen und Zutaten
                                bitte löschen).
                                <br />
                                Beachte dabei, dass Mengenangaben ausschließlich
                                Zahlen enthalten dürfen, um später
                                sicherzustellen, dass man dein Rezept auf andere
                                Portionsgrößen umrechnen kann.
                            </div>
                        }
                    />
                </Box>
            ) : null}
            <ExistingIngredients />
            {ingredients.map((ingredient, iIndex) => (
                <div
                    key={iIndex}
                    style={{
                        position: 'relative',
                        marginTop: iIndex > 0 ? '58px' : 0,
                    }}
                >
                    {/* Eingabefelder */}
                    <div style={{ padding: '0px 10px' }}>
                        {/* Titel */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Title
                                key={iIndex}
                                iIndex={iIndex}
                                title={ingredient.title}
                                length={ingredients.length}
                                error={errorIngredients[iIndex]}
                            />
                            <DetectedFood index={iIndex} />
                        </div>
                        {/* Zutaten */}
                        {ingredient.food.map((food, fIndex) => (
                            <Food
                                key={fIndex}
                                iIndex={iIndex}
                                fIndex={fIndex}
                                length={ingredient.food.length}
                                amount={food.amount}
                                unit={food.unit}
                                aliment={food.aliment}
                                error={errorIngredients[iIndex]}
                            />
                        ))}
                    </div>
                    {/* Umrandung */}
                    <div
                        style={{
                            position: 'absolute',
                            borderLeft: '1px solid grey',
                            borderTop: '1px solid grey',
                            height: '100%',
                            top: 28,
                            left: 0,
                            width: '7px',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            borderRight: '1px solid grey',
                            height: '100%',
                            top: 28,
                            right: 0,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            borderTop: '1px solid grey',
                            top: 28,
                            right: 0,
                            width:
                                ingredients.length > 1
                                    ? '40%'
                                    : 'calc(100% - 24px - 12px)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            borderBottom: '1px solid grey',
                            height: '28px',
                            width: '100%',
                        }}
                    />
                </div>
            ))}
        </div>
    );
}

export default NewIngredients;
