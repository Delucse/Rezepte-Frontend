import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, getImages } from '../actions/imageActions';

import { useNavigate } from 'react-router-dom';

import ImageCarousel from '../components/ImageCarousel';
import Loader from '../components/Loader';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import Textfield from '../components/Textfield';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    ImageListItem,
    ImageListItemBar,
    Typography,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiDelete, mdiLoading, mdiFullscreen } from '@mdi/js';

function Image(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const loading = useSelector(
        (state) =>
            state.progress.loading &&
            state.progress.type === `image-${props.imageId}`
    );

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const cancel = () => {
        setFile('');
        setOpen(false);
    };

    return (
        <ImageListItem sx={{ height: '180px' }}>
            <img
                src={`${process.env.REACT_APP_IMAGE_URL}/${props.file}`}
                alt=""
                style={{
                    cursor: 'pointer',
                    height: '180px',
                    objectFit: 'cover',
                }}
                onClick={props.openCarousel}
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
                                    lineHeight: 'calc(40px - 2 * 8px)',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    color: 'white',
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                                onClick={() =>
                                    navigate(`/rezepte/${props.recipeId}`)
                                }
                            >
                                {props.title}
                            </Box>
                        </div>
                        <IconButton
                            sx={{
                                padding: '8px',
                                color: 'white',
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                },
                            }}
                            onClick={props.openCarousel}
                        >
                            <Icon path={mdiFullscreen} size={1} />
                        </IconButton>
                        <IconButton
                            sx={{
                                padding: '8px',
                                color: 'white',
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                },
                            }}
                            onClick={loading ? null : () => setOpen(true)}
                        >
                            <Icon
                                path={loading ? mdiLoading : mdiDelete}
                                size={1}
                                spin={loading ? 0.9 : false}
                            />
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
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={`Bild löschen`}
                noPadding
                content={
                    <Box>
                        <Typography sx={{ marginBottom: '10px' }}>
                            Gib als Bestätigung den Dateinamen an, um das Bild{' '}
                            <div
                                style={{ fontWeight: 700, display: 'contents' }}
                            >
                                {props.file}
                            </div>{' '}
                            vom Rezept {props.title} endgültig zu löschen.
                        </Typography>
                        <Textfield
                            value={file}
                            label="Dateiname"
                            onChange={(e) => setFile(e.target.value)}
                        />
                    </Box>
                }
                actions={
                    <div>
                        <Button
                            variant="outlined"
                            onClick={cancel}
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => dispatch(deleteImage(props.imageId))}
                            disabled={props.file !== file}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </ImageListItem>
    );
}

function Images() {
    const dispatch = useDispatch();

    const images = useSelector((state) => state.image.images);
    const loading = useSelector(
        (state) => state.progress.loading && state.progress.type === 'images'
    );

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const col = lg ? 4 : md ? 3 : sm ? 2 : 1;

    useEffect(() => {
        dispatch(getImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {images.map((image, idx) => (
                    <Image
                        key={image._id}
                        file={image.file}
                        imageId={image._id}
                        recipeId={image.recipe._id}
                        title={image.recipe.title}
                        openCarousel={() => handleOpen(idx)}
                    />
                ))}
                <ImageCarousel
                    images={images.map(
                        (img) =>
                            `${process.env.REACT_APP_IMAGE_URL}/${img.file}`
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
