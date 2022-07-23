import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Fraction from '../../components/Fraction';

import {
    Grid,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Typography,
    IconButton,
} from '@mui/material';
import Wikipedia from './Wikipedia';

function Ingredients() {
    const ingredients = useSelector((state) => state.recipe.ingredients);
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);

    return (
        <Grid container spacing={0}>
            {ingredients.map((ingredient, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        sx={{ marginBottom: '24px' }}
                    >
                        <List sx={{ lineHeight: '24px', padding: 0 }}>
                            <ListItem disablePadding>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 700,
                                        color: (theme) =>
                                            theme.palette.text.primary,
                                    }}
                                >
                                    {`Zutaten für ${ingredient.title}`}
                                </Typography>
                            </ListItem>
                            {ingredient.food.map((food, index) => {
                                return (
                                    <ListItem disablePadding key={index}>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: '25px',
                                                color: (theme) =>
                                                    theme.palette.text.primary,
                                            }}
                                        >
                                            -
                                        </ListItemIcon>
                                        {food.amount > 0 ? (
                                            <ListItemIcon
                                                id="amount"
                                                sx={{
                                                    minWidth: '0px',
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                    marginRight: '4px',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    {portion.volume > 0 ? (
                                                        <Fraction
                                                            decimal={
                                                                food.amount *
                                                                (settings.count /
                                                                    portion.count) *
                                                                (settings.volume /
                                                                    portion.volume)
                                                            }
                                                        />
                                                    ) : (
                                                        <Fraction
                                                            decimal={
                                                                food.amount *
                                                                (settings.count /
                                                                    portion.count)
                                                            }
                                                        />
                                                    )}
                                                </Typography>
                                            </ListItemIcon>
                                        ) : null}
                                        {food.unit !== ' ' ? (
                                            <ListItemIcon
                                                id="unit"
                                                sx={{
                                                    minWidth: '0px',
                                                    color: (theme) =>
                                                        theme.palette.text
                                                            .primary,
                                                    marginRight: '4px',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    {food.unit}
                                                </Typography>
                                            </ListItemIcon>
                                        ) : null}
                                        <ListItemIcon
                                            id="aliment"
                                            sx={{
                                                minWidth: '0px',
                                                color: (theme) =>
                                                    theme.palette.text.primary,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                {food.aliment}
                                            </Typography>
                                            <Wikipedia info={food.aliment} />
                                        </ListItemIcon>
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
