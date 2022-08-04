import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { snackbarMessage } from '../actions/messageActions';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import ImageCarousel from '../components/ImageCarousel';
import Loader from '../components/Loader';
import IconButton from '../components/IconButton';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    ImageListItem,
    ImageListItemBar,
    Typography,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiDelete, mdiFullscreen } from '@mdi/js';

function Images() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [images, setImages] = useState(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const col = lg ? 4 : md ? 3 : sm ? 2 : 1;

    useEffect(() => {
        const config = {
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/recipe/image`,
            success: (res) => {
                setImages(res.data);
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

    useEffect(() => {
        if (open) {
            setOpen(false);
        }
    }, [open]);

    const handleOpen = (i) => {
        setIndex(i);
        setOpen(true);
    };

    const deleteImage = (id) => {
        const config = {
            method: 'DELETE',
            url: `${process.env.REACT_APP_API_URL}/recipe/image/${id}`,
            success: (res) => {
                setImages(images.filter((img) => img._id !== id));
                dispatch(
                    snackbarMessage(
                        'Das Bilder-Rezept wurde erfolgreich gelöscht.',
                        `image-${id}`
                    )
                );
            },
            error: (err) => {
                console.error(err.message);
            },
        };

        axios(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

    return !loading && images ? (
        images.length > 0 ? (
            <div
                style={{
                    width: '100%',
                    listStyle: 'none',
                    marginBottom: '16px',
                    display: 'grid',
                    gridGap: '0.4rem',
                    gridTemplateColumns: `repeat(${col}, calc(100% / ${col} - 0.4rem * ${
                        (-1 + col) / col
                    }))`,
                }}
            >
                {images.map((image, idx) => {
                    return (
                        <ImageListItem key={image._id} sx={{ height: '180px' }}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/media/${image.file}`}
                                alt=""
                                style={{
                                    cursor: 'pointer',
                                    height: '180px',
                                    objectFit: 'cover',
                                }}
                                onClick={() => handleOpen(idx)}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = `${process.env.PUBLIC_URL}/logo512.png`;
                                    currentTarget.style =
                                        'height: 180px; object-fit: cover; cursor: pointer; filter: grayscale(1);';
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
                                                width: 'calc(100% - 2 * 40px)',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    lineHeight:
                                                        'calc(40px - 2 * 8px)',
                                                    padding: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    color: 'white',
                                                    '&:hover': {
                                                        color: (theme) =>
                                                            theme.palette
                                                                .primary.main,
                                                    },
                                                }}
                                                onClick={() =>
                                                    navigate(
                                                        `/rezepte/${image.recipe._id}`
                                                    )
                                                }
                                            >
                                                {image.recipe.title}
                                            </Box>
                                        </div>
                                        <IconButton
                                            sx={{
                                                padding: '8px',
                                                color: 'white',
                                                '&:hover': {
                                                    color: (theme) =>
                                                        theme.palette.primary
                                                            .main,
                                                },
                                            }}
                                            onClick={() => handleOpen(idx)}
                                        >
                                            <Icon
                                                path={mdiFullscreen}
                                                size={1}
                                            />
                                        </IconButton>
                                        <IconButton
                                            sx={{
                                                padding: '8px',
                                                color: 'white',
                                                '&:hover': {
                                                    color: (theme) =>
                                                        theme.palette.primary
                                                            .main,
                                                },
                                            }}
                                            onClick={() => {
                                                deleteImage(image._id);
                                            }}
                                        >
                                            <Icon path={mdiDelete} size={1} />
                                        </IconButton>
                                    </div>
                                }
                                sx={{
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
                })}
                <ImageCarousel
                    images={images.map(
                        (img) =>
                            `${process.env.REACT_APP_API_URL}/media/${img.file}`
                    )}
                    title={'Meine Bilder'}
                    open={open}
                    index={index}
                />
            </div>
        ) : (
            <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
                Du hast noch keine Bilder hinzugefügt ...
            </Typography>
        )
    ) : (
        <Loader top={109} />
    );
}

export default Images;
