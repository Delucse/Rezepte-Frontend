import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setRoute, resetFilterSettings } from '../actions/recipeFilterActions';

import { Link } from 'react-router-dom';

import HowTo from '../components/Home/HowTo';
import RecipeLogo from '../components/RecipeLogo';
import LastRecipes from '../components/Home/LastRecipes';
import LastPictures from '../components/Home/LastPictures';

import { Grid, Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiPoll, mdiFrequentlyAskedQuestions } from '@mdi/js';

function Square(props) {
    const boxSquare = (
        <Box
            sx={{
                aspectRatio: '1',
                border: (theme) => `1px solid ${theme.palette.primary.light}`,
                width: props.noPadding ? '100%' : '94%',
                padding: props.noPadding ? 0 : '3%',
                '&:hover': {
                    borderColor: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Box>
    );
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {props.link ? (
                <Link to={props.link} onClick={props.onClick}>
                    {boxSquare}
                </Link>
            ) : (
                boxSquare
            )}
        </Grid>
    );
}

const themes = [
    {
        link: '/rezepte',
        onClickDispatch: resetFilterSettings,
        component: <RecipeLogo style={{ height: '100%', width: '100%' }} />,
    },
    {
        component: <LastRecipes />,
        onClickDispatch: resetFilterSettings,
        noPadding: true,
    },
    {
        link: '/rezepte/basis',
        onClickDispatch: resetFilterSettings,
        component: <HowTo />,
    },
    {
        component: <LastPictures />,
        noPadding: true,
    },
    {
        link: '/statistiken',
        component: (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    color: (theme) => theme.palette.primary.main,
                    display: 'grid',
                    justifyItems: 'center',
                    alignItems: 'center',
                }}
            >
                <Icon path={mdiPoll} size={'80%'} />
            </Box>
        ),
    },
    {
        link: '/faq',
        component: (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    color: (theme) => theme.palette.primary.light,
                    display: 'grid',
                    justifyItems: 'center',
                    alignItems: 'center',
                }}
            >
                <Icon path={mdiFrequentlyAskedQuestions} size={'80%'} />
            </Box>
        ),
    },
];

function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRoute(''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <Grid
                spacing={3}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {themes.map((theme, index) => {
                    return (
                        <Square
                            key={index}
                            link={theme.link}
                            title={theme.title}
                            noPadding={theme.noPadding}
                            onClick={
                                theme.onClickDispatch
                                    ? () => dispatch(theme.onClickDispatch())
                                    : null
                            }
                        >
                            {theme.component}
                        </Square>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Home;
