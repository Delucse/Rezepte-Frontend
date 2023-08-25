import React from 'react';

import {
    getAmount,
    getUnit,
    getAliment,
    getInformationAbout,
} from '../../helpers/portion';

import Wikipedia from './Wikipedia';

import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

function Ingredients({ ingredients, portion, settings, info }) {
    return (
        <Grid container spacing={3} sx={{ marginBottom: '24px' }}>
            {ingredients.map((ingredient, index) => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <List sx={{ padding: 0 }}>
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
                                            {info && information ? (
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
