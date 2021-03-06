import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getRecipe, getRecipePreview } from '../actions/recipeActions';
import { setProgressError } from '../actions/progressActions';
import { setRoute } from '../actions/recipeFilterActions';
import { snackbarMessage } from '../actions/messageActions';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import NotePaper from '../components/NotePaper';
import Portion from '../components/Recipe/Portion';
import Images from '../components/Recipe/Images';
import Ingredients from '../components/Recipe/Ingredients';
import Favorite from '../components/Recipe/Favorite';
import Share from '../components/Recipe/Share';
import WakeLock from '../components/Recipe/WakeLock';
import Loader from '../components/Loader';

import params from '../data/params.json';

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

import Icon from '@mdi/react';
import {
    mdiBarleyOff,
    mdiClockOutline,
    mdiDelete,
    mdiEggOffOutline,
    mdiFoodSteakOff,
    mdiPencil,
} from '@mdi/js';

var filterParams = [];
Object.keys(params.filter).forEach((key) => {
    filterParams = filterParams.concat(params.filter[key]);
});

console.log(filterParams);

function Recipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe);
    const recipeFormular = useSelector((state) => state.recipeFormular);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector(
        (state) => state.progress.loading && state.progress.type === 'recipe'
    );
    const error = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipe'
    );
    const formular = useLocation().pathname.includes('/formular');

    useEffect(() => {
        if (id) {
            if (/^.{24}$/.test(id)) {
                if (!formular) {
                    if (id !== recipe.id || !recipeFormular.uploaded) {
                        dispatch(getRecipe(id));
                    }
                } else {
                    dispatch(getRecipePreview());
                }
            } else {
                dispatch(setProgressError('recipe'));
            }
        } else {
            dispatch(getRecipePreview());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, recipeFormular]);

    const deleteRecipe = () => {
        const config = {
            success: (res) => {
                dispatch(setRoute('nutzer'));
                navigate('/rezepte/nutzer');
                dispatch(
                    snackbarMessage(
                        `Das Rezept wurde erfolgreich gel??scht.`,
                        'recipe'
                    )
                );
            },
            error: (err) => {
                console.log(err);
            },
        };
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/recipe/${recipe.id}`,
                config
            )
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

    return !loading && !error && recipe.title ? (
        <NotePaper>
            {/* Titel */}
            <Box
                sx={{
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: '24px',
                    marginBottom: '24px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                {recipe.title}
            </Box>

            <Grid container spacing={0} sx={{ marginBottom: '24px' }}>
                <Grid item xs={12} sm={6} sx={{ height: 'calc(24px * 10)' }}>
                    <Images pictures={recipe.pictures} title={recipe.title} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        paddingLeft: { xs: 0, sm: '20px' },
                        marginTop: { xs: '24px', sm: 0 },
                    }}
                >
                    <div style={{ display: 'flex', marginBottom: '24px' }}>
                        {recipe.keywords.includes('vegetarisch') ||
                        recipe.keywords.includes('vegan') ? (
                            <Box
                                title="vegetarisch"
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.light,
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.light}`,
                                    },
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.primary.main}`,
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                    height: 'calc(24px - 1px - 1px)',
                                    width: 'calc(24px - 1px - 1px)',
                                    justifyContent: 'center',
                                    display: 'grid',
                                    alignContent: 'center',
                                }}
                            >
                                <Icon
                                    path={mdiFoodSteakOff}
                                    size={0.8}
                                    style={{ color: 'inherit' }}
                                />
                            </Box>
                        ) : null}
                        {recipe.keywords.includes('vegan') ? (
                            <Box
                                title="vegan"
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.light,
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.light}`,
                                    },
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.primary.main}`,
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                    height: 'calc(24px - 1px - 1px)',
                                    width: 'calc(24px - 1px - 1px)',
                                    justifyContent: 'center',
                                    display: 'grid',
                                    alignContent: 'center',
                                }}
                            >
                                <Icon
                                    path={mdiEggOffOutline}
                                    size={0.8}
                                    style={{ color: 'inherit' }}
                                />
                            </Box>
                        ) : null}
                        {recipe.keywords.includes('glutenfrei') ? (
                            <Box
                                title="glutenfrei"
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.light,
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.light}`,
                                    },
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.primary.main}`,
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                    height: 'calc(24px - 1px - 1px)',
                                    width: 'calc(24px - 1px - 1px)',
                                    justifyContent: 'center',
                                    display: 'grid',
                                    alignContent: 'center',
                                }}
                            >
                                <Icon
                                    path={mdiBarleyOff}
                                    size={0.8}
                                    style={{ color: 'inherit' }}
                                />
                            </Box>
                        ) : null}
                        {recipe.keywords.includes('laktosefrei') ? (
                            <Box
                                title="laktosefrei"
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.light,
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.light}`,
                                    },
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.primary.main}`,
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                    height: 'calc(24px - 1px - 1px)',
                                    width: 'calc(24px - 1px - 1px)',
                                    justifyContent: 'center',
                                    display: 'grid',
                                    alignContent: 'center',
                                }}
                            >
                                <Icon
                                    path={mdiBarleyOff}
                                    size={0.8}
                                    style={{ color: 'inherit' }}
                                />
                            </Box>
                        ) : null}
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <Box
                            title="Zubereitungzeit"
                            sx={{
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                },
                                color: (theme) => theme.palette.primary.main,
                                marginRight: '10px',
                                display: 'flex',
                            }}
                        >
                            <Icon
                                path={mdiClockOutline}
                                size={1}
                                style={{
                                    color: 'inherit',
                                    marginRight: '10px',
                                    width: '24px',
                                }}
                            />
                            <Typography variant="body1">
                                Zubereitungzeit:{' '}
                                {recipe.time.preparation / 1000 / 60 / 60}{' '}
                                Stunden
                            </Typography>
                        </Box>
                        <Box
                            title="Wartezeit"
                            sx={{
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                },
                                color: (theme) => theme.palette.primary.main,
                                marginRight: '10px',
                                display: 'flex',
                            }}
                        >
                            <Icon
                                path={mdiClockOutline}
                                size={1}
                                style={{
                                    color: 'inherit',
                                    marginRight: '10px',
                                }}
                            />
                            <Typography variant="body1">
                                Wartezeit:{' '}
                                {recipe.time.resting / 1000 / 60 / 60} Stunden
                            </Typography>
                        </Box>
                        <Box
                            title="Koch-/Backzeit"
                            sx={{
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                },
                                color: (theme) => theme.palette.primary.main,
                                marginRight: '10px',
                                display: 'flex',
                            }}
                        >
                            <Icon
                                path={mdiClockOutline}
                                size={1}
                                style={{
                                    color: 'inherit',
                                    marginRight: '10px',
                                }}
                            />
                            <Typography variant="body1">
                                Koch-/Backzeit:{' '}
                                {recipe.time.baking / 1000 / 60 / 60} Stunden
                            </Typography>
                        </Box>
                    </div>
                    {/* Portion */}
                    <Portion />
                </Grid>
            </Grid>

            {/* Zutaten */}
            <Ingredients />

            <List sx={{ lineHeight: '24px', padding: 0, marginBottom: '24px' }}>
                <ListItem disablePadding>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 700,
                            color: (theme) => theme.palette.text.primary,
                        }}
                    >
                        Arbeitsschritte
                    </Typography>
                </ListItem>
                {recipe.steps.map((step, index) => {
                    return (
                        <ListItem disablePadding key={index}>
                            <ListItemIcon
                                sx={{
                                    minWidth: '25px',
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                {`${index + 1}.`}
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    margin: 0,
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                                primary={step}
                            />
                        </ListItem>
                    );
                })}
            </List>

            {/* Schlagw??rter */}
            <div style={{ marginTop: '-5px' }}>
                {recipe.keywords
                    // .concat(recipe.user ? [recipe.user] : [])
                    .map((keyword, index) => {
                        return (
                            <Chip
                                sx={{
                                    marginTop: '7px',
                                    marginRight: '5px',
                                    height: '19px',
                                    marginBottom: '-2px',
                                    cursor: 'pointer',
                                    background: (theme) =>
                                        theme.palette.primary.light,
                                    color: (theme) =>
                                        theme.palette.getContrastText(
                                            theme.palette.primary.light
                                        ),
                                    '&:hover': {
                                        background: (theme) =>
                                            theme.palette.primary.main,
                                        color: (theme) =>
                                            theme.palette.getContrastText(
                                                theme.palette.primary.main
                                            ),
                                    },
                                }}
                                key={index}
                                label={keyword}
                                onClick={() =>
                                    navigate(
                                        `/rezepte?${
                                            filterParams.includes(keyword)
                                                ? `filter=${keyword}`
                                                : `wort=${keyword}&typ=schl??sselwort`
                                        }`
                                    )
                                }
                            />
                        );
                    })}
            </div>

            {/* Manipulieren */}
            {!formular ? (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '19px',
                        left: 0,
                        width: '43px',
                        height: 'calc(100% - 18px)',
                    }}
                >
                    <Box sx={{ justifyContent: 'center', display: 'grid' }}>
                        {user ? <Favorite check={recipe.favorite} /> : null}
                        <WakeLock />
                        <Share title={recipe.title} id={recipe.id} />
                    </Box>
                    {recipe.user && user === recipe.user ? (
                        <Box
                            sx={{
                                width: 'inherit',
                                justifyContent: 'center',
                                display: 'grid',
                                bottom: '22px',
                                position: 'absolute',
                            }}
                        >
                            <IconButton
                                sx={{
                                    padding: '2px',
                                    marginBottom: '25px',
                                    width: '23px',
                                    height: '23px',
                                    background: (theme) =>
                                        theme.palette.action.hover,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.primary.light}`,
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                    '&:hover': {
                                        border: (theme) =>
                                            `1px solid ${theme.palette.primary.main}`,
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                                onClick={() =>
                                    navigate(`/rezepte/formular/${id}`)
                                }
                                disableRipple
                            >
                                <Icon path={mdiPencil} size={0.7} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    padding: '2px',
                                    width: '23px',
                                    height: '23px',
                                    background: (theme) =>
                                        theme.palette.action.hover,
                                    border: (theme) =>
                                        `1px solid ${theme.palette.error.light}`,
                                    color: (theme) => theme.palette.error.light,
                                    '&:hover': {
                                        border: (theme) =>
                                            `1px solid ${theme.palette.error.main}`,
                                        color: (theme) =>
                                            theme.palette.error.main,
                                    },
                                }}
                                onClick={deleteRecipe}
                                disableRipple
                            >
                                <Icon path={mdiDelete} size={0.7} />
                            </IconButton>
                        </Box>
                    ) : null}
                </Box>
            ) : null}
        </NotePaper>
    ) : error ? (
        <div>Error</div>
    ) : (
        <Loader />
    );
}

export default Recipe;
