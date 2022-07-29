import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Overview from '../Recipes/Overview';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { IconButton, Box } from '@mui/material';

const CircularSwipeableViews = virtualize(SwipeableViews);

function LastRecipes() {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/recipe?sort=date&ascending=false&limit=5`,
            success: (res) => {
                setRecipes(res.data);
                setLoading(false);
            },
            error: (err) => {
                console.error(err.message);
                setLoading(false);
            },
        };

        axios(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    }, []);

    const next = () => {
        setIndex(mod(index + 1, recipes.length));
    };

    const back = () => {
        setIndex(mod(index - 1, recipes.length));
    };

    const handleIndexChange = (idx) => {
        setIndex(mod(idx, recipes.length));
    };

    const slideRenderer = ({ index, key }) => {
        index = mod(index, recipes.length);
        return (
            <Overview
                key={key}
                fullscreen
                id={recipes[index]._id}
                title={recipes[index].title}
                picture={`${process.env.REACT_APP_API_URL}/media/${recipes[index].picture}`}
                keywords={recipes[index].keywords}
                time={recipes[index].time}
                date={recipes[index].date}
            />
        );
    };

    return !loading && recipes ? (
        <div id="slider" style={{ height: '100%', position: 'relative' }}>
            <IconButton
                id="sliderBack"
                sx={{
                    visibility: 'hidden',
                    padding: '1px',
                    borderRadius: '50%',
                    border: `1px solid`,
                    color: (theme) => theme.palette.primary.main,
                    borderColor: (theme) => theme.palette.primary.main,
                    background: (theme) => theme.palette.action.hover,
                    position: 'absolute',
                    top: 'calc(50% - 24px)',
                    left: '8px',
                    zIndex: 1,
                    '&:hover': {
                        color: (theme) => theme.palette.action.hover,
                        borderColor: (theme) =>
                            theme.palette.background.default,
                        background: (theme) => theme.palette.primary.main,
                    },
                }}
                disableRipple
                onClick={back}
            >
                <Icon path={mdiChevronLeft} size={1} />
            </IconButton>
            <CircularSwipeableViews
                axis={'x'}
                index={index}
                onChangeIndex={handleIndexChange}
                slideRenderer={slideRenderer}
                overscanSlideAfter={1}
                overscanSlideBefore={1}
                containerStyle={{ height: '100%' }}
                style={{
                    height: '100%',
                }}
            />

            <IconButton
                id="sliderNext"
                sx={{
                    visibility: 'hidden',
                    padding: '1px',
                    borderRadius: '50%',
                    border: `1px solid`,
                    color: (theme) => theme.palette.primary.main,
                    borderColor: (theme) => theme.palette.primary.main,
                    background: (theme) => theme.palette.action.hover,
                    position: 'absolute',
                    top: 'calc(50% - 24px)',
                    right: '8px',
                    zIndex: 1,
                    '&:hover': {
                        color: (theme) => theme.palette.action.hover,
                        borderColor: (theme) => theme.palette.action.hover,
                        background: (theme) => theme.palette.primary.main,
                    },
                }}
                disableRipple
                onClick={next}
            >
                <Icon path={mdiChevronRight} size={1} />
            </IconButton>
            <Box
                id="sliderCount"
                sx={{
                    visibility: 'hidden',
                    position: 'absolute',
                    bottom: 8,
                    height: '7px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {recipes.map((recipe, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            backgroundColor:
                                index === idx
                                    ? (theme) => theme.palette.primary.light
                                    : 'none',
                            borderColor: (theme) => theme.palette.primary.light,
                            width: '7px',
                            height: '7px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderRadius: '50%',
                            marginLeft: idx === 0 ? 0 : '6px',
                            cursor: index !== idx ? 'pointer' : 'default',
                        }}
                        onClick={index !== idx ? () => setIndex(idx) : null}
                    />
                ))}
            </Box>
        </div>
    ) : loading ? null : (
        'Fehler'
    );
}

export default LastRecipes;
