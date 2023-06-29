import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../axiosInstance';

import IconButton from '../IconButton';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import {
    Box,
    ImageListItem,
    ImageListItemBar,
    LinearProgress,
    Typography,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const CircularSwipeableViews = virtualize(SwipeableViews);

function LastPictures() {
    const navigate = useNavigate();

    const [pictures, setPictures] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const config = {
            method: 'GET',
            url: '/recipe/image?limit=5',
            success: (res) => {
                setPictures(res.data);
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
        index = mod(index, pictures.length);
        return (
            <ImageListItem
                sx={{
                    height: '100% !important',
                    color: 'white',
                    '&:hover': {
                        color: (theme) => theme.palette.primary.light,
                    },
                }}
                key={key}
                onClick={() =>
                    navigate(`/rezepte/${pictures[index]?.recipe._id}`)
                }
            >
                <Box
                    sx={{
                        height: '100%',
                        width: 'calc(100%)',
                        position: 'relative',
                        backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}/${pictures[index].file})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        cursor: 'pointer',
                    }}
                />
                <ImageListItemBar
                    actionPosition={'left'}
                    actionIcon={
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    alignContent: 'center',
                                    display: 'flex',
                                    width: 'calc(100%)',
                                }}
                            >
                                <Box
                                    sx={{
                                        lineHeight: 'calc(40px - 2 * 8px)',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {pictures[index]?.recipe?.title}
                                </Box>
                            </div>
                        </div>
                    }
                    sx={{
                        top: 0,
                        bottom: 'unset',
                        background: 'rgba(0, 0, 0, 0.25)',
                        '.MuiImageListItemBar-titleWrap': {
                            padding: 0,
                        },
                        '.MuiImageListItemBar-actionIcon': {
                            width: '100%',
                        },
                    }}
                />
            </ImageListItem>
        );
    };

    return !loading && pictures ? (
        pictures.length > 0 ? (
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
                    {pictures.map((pic, idx) => {
                        const modIndex = mod(index, pictures.length);
                        return (
                            <Box
                                key={idx}
                                sx={{
                                    backgroundColor:
                                        modIndex === idx
                                            ? (theme) =>
                                                  theme.palette.background
                                                      .default
                                            : 'none',
                                    borderColor: (theme) =>
                                        theme.palette.background.default,
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
            'keine Bilder vorhanden'
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
                    neueste Bilder werden geladen
                </Typography>
            </Box>
        </Box>
    ) : (
        'Fehler'
    );
}

export default LastPictures;
