import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getRecipe, getRecipePreview } from '../actions/recipeActions';
import { setProgressError } from '../actions/progressActions';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import NotePaper from '../components/NotePaper';
import Portion from '../components/Recipe/Portion';
import Images from '../components/Recipe/Images';
import Ingredients from '../components/Recipe/Ingredients';
import Favorite from '../components/Recipe/Favorite';
import Share from '../components/Recipe/Share';
import Pdf from '../components/Recipe/Pdf';
import WakeLock from '../components/Recipe/WakeLock';
import Loader from '../components/Loader';
import IconButton from '../components/IconButton';
import Tooltip from '../components/Tooltip';
import AddImage from '../components/Recipe/AddImage';
import Delete from '../components/Recipe/Delete';
import Notes from '../components/Recipe/Notes';

import {
    Grid,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Typography,
} from '@mui/material';

import Icon from '@mdi/react';
import {
    mdiBarleyOff,
    mdiClockOutline,
    mdiStove,
    mdiTimerPauseOutline,
    mdiEggOffOutline,
    mdiFoodSteakOff,
    mdiPencil,
} from '@mdi/js';

import params from '../data/params.json';

var filterParams = [];
Object.keys(params.filter).forEach((key) => {
    filterParams = filterParams.concat(params.filter[key]);
});

const msToReadableTime = (time) => {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const days = parseInt(time / day);
    const hours = parseInt((time - days * day) / hour);
    const minutes = parseInt((time - days * day - hours * hour) / minute);
    var title = '';
    if (days > 0) {
        title += `${days} ${days > 1 ? 'Tage' : 'Tag'}`;
    }
    if (hours > 0) {
        title += `${title !== '' ? ' ' : ''}${hours} ${
            hours > 1 ? 'Stunden' : 'Stunde'
        }`;
    }
    if (minutes > 0) {
        title += `${title !== '' ? ' ' : ''}${minutes} ${
            minutes > 1 ? 'Minuten' : 'Minute'
        }`;
    }
    return title;
};

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

    const [oldUser, setUser] = useState(user);

    useEffect(() => {
        if (id && user && user !== oldUser) {
            dispatch(getRecipe(id, null, false));
        }
        setUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return !loading && !error && recipe.title ? (
        <NotePaper>
            {/* Titel */}
            <Box
                sx={{
                    fontWeight: 700,
                    fontFamily: 'Lobster Two',
                    fontSize: '26px',
                    lineHeight: '24px',
                    marginBottom: '24px',
                    color: (theme) => theme.palette.text.primary,
                    display: 'flex',
                    width:
                        !formular && user && recipe.note !== null
                            ? {
                                  xs: 'calc(100% - 100px)',
                                  sm: 'calc(100% - 130px)',
                                  md: 'calc(100% - 160px)',
                              }
                            : '100%',
                }}
            >
                {recipe.title}
                {!formular && recipe.pictures.length === 0 ? (
                    <Box sx={{ height: '24px', marginTop: '-8px' }}>
                        <AddImage />
                    </Box>
                ) : null}
            </Box>

            <Grid container spacing={0} sx={{ marginBottom: '24px' }}>
                {recipe.pictures.length > 0 ? (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{ height: 'calc(24px * 10)' }}
                    >
                        <Images
                            add={!formular}
                            pictures={recipe.pictures}
                            title={recipe.title}
                        />
                    </Grid>
                ) : null}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        paddingLeft: {
                            xs: 0,
                            sm: recipe.pictures.length > 0 ? '20px' : 0,
                        },
                        marginTop: { xs: '24px', sm: 0 },
                    }}
                >
                    <div style={{ display: 'flex', marginBottom: '24px' }}>
                        {recipe.keywords.includes('vegetarisch') ||
                        recipe.keywords.includes('vegan') ? (
                            <Tooltip title="vegetarisch">
                                <Box
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
                            </Tooltip>
                        ) : null}
                        {recipe.keywords.includes('vegan') ? (
                            <Tooltip title="vegan">
                                <Box
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
                            </Tooltip>
                        ) : null}
                        {recipe.keywords.includes('glutenfrei') ? (
                            <Tooltip title="glutenfrei">
                                <Box
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
                            </Tooltip>
                        ) : null}
                        {recipe.keywords.includes('laktosefrei') ? (
                            <Tooltip title="laktosefrei">
                                <Box
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
                            </Tooltip>
                        ) : null}
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        {recipe.time.preparation > 0 ? (
                            <Tooltip title="Zubereitungszeit">
                                <Box
                                    sx={{
                                        '&:hover': {
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                        },
                                        color: (theme) =>
                                            theme.palette.primary.main,
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
                                        {msToReadableTime(
                                            recipe.time.preparation
                                        )}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        ) : null}
                        {recipe.time.resting > 0 ? (
                            <Tooltip title="Ruhezeit">
                                <Box
                                    sx={{
                                        '&:hover': {
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                        },
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                        marginRight: '10px',
                                        display: 'flex',
                                    }}
                                >
                                    <Icon
                                        path={mdiTimerPauseOutline}
                                        size={1}
                                        style={{
                                            color: 'inherit',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {msToReadableTime(recipe.time.resting)}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        ) : null}
                        {recipe.time.baking > 0 ? (
                            <Tooltip title="Backzeit">
                                <Box
                                    sx={{
                                        '&:hover': {
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                        },
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                        marginRight: '10px',
                                        display: 'flex',
                                    }}
                                >
                                    <Icon
                                        path={mdiStove}
                                        size={1}
                                        style={{
                                            color: 'inherit',
                                            marginRight: '10px',
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {msToReadableTime(recipe.time.baking)}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        ) : null}
                    </div>
                    {/* Portion */}
                    <Portion />
                </Grid>
            </Grid>

            {/* Zutaten */}
            <Ingredients />

            <Box sx={{ marginTop: '25px', display: 'flex' }}>
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
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    Arbeitsschritte{' '}
                </Typography>
                {!formular && user && recipe.note !== null ? <Notes /> : null}
            </Box>
            <List
                sx={{
                    padding: 0,
                    marginBottom: '24px',
                }}
            >
                {recipe.steps.map((step, index) => {
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

            {/* Schlagwörter */}
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
                                    keyword === 'Basic'
                                        ? navigate('/rezepte/basis')
                                        : keyword === 'Baby'
                                        ? navigate('/rezepte/kleinkind')
                                        : navigate(
                                              `/rezepte?${
                                                  filterParams.includes(keyword)
                                                      ? `filter=${keyword}`
                                                      : `wort=${keyword}&typ=schlüsselwort`
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
                        <Pdf />
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
                                tooltipProps={{
                                    title: 'Editier-Modus starten',
                                    placement: 'right',
                                }}
                                sx={{
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
                            >
                                <Icon path={mdiPencil} size={0.7} />
                            </IconButton>
                            <Delete id={recipe.id} title={recipe.title} />
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
