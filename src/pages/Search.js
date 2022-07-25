import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    setCategories,
    setRoute,
    setType,
    setWord,
} from '../actions/recipeFilterActions';

import { useSearchParams } from 'react-router-dom';

import SearchBar from '../components/Recipes/Search';
import Categories from '../components/Recipes/Categories';

import params from '../data/params.json';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function Search() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const route = useSelector((state) => state.recipeFilter.route);

    useEffect(() => {
        if (!user) {
            dispatch(setRoute(''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [searchParams /*, setSearchParams*/] = useSearchParams();

    // read url params
    useEffect(() => {
        const route = searchParams.get('route');
        const type = searchParams.get('typ');
        const word = searchParams.get('wort');
        var filter = searchParams.get('filter');
        if (route) {
            dispatch(setRoute(params.route[route.toLowerCase()]));
        }
        if (type) {
            dispatch(setType(params.typ[type.toLowerCase()]));
        }
        if (word) {
            dispatch(setWord(word));
        }
        if (filter) {
            filter = filter.toLowerCase().split(',');
            filter = filter.map((f) => f.trim());
            dispatch(setCategories(filter));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <SearchBar redux />
            <Box
                sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    marginTop: '10px',
                    width: 'calc(100% + 20px)',
                }}
            >
                <FormControl
                    sx={{
                        width: user ? 'min(100%, 650px)' : 'min(100%, 270px)',
                        marginLeft: '9px',
                    }}
                >
                    <RadioGroup
                        row
                        value={route}
                        onChange={(e) => dispatch(setRoute(e.target.value))}
                        sx={{
                            width: '100%',
                            justifyContent: 'space-between',
                            color: (theme) => theme.palette.text.primary,
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
            <Box
                sx={{
                    marginTop: '20px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                <Categories redux />
            </Box>
        </div>
    );
}

export default Search;
