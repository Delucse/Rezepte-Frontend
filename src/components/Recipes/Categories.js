import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
    setCategories,
    addCategory,
    removeCategory,
} from '../../actions/recipeFilterActions';

import {
    Grid,
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@mui/material';

function Categories(props) {
    const dispatch = useDispatch();
    const reduxCategories = useSelector(
        (state) => state.recipeFilter.categories
    );
    const open = useSelector((state) => state.recipeFilter.open);
    const [categories, setCategoriesState] = useState(reduxCategories);

    const addCategoryState = (category) => {
        categories.push(category);
        setCategoriesState([...categories]);
    };

    const removeCategoryState = (category) => {
        setCategoriesState(categories.filter((cat) => cat !== category));
    };

    const handleChangeState = (e) => {
        if (e.target.checked) {
            addCategoryState(e.target.value);
        } else {
            removeCategoryState(e.target.value);
        }
    };

    const handleChangeRedux = (e) => {
        if (e.target.checked) {
            dispatch(addCategory(e.target.value));
        } else {
            dispatch(removeCategory(e.target.value));
        }
    };

    useEffect(() => {
        if (open) {
            setCategoriesState(reduxCategories);
        } else {
            dispatch(setCategories(categories));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <div>
            <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginBottom: '20px' }}
            >
                Filter
            </Typography>
            <Grid container spacing={3}>
                {[
                    {
                        title: 'Lebensmittel',
                        items: [
                            'vegan',
                            'vegetarisch',
                            'glutenfrei',
                            'laktosefrei',
                        ],
                    },
                    {
                        title: 'Gericht',
                        items: [
                            'Aperitif',
                            'Vorspeise',
                            'Hauptgang',
                            'Dessert',
                            'Frühstück',
                            'Kaffeetrinken',
                        ],
                    },
                    {
                        title: 'Saison',
                        items: ['Frühling', 'Sommer', 'Herbst', 'Winter'],
                    },
                    { title: 'Wärmegrad', items: ['kalt', 'lauwarm', 'heiß'] },
                ].map((category, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <Typography variant="body1">
                            {category.title}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {category.items.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    label={item}
                                    control={
                                        <Checkbox
                                            checked={
                                                props.redux
                                                    ? reduxCategories.includes(
                                                          item.toLowerCase()
                                                      )
                                                    : categories.includes(item)
                                            }
                                            value={item}
                                            onChange={
                                                props.redux
                                                    ? handleChangeRedux
                                                    : handleChangeState
                                            }
                                            disableRipple
                                        />
                                    }
                                />
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Categories;
