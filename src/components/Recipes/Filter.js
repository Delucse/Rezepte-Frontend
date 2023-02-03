import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    removeCategory,
    setAuthor,
    setCategories,
    setOpen,
} from '../../actions/recipeFilterActions';

import Categories from './Categories';
import Author from './Author';
import Button from '../Button';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';

import Icon from '@mdi/react';
import { mdiFilter } from '@mdi/js';

const drawerBleeding = 50;
const drawerBleedingOpen = drawerBleeding + 34;

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function FilterCategories() {
    const dispatch = useDispatch();

    const reduxCategories = useSelector(
        (state) => state.recipeFilter.categories
    );
    const open = useSelector((state) => state.recipeFilter.open);

    var [categories, setCategoriesState] = useState(reduxCategories);

    const addCategoryState = (category) => {
        categories.push(category);
        setCategoriesState([...categories]);
    };

    const removeCategoryState = (category) => {
        setCategoriesState(categories.filter((cat) => cat !== category));
    };

    const addCategoriesState = (words) => {
        words.forEach((word) => {
            if (!categories.includes(word)) {
                categories.push(word);
            }
        });
        setCategoriesState([...categories]);
    };

    const removeCategoriesState = (words) => {
        words.forEach((word) => {
            categories = categories.filter((cat) => cat !== word);
        });
        setCategoriesState([...categories]);
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
        <Categories
            values={categories}
            onCheckedTitle={(e) => addCategoriesState(e)}
            onUncheckedTitle={(e) => removeCategoriesState(e)}
            onCheckedValue={(e) => addCategoryState(e)}
            onUncheckedValue={(e) => removeCategoryState(e)}
        />
    );
}

function Filter() {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.recipeFilter.open);
    const recipes = useSelector((state) => state.recipeFilter.recipes);
    const categories = useSelector((state) => state.recipeFilter.categories);
    const author = useSelector((state) => state.recipeFilter.author);

    const toggle = () => {
        dispatch(setOpen(!open));
    };

    return (
        <div>
            <Button
                tooltipProps={{ title: 'Filter öffnen' }}
                sx={{
                    margin: '0 5px',
                    height: '56px',
                    minWidth: '56px',
                    padding: 0,
                    color: (theme) => theme.palette.background.default,
                }}
                variant="contained"
                onClick={toggle}
            >
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={categories.length + (author !== '' ? 1 : 0)}
                    componentsProps={{
                        badge: {
                            sx: {
                                backgroundColor: (theme) =>
                                    theme.palette.background.default,
                                color: (theme) => theme.palette.primary.main,
                                minWidth: '15px',
                                height: '15px',
                                padding: '0 3px',
                                fontSize: '10px',
                            },
                        },
                    }}
                    max={9}
                >
                    <Icon path={mdiFilter} size={1.1} />
                </Badge>
            </Button>

            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(100% - 55px - 54px - 96px - ${
                            open ? drawerBleedingOpen : drawerBleeding
                        }px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggle}
                onOpen={toggle}
                swipeAreaWidth={open ? drawerBleedingOpen : drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar - 5 }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: open ? -drawerBleedingOpen : -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        borderTop: (theme) =>
                            `1px solid ${theme.palette.primary.light}`,
                        height: `${
                            open ? drawerBleedingOpen : drawerBleeding
                        }px`,
                        background: (theme) => theme.palette.background.default,
                        backgroundImage:
                            'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
                    }}
                >
                    <Puller />
                    <Box sx={{ display: 'flex', paddingTop: '20px' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                padding: (theme) => `0 ${theme.spacing(3)}`,
                                color: 'text.secondary',
                            }}
                        >
                            {recipes
                                ? `${recipes.length} Rezept${
                                      recipes.length !== 1 ? 'e' : ''
                                  }`
                                : 'lädt ...'}
                        </Typography>
                        <Box
                            sx={{
                                pointerEvents: 'auto',
                                width: 'calc(100% - 130px)',
                                overflowY: 'hidden',
                            }}
                        >
                            <Box
                                sx={{
                                    overflowX: 'auto',
                                    overflowY: 'hidden',
                                    display: 'flex',
                                }}
                            >
                                {!open ? (
                                    <>
                                        {categories.map((category, index) => (
                                            <Chip
                                                key={index}
                                                label={category}
                                                onDelete={() =>
                                                    dispatch(
                                                        removeCategory(category)
                                                    )
                                                }
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    marginRight: '5px',
                                                    marginBottom: '10px',
                                                }}
                                            />
                                        ))}
                                        {author !== '' ? (
                                            <Chip
                                                label={author}
                                                onDelete={() =>
                                                    dispatch(setAuthor(''))
                                                }
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    marginRight: '5px',
                                                    marginBottom: '10px',
                                                }}
                                            />
                                        ) : null}
                                    </>
                                ) : null}
                            </Box>
                        </Box>
                    </Box>
                    {open ? (
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                // marginBottom: '20px',
                                padding: '10px 24px 0px 24px',
                            }}
                        >
                            Filter
                        </Typography>
                    ) : null}
                </Box>
                <Box
                    sx={{
                        padding: (theme) => `0 ${theme.spacing(3)}`,
                        overflow: 'auto',
                    }}
                >
                    <FilterCategories />
                    <Author />
                    <Box
                        sx={{
                            background: (theme) =>
                                theme.palette.background.default,
                            backgroundImage:
                                'linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))',
                            position: 'absolute',
                            bottom: 0,
                            height: (theme) => theme.spacing(3),
                            width: (theme) =>
                                `calc(100% - 2 * ${theme.spacing(3)})`,
                        }}
                    />
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default Filter;
