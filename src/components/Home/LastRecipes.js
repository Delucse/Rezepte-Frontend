import React, { useEffect, useState } from 'react';

import api from '../../axiosInstance';

import Overview from '../Recipes/Overview';
import IconButton from '../IconButton';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import { Box, LinearProgress, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const CircularSwipeableViews = virtualize(SwipeableViews);

function LastRecipes() {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: '/recipe?sort=date&ascending=false&limit=5',
            success: (res) => {
                setRecipes(res.data);
                setLoading(false);
            },
            error: (err) => {
                console.error(err.message);
                setLoading(false);
            },
        };

        api(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    }, []);

    const next = () => {
        setIndex(index + 1);
    };

    const back = () => {
        setIndex(index - 1);
    };

    const handleIndexChange = (idx) => {
        setIndex(idx);
    };

    const slideRenderer = ({ index, key }) => {
        index = mod(index, recipes.length);
        return (
            <Overview
                key={key}
                fullscreen
                id={recipes[index]?._id}
                title={recipes[index]?.title}
                picture={
                    recipes[index]?.picture
                        ? `${process.env.REACT_APP_IMAGE_URL}/${recipes[index]?.picture}`
                        : null
                }
                keywords={recipes[index]?.keywords}
                time={recipes[index]?.time}
                date={recipes[index]?.date}
            />
        );
    };

    return !loading && recipes ? (
        recipes.length > 0 ? (
            <div id="slider" style={{ height: '100%', position: 'relative' }}>
                <IconButton
                    id="sliderBack"
                    sx={{
                        visibility: 'hidden',
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
                    onClick={next}
                >
                    <Icon path={mdiChevronRight} size={1} />
                </IconButton>
                <Box
                    id="sliderCount"
                    sx={{
                        visibility: 'visible',
                        position: 'absolute',
                        bottom: 8,
                        height: '7px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {recipes.map((recipe, idx) => {
                        const modIndex = mod(index, recipes.length);
                        return (
                            <Box
                                key={idx}
                                sx={{
                                    backgroundColor:
                                        modIndex === idx
                                            ? (theme) =>
                                                  theme.palette.primary.light
                                            : 'none',
                                    borderColor: (theme) =>
                                        theme.palette.primary.light,
                                    width: '7px',
                                    height: '7px',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderRadius: '50%',
                                    marginLeft: idx === 0 ? 0 : '6px',
                                    cursor:
                                        index !== idx ? 'pointer' : 'default',
                                }}
                                onClick={
                                    modIndex !== idx
                                        ? () => setIndex(idx)
                                        : null
                                }
                            />
                        );
                    })}
                </Box>
            </div>
        ) : (
            'keine Rezepte vorhanden'
        )
    ) : loading ? (
        <Box
            sx={{
                height: '100%',
                position: 'relative',
                margin: '0 15%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                }}
            >
                <LinearProgress sx={{ marginBottom: '10px' }} />
                <Typography
                    variant="body2"
                    sx={{ textAlign: 'center' }}
                    color="text.secondary"
                >
                    neueste Rezepte werden geladen
                </Typography>
            </Box>
        </Box>
    ) : (
        'Fehler'
    );
}

export default LastRecipes;
