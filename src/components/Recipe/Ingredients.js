import React from 'react';

import { useSelector } from 'react-redux';

// import Fraction from '../../components/Fraction';

import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import Wikipedia from './Wikipedia';

function Ingredients() {
    const ingredients = useSelector((state) => state.recipe.ingredients);
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);

    const getAmount = (amount) => {
        var calculatedAmount = amount * (settings.count / portion.count);
        if (portion.volume > 0) {
            calculatedAmount =
                calculatedAmount * (settings.volume / portion.volume);
        }
        if (settings.rounded) {
            var int = amount.toString().split('.')[0];
            var decimal = amount.toString().split('.')[1];
            var intDigits =
                int && int.length === 1 ? 2 : int.length === 2 ? 1 : 0;
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
                                    {`Zutaten für ${ingredient.title}`}
                                </Typography>
                            </ListItem>
                            {ingredient.food.map((food, index) => {
                                return (
                                    <ListItem
                                        disablePadding
                                        key={index}
                                        sx={{ alignItems: 'start' }}
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
                                                    {getAmount(food.amount)}
                                                </Typography>
                                            ) : null}
                                            {food.unit !== ' ' ? (
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                    sx={{ marginRight: '4px' }}
                                                >
                                                    {food.unit}
                                                </Typography>
                                            ) : null}
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                {food.aliment}
                                            </Typography>
                                            <Wikipedia info={food.aliment} />
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
