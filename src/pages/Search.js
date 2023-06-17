import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    addCategories,
    addCategory,
    removeCategories,
    removeCategory,
    setCategories,
    setRoute,
    setType,
    setWord,
} from '../actions/recipeFilterActions';

import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/Recipes/Search';
import Categories from '../components/Recipes/Categories';
import Author from '../components/Recipes/Author';

import params from '../data/params.json';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function SearchCategories() {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.recipeFilter.categories);

    return (
        <Categories
            values={categories}
            onCheckedTitle={(e) => dispatch(addCategories(e))}
            onUncheckedTitle={(e) => dispatch(removeCategories(e))}
            onCheckedValue={(e) => dispatch(addCategory(e))}
            onUncheckedValue={(e) => dispatch(removeCategory(e))}
        />
    );
}

function Search() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const route = useSelector((state) => state.recipeFilter.route);

    useEffect(() => {
        handleResize();
        if ((!user && route === 'favoriten') || route === 'nutzer') {
            dispatch(setRoute(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [searchParams /*, setSearchParams*/] = useSearchParams();

    // read url params
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        const type = searchParams.get('typ');
        const word = searchParams.get('wort');
        var filter = searchParams.get('filter');
        if (type) {
            dispatch(setType(params.typ[type.toLowerCase()]));
        }
        if (word) {
            dispatch(setWord(word));
        }
        if (filter) {
            filter = filter /*.toLowerCase()*/
                .split(',');
            filter = filter.map((f) => f.trim());
            dispatch(setCategories(filter));
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ref = useRef(null);
    const [divHeight, setDivHeight] = useState(0);

    const handleResize = () => {
        setDivHeight(ref.current.clientHeight);
    };

    return (
        <div>
            <AppBar
                ref={ref}
                sx={{
                    background: (theme) => theme.palette.background.default,
                    boxShadow: 'none',
                    top: 'calc(55px + 54px + 24px)',
                    padding: (theme) => `0 ${theme.spacing(3)}`,
                    zIndex: (theme) => theme.zIndex.searchbar,
                }}
            >
                <Toolbar sx={{ padding: '0px !important', display: 'initial' }}>
                    <SearchBar redux />
                    <Box
                        sx={{
                            justifyContent: 'center',
                            display: 'flex',
                            marginTop: '10px',
                            marginBottom: '10px',
                            width: 'calc(100% + 20px)',
                        }}
                    >
                        <FormControl
                            sx={{
                                width: user
                                    ? 'min(100%, 650px)'
                                    : 'min(100%, 384px)',
                                marginLeft: '9px',
                            }}
                        >
                            <RadioGroup
                                row
                                value={route}
                                onChange={(e) =>
                                    dispatch(setRoute(e.target.value))
                                }
                                sx={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                <FormControlLabel
                                    value={''}
                                    control={
                                        <Radio
                                            disableRipple
                                            sx={{ marginLeft: '-9px' }}
                                        />
                                    }
                                    label="alle"
                                    sx={{ mr: '20px' }}
                                />
                                <FormControlLabel
                                    value={'basis'}
                                    control={
                                        <Radio
                                            disableRipple
                                            sx={{ marginLeft: '-9px' }}
                                        />
                                    }
                                    label="Grundrezepte"
                                    sx={{ mr: '20px' }}
                                />
                                {/* <FormControlLabel
                                    value={'kleinkind'}
                                    control={
                                        <Radio
                                            disableRipple
                                            sx={{ marginLeft: '-9px' }}
                                        />
                                    }
                                    label="Kleinkinderrezepte"
                                    sx={{ mr: '20px' }}
                                /> */}
                                {user ? (
                                    <FormControlLabel
                                        value={'favoriten'}
                                        control={
                                            <Radio
                                                disableRipple
                                                sx={{ marginLeft: '-9px' }}
                                            />
                                        }
                                        label="Favoriten"
                                        sx={{ mr: '20px' }}
                                    />
                                ) : null}
                                {user ? (
                                    <FormControlLabel
                                        value={'nutzer'}
                                        control={
                                            <Radio
                                                disableRipple
                                                sx={{ marginLeft: '-9px' }}
                                            />
                                        }
                                        label="Eigene"
                                        sx={{ mr: '20px' }}
                                    />
                                ) : null}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            color: (theme) => theme.palette.text.primary,
                        }}
                    >
                        Filter
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    paddingTop: `${divHeight}px`,
                    color: (theme) => theme.palette.text.primary,
                    marginBottom: '-24px',
                }}
            >
                <SearchCategories />
                <Author redux />
            </Box>
        </div>
    );
}

export default Search;
