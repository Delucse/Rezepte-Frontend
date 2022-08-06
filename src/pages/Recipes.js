import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    getRecipes,
    getRecipesFavorite,
    resetFilterSettings,
    resetRecipes,
    setCategories,
    setRoute,
    setSort,
    setType,
    setWord,
} from '../actions/recipeFilterActions';
import { resetRecipe } from '../actions/recipeActions';

import { useLocation, useSearchParams } from 'react-router-dom';

import Loader from '../components/Loader';
import SearchBar from '../components/Recipes/SearchBar';
import Overview from '../components/Recipes/Overview';

import params from '../data/params.json';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Recipes(props) {
    const dispatch = useDispatch();
    const loading = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'recipeFilter'
    );
    const error = useSelector(
        (state) =>
            state.progress.error && state.progress.type === 'recipeFilter'
    );
    const user = useSelector((state) => state.auth.user);
    const word = useSelector((state) => state.recipeFilter.word);
    const sort = useSelector((state) => state.recipeFilter.sort);
    const type = useSelector((state) => state.recipeFilter.type);
    const categories = useSelector((state) => state.recipeFilter.categories);
    const recipes = useSelector((state) => state.recipeFilter.recipes);
    const route = useSelector((state) => state.recipeFilter.route);

    const [oldType, setOldType] = useState(type);
    const [oldUser, setUser] = useState(user);

    const search = useLocation().search;

    useEffect(() => {
        if (
            search === '' &&
            !(type !== oldType && word === '') &&
            props.route === route
        ) {
            dispatch(getRecipes());
        }
        setOldType(type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, sort, type, categories, route]);

    useEffect(() => {
        if (props.route !== route) {
            dispatch(setRoute(props.route));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.route, route]);

    useEffect(() => {
        if (user && user !== oldUser && route === '') {
            dispatch(getRecipesFavorite());
        }
        setUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(resetRecipe());

        // read url params
        const route = searchParams.get('route');
        const type = searchParams.get('typ');
        const word = searchParams.get('wort');
        const sort = searchParams.get('sortierung');
        const ascending = searchParams.get('reihenfolge');
        var filter = searchParams.get('filter');

        if (search !== '') {
            dispatch(resetFilterSettings());
        }
        if (route) {
            dispatch(setRoute(params.route[route.toLowerCase()]));
        }
        if (type) {
            dispatch(setType(params.typ[type.toLowerCase()]));
        }
        if (word) {
            dispatch(setWord(word));
        }
        if (sort && ascending) {
            dispatch(
                setSort(
                    params.sortierung[sort.toLowerCase()],
                    params.reihenfolge[ascending.toLowerCase()]
                )
            );
        }
        if (filter) {
            filter = filter.toLowerCase().split(',');
            filter = filter.map((f) => f.trim());
            dispatch(setCategories(filter));
        }
        setSearchParams();

        return () => {
            dispatch(resetRecipes());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ marginTop: '-90px' }}>
            <div
                style={{
                    paddingTop: '80px',
                    marginBottom: 'calc(-24px + 50px + 20px)',
                }}
            >
                <SearchBar />
                {!loading && !error && recipes ? (
                    recipes.length > 0 ? (
                        <Grid container spacing={3}>
                            {recipes.map((recipe) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={2}
                                    key={recipe._id}
                                >
                                    <Overview
                                        id={recipe._id}
                                        title={recipe.title}
                                        picture={
                                            recipe.picture
                                                ? `${process.env.REACT_APP_IMAGE_URL}/${recipe.picture}`
                                                : null
                                        }
                                        keywords={recipe.keywords}
                                        time={recipe.time}
                                        date={recipe.date}
                                        rotate={recipe.rotate}
                                        favorite={recipe.favorite}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box
                            sx={{
                                color: (theme) => theme.palette.text.primary,
                            }}
                        >
                            {`Es konnten keine Rezepte mit ${
                                word !== ''
                                    ? `dem angegebenen Suchwort "${word}"`
                                    : ''
                            } ${
                                word !== '' && categories.length > 0
                                    ? 'und'
                                    : ''
                            } ${
                                categories.length > 0
                                    ? `den angegebenen Filtern "${categories.join(
                                          '", "'
                                      )}"`
                                    : ''
                            } gefunden werden.`}
                        </Box>
                    )
                ) : error ? (
                    <div>Error</div>
                ) : (
                    <Loader top={189} />
                )}
            </div>
        </div>
    );
}

export default Recipes;
