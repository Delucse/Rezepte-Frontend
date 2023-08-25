import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    getRecipe,
    getRecipePreview,
    resetRecipe,
    setRecipeSettings,
} from '../actions/recipeActions';
import { setProgressError } from '../actions/progressActions';

import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import NotePaper from '../components/NotePaper';
import Title from '../components/Recipe/Title';
import Portion from '../components/Recipe/Portion';
import Images from '../components/Recipe/Images';
import Ingredients from '../components/Recipe/Ingredients';
import Favorite from '../components/Recipe/Favorite';
import Share from '../components/Recipe/Share';
import Pdf from '../components/Recipe/Pdf';
import WakeLock from '../components/Recipe/WakeLock';
import Loader from '../components/Loader';
import Delete from '../components/Recipe/Delete';
import Times from '../components/Recipe/Times';
import Info from '../components/Recipe/Info';
import Steps from '../components/Recipe/Steps';
import Keywords from '../components/Recipe/Keywords';
import Edit from '../components/Recipe/Edit';
import Date from '../components/Recipe/Date';
import Link from '../components/Link';

import { Grid, Box, Typography } from '@mui/material';

function Recipe() {
    const { id } = useParams();

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
    const internalError = useSelector(
        (state) => state.progress.error && state.progress.type === 'recipeError'
    );
    const location = useLocation();
    const formular = location.pathname.includes('/formular');

    const [searchParams, setSearchParams] = useSearchParams();
    const search = location.search;

    useEffect(() => {
        if (search !== '') {
            // read url params
            var urlCount = searchParams.get('portion');
            var urlForm = searchParams.get('form');

            dispatch(resetRecipe());

            if (urlCount) {
                urlCount = Math.abs(Number(urlCount));
            }
            if (urlForm) {
                urlForm = urlForm.split(',').slice(0, 2);
                console.log(urlForm);
                const isValidForm =
                    urlForm.map((n) => !isNaN(n)).filter((f) => f === false)
                        .length === 0;
                if (isValidForm) {
                    urlForm = urlForm.map((n) => Math.abs(Number(n)));
                } else {
                    urlForm = null;
                }
            }
            dispatch(setRecipeSettings(urlCount, urlForm, true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (recipe.settings && recipe.portion) {
            const newParams = {};
            if (recipe.settings.count !== recipe.portion.count) {
                newParams.portion = recipe.settings.count;
            }
            if (
                recipe.settings.form &&
                JSON.stringify(recipe.settings.form) !==
                    JSON.stringify(recipe.portion.form)
            ) {
                newParams.form = recipe.settings.form.join(',');
            }
            setSearchParams(newParams, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipe.settings]);

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
            dispatch(getRecipe(id, false));
        }
        setUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return !loading && !(error || internalError) && recipe.title ? (
        <NotePaper>
            <Title />

            <Grid container spacing={0} sx={{ marginBottom: '25px' }}>
                {recipe.pictures.length > 0 ? (
                    <Grid
                        item
                        xs={12}
                        md={6}
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
                    md={recipe.pictures.length > 0 ? 6 : 12}
                    sx={{
                        paddingLeft: {
                            xs: 0,
                            md: recipe.pictures.length > 0 ? '20px' : 0,
                        },
                        marginTop: {
                            xs: recipe.pictures.length > 0 ? '24px' : 0,
                            md: 0,
                        },
                        zIndex: 1,
                    }}
                >
                    <Portion
                        style={{ display: 'flex', marginBottom: '24px' }}
                        portion={recipe.portion}
                        settings={recipe.settings}
                        onSubmit={(number, form, rounded) =>
                            dispatch(setRecipeSettings(number, form, rounded))
                        }
                    />
                    <Times />
                    <Info />
                </Grid>
            </Grid>

            <Ingredients
                ingredients={recipe.ingredients}
                portion={recipe.portion}
                settings={recipe.settings}
                info
            />

            <Steps />

            <Keywords />

            <Date />

            {/* Manipulieren */}
            {!formular ? (
                <>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 'calc(55px + 54px + 24px + 2px + 19px)',
                            left: '24px',
                            width: '43px',
                            justifyContent: 'center',
                            display: 'grid',
                        }}
                    >
                        {user ? <Favorite /> : null}
                        <WakeLock />
                        <Share />
                        <Pdf />
                    </Box>
                    {recipe.user && user === recipe.user ? (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '22px',
                                left: 0,
                                width: '43px',
                                justifyContent: 'center',
                                display: 'grid',
                            }}
                        >
                            <Edit />
                            <Delete />
                        </Box>
                    ) : null}
                </>
            ) : null}
        </NotePaper>
    ) : error || internalError ? (
        error ? (
            <Typography color="text.primary" variant="body2">
                Oops, das Rezept existiert nicht (mehr). Zurück zur{' '}
                <Link to="/rezepte">Übersicht</Link>.
            </Typography>
        ) : (
            <Typography color="text.primary" variant="body2">
                Das Rezept kann gerade nicht abgerufen werden. Versuche es
                einfach zu einem späteren Zeitpunkt erneut.
            </Typography>
        )
    ) : (
        <Loader
            style={{
                top: 'calc(55px + 78px)',
                bottom: { xxs: '261px', xs: '178px', sm: '113px' },
            }}
        />
    );
}

export default Recipe;
