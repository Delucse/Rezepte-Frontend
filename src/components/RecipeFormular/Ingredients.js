import React from 'react';

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
} from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Autocomplete from '../Autocomplete';
import Alert from '../Alert';

import Icon from '@mdi/react';
import {
    mdiFoodVariant,
    mdiDelete,
    mdiChevronUp,
    mdiChevronDown,
    mdiPlus,
    mdiTextShadow,
} from '@mdi/js';

import { Button, Box } from '@mui/material';

import units from '../../data/units.json';
import aliments from '../../data/aliments.json';

function Title(props) {
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', width: '60%' }}>
            <div
                style={{ display: 'grid', marginRight: '5px', height: '56px' }}
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronDown} size={1} />
                </Button>
            </div>
            <Textfield
                value={props.title}
                onChange={(e) =>
                    dispatch(
                        changeIngredientsTitle(props.iIndex, e.target.value)
                    )
                }
                error={props.title === '' && props.error}
                margin
                label="Titel"
                start={<Icon path={mdiTextShadow} size={1} />}
            />
            <Button
                disabled={props.length === 1}
                onClick={() => dispatch(removeIngredients(props.iIndex))}
                sx={{
                    height: '56px',
                    marginLeft: '5px',
                    borderRadius: 0,
                    minWidth: '23px',
                    boxShadow: 'none',
                    padding: '0px',
                }}
                variant="outlined"
            >
                <Icon path={mdiDelete} size={1} />
            </Button>
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                            options={units}
                            optionLabel={'unit'}
                            optionGroup={'group'}
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
                        options={aliments}
                        optionLabel={'aliment'}
                        label="Zutat"
                        fullWidth
                        onChange={setAliment}
                        freeSolo
                        error={props.aliment === '' && props.error}
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
                    borderRadius: 0,
                    minWidth: '23px',
                    boxShadow: 'none',
                    padding: '0px',
                }}
                variant="outlined"
            >
                <Icon path={mdiDelete} size={1} />
            </Button>
        </div>
    );
}

function Ingredients() {
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
                        background: 'white',
                        zIndex: 2,
                    }}
                >
                    <Alert
                        error
                        message={
                            'Es muss mindestens eine ausgefüllte Zutatenliste geben. Überflüssige Listen und Zutaten bitte löschen.'
                        }
                    />
                </Box>
            ) : null}
            <div style={{ marginTop: '10px' }} />
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
                        <Title
                            key={iIndex}
                            iIndex={iIndex}
                            title={ingredient.title}
                            length={ingredients.length}
                            error={errorIngredients[iIndex]}
                        />
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
                            width: '40%',
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

export default Ingredients;
