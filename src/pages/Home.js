import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setRoute } from '../actions/recipeFilterActions';

import { Link } from 'react-router-dom';

import HowTo from '../components/Home/HowTo';
import RecipeLogo from '../components/RecipeLogo';
import LastRecipes from '../components/Home/LastRecipes';

import { Grid, Box } from '@mui/material';
// import Statistics from '../components/Home/Statistics';

import Icon from '@mdi/react';
import { mdiFrequentlyAskedQuestions } from '@mdi/js';

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
        >
            {props.children}
        </Box>
    );
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            {props.link ? <Link to={props.link}>{boxSquare}</Link> : boxSquare}
        </Grid>
    );
}

const themes = [
    {
        link: '/rezepte',
        component: <RecipeLogo style={{ height: '100%', width: '100%' }} />,
    },
    { component: <LastRecipes />, noPadding: true },
    // { component: <Statistics /> },
    { link: '/rezepte/basis', component: <HowTo /> },
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
