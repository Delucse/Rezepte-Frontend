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

import { Link, useLocation, useSearchParams } from 'react-router-dom';

import Loader from '../components/Loader';
import SearchBar from '../components/Recipes/SearchBar';
import Overview from '../components/Recipes/Overview';

import params from '../data/params.json';

import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

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
            filter = filter /*.toLowerCase()*/
                .split(',');
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
                        <Masonry
                            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
                            spacing={3}
                            sx={{
                                width: 'calc(100% + 24px)',
                                marginLeft: '-12px',
                            }}
                        >
                            {recipes.map((recipe) => (
                                <Overview
                                    key={recipe._id}
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
                            ))}
                        </Masonry>
                    ) : (
                        <Box
                            sx={{
                                color: (theme) => theme.palette.text.primary,
                            }}
                        >
                            {`Es konnten keine ${
                                route === 'favoriten'
                                    ? 'Favoriten'
                                    : route === 'nutzer'
                                    ? 'eigene Rezepte'
                                    : route === 'basis'
                                    ? 'Grundrezepte'
                                    : 'Rezepte'
                            } ${
                                word !== ''
                                    ? `mit dem angegebenen Suchwort "${word}"`
                                    : ''
                            } ${
                                word !== '' && categories.length > 0
                                    ? 'und'
                                    : ''
                            } ${
                                categories.length > 0
                                    ? `mit ${
                                          categories.length === 1
                                              ? 'dem angegebenen Filter'
                                              : 'den angegebenen Filtern'
                                      } "${categories.join('", "')}"`
                                    : ''
                            } gefunden werden.`}
                            {user ? (
                                route !== 'favoriten' ? (
                                    <Box
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                            display: 'contents',
                                        }}
                                    >
                                        {' '}
                                        Sei der erste und{' '}
                                        <Box
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                                display: 'contents',
                                            }}
                                        >
                                            <Link
                                                to={'/rezepte/formular'}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                }}
                                            >
                                                erstelle
                                            </Link>
                                        </Box>{' '}
                                        gleich ein passendes Rezept.
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                            display: 'contents',
                                        }}
                                    >
                                        {' '}
                                        Wähle zwischen den{' '}
                                        <Box
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                                display: 'contents',
                                            }}
                                        >
                                            <Link
                                                to={'/rezepte'}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                }}
                                            >
                                                Rezepten
                                            </Link>
                                        </Box>{' '}
                                        aus und ergänze dein Kochbuch.
                                    </Box>
                                )
                            ) : null}
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
