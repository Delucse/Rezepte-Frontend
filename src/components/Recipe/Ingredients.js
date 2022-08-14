import React from 'react';

import { useSelector } from 'react-redux';

import Wikipedia from './Wikipedia';

import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

import {
    singularUnitsAlimentDictionary,
    pluralUnitsAlimentDictionary,
    singularUnitsDictionary,
    pluralUnitsDictionary,
    singularAlimentsDictionary,
    pluralAlimentsDictionary,
    singularInfoDictionary,
    pluralInfoDictionary,
} from '../../data/dictionaries';

const getAmount = (amount, portion, settings) => {
    var calculatedAmount = amount * (settings.count / portion.count);
    if (portion.area > 0) {
        calculatedAmount = calculatedAmount * (settings.area / portion.area);
    }
    if (settings.rounded) {
        var int = amount.toString().split('.')[0];
        var decimal = amount.toString().split('.')[1];
        var intDigits = int && int.length === 1 ? 2 : int.length === 2 ? 1 : 0;
        var decimalDigits = decimal ? decimal.length + 1 : 0;
        return calculatedAmount.toLocaleString('de-De', {
            minimumFractionDigits: 0,
            maximumFractionDigits: Math.max(intDigits, decimalDigits),
        });
    }
    return calculatedAmount.toLocaleString('de-De', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
    });
};

const getUnit = (amount, unit) => {
    if (amount === 1 || amount === 0) {
        if (pluralUnitsDictionary[unit]) {
            return pluralUnitsDictionary[unit];
        }
    } else {
        if (singularUnitsDictionary[unit]) {
            return singularUnitsDictionary[unit];
        }
    }
    return unit;
};

const getAliment = (amount, unit, aliment) => {
    if (amount === 0) {
        return aliment;
    } else if (amount === 1) {
        const singularInfo = singularUnitsAlimentDictionary[unit];
        if (singularInfo) {
            if (singularInfo === 'singular') {
                if (pluralAlimentsDictionary[aliment]) {
                    return pluralAlimentsDictionary[aliment];
                }
            } else {
                if (singularAlimentsDictionary[aliment]) {
                    return singularAlimentsDictionary[aliment];
                }
            }
        } else {
            if (pluralAlimentsDictionary[aliment]) {
                return pluralAlimentsDictionary[aliment];
            }
        }
    } else {
        const pluralInfo = pluralUnitsAlimentDictionary[unit];
        if (pluralInfo) {
            if (pluralInfo === 'singular') {
                if (pluralAlimentsDictionary[aliment]) {
                    return pluralAlimentsDictionary[aliment];
                }
            } else {
                if (singularAlimentsDictionary[aliment]) {
                    return singularAlimentsDictionary[aliment];
                }
            }
        } else {
            if (singularAlimentsDictionary[aliment]) {
                return singularAlimentsDictionary[aliment];
            }
        }
    }
    return aliment;
};

const getInformationAbout = (amount, unit, aliment) => {
    if (amount === 0 || amount === 1) {
        const singularInfo = singularUnitsAlimentDictionary[unit];
        if (singularInfo) {
            if (singularInfo === 'singular') {
                return singularInfoDictionary[aliment];
            } else {
                return pluralInfoDictionary[aliment];
            }
        } else {
            return singularInfoDictionary[aliment];
        }
    } else {
        const pluralInfo = pluralUnitsAlimentDictionary[unit];
        if (pluralInfo) {
            if (pluralInfo === 'singular') {
                return singularInfoDictionary[aliment];
            } else {
                return pluralInfoDictionary[aliment];
            }
        } else {
            return pluralInfoDictionary[aliment];
        }
    }
};

function Ingredients() {
    const ingredients = useSelector((state) => state.recipe.ingredients);
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);

    return (
        <Grid container spacing={3}>
            {ingredients.map((ingredient, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <List sx={{ padding: 0, marginTop: '1px' }}>
                            <ListItem disablePadding>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 700,
                                        fontFamily: 'Lobster Two',
                                        fontSize: 'calc(1rem + 2px)',
                                        lineHeight: '24px',
                                        textDecoration: 'underline',
                                        textDecorationColor: (theme) =>
                                            theme.palette.primary.main,
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                    }}
                                >
                                    {`Zutaten${
                                        ingredient.title
                                            ? ` für ${ingredient.title}`
                                            : ''
                                    }`}
                                </Typography>
                            </ListItem>
                            {ingredient.food.map((food, index) => {
                                const amountString = getAmount(
                                    food.amount,
                                    portion,
                                    settings
                                );
                                const amount = Number(
                                    amountString.replace(',', '.')
                                );
                                const unit = getUnit(amount, food.unit);
                                const aliment = getAliment(
                                    amount,
                                    unit,
                                    food.aliment
                                );
                                const information = getInformationAbout(
                                    amount,
                                    unit,
                                    aliment
                                );
                                return (
                                    <ListItem
                                        disablePadding
                                        key={index}
                                        sx={{ alignItems: 'baseline' }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '25px',
                                                color: (theme) =>
                                                    theme.palette.text.primary,
                                            }}
                                        >
                                            -
                                        </ListItemIcon>
                                        <ListItemText
                                            id="aliment"
                                            sx={{
                                                margin: 0,
                                                color: (theme) =>
                                                    theme.palette.text.primary,
                                            }}
                                            primaryTypographyProps={{
                                                sx: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                },
                                            }}
                                        >
                                            {food.amount > 0 ? (
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                    sx={{ marginRight: '4px' }}
                                                >
                                                    {amountString}
                                                </Typography>
                                            ) : null}
                                            {unit !== ' ' ? (
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                    sx={{ marginRight: '4px' }}
                                                >
                                                    {unit}
                                                </Typography>
                                            ) : null}
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                {aliment}
                                            </Typography>
                                            {information ? (
                                                <Wikipedia info={information} />
                                            ) : null}
                                        </ListItemText>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default Ingredients;
