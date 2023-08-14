import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    changePicturePosition,
    changePictures,
    confirmPicture,
    removePicture,
} from '../../actions/recipeFormularActions';
import { alertErrorMessage, resetMessage } from '../../actions/messageActions';

import moment from 'moment';

import imageCompression from 'browser-image-compression';

import { useInViewport } from '../../hooks/useInViewport';

import ImageCarousel from '../ImageCarousel';
import Alert from '../Alert';
import IconButton from '../IconButton';
import Checkbox from '../Checkbox';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    InputLabel,
    Grid,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';

import Icon from '@mdi/react';
import {
    mdiDelete,
    mdiFullscreen,
    mdiCamera,
    mdiMenuLeft,
    mdiMenuRight,
} from '@mdi/js';

function PictureInput(props) {
    const pictures = useSelector(
        (state) => state.recipeFormular.pictures.order
    );
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const [drag, setDrag] = useState(false);
    const [counter, setCounter] = useState(0);
    const [showImageProgress, setShowImageProgress] = useState(false);

    const onHandleFileInput = async (targetFiles) => {
        setShowImageProgress(true);
        targetFiles = [...targetFiles];
        const picturesLength = pictures.filter(
            (pic) => pic.user === user
        ).length;
        if (targetFiles.length + picturesLength > 4) {
            dispatch(
                alertErrorMessage(
                    `Es dürfen nur maximal vier Bilder je Nutzer je Rezept hochgeladen werden. (Aktuell existieren ${picturesLength} eigene Bilder.)`,
                    'images'
                )
            );
            return;
        }

        var error = false;
        var index = 0;
        while (!error && index < targetFiles.length) {
            if (
                !['image/jpeg', 'image/jpg', 'image/png'].includes(
                    targetFiles[index].type
                )
            ) {
                error = true;
            }
            index += 1;
        }
        if (error) {
            dispatch(
                alertErrorMessage(
                    'Mindestens ein Bild hat ein falsches Dateiformat. Gültige Bildformate sind ".png", ".jpg" und ".jpeg".',
                    'images'
                )
            );
            return;
        }

        const options = {
            maxSizeMB: 0.6,
            useWebWorker: true,
            // onProgress: (percent) => {console.log(percent)}
        };
        const promises = targetFiles.map((file) => {
            if (file.size / 1024 / 1024 > options.maxSizeMB) {
                return imageCompression(file, options)
                    .then((compressedBlob) => {
                        // Conver the blob to file
                        return new File([compressedBlob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                    })
                    .catch((e) => {
                        console.error('image', e);
                    });
            }
            return file;
        });
        const files = await Promise.all(promises);
        dispatch(changePictures(files));
        setShowImageProgress(false);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounter(counter + 1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true);
        }
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounter(counter - 1);
        if (counter === 0) {
            setDrag(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onHandleFileInput(e.dataTransfer.files);
            // e.dataTransfer.clearData()
            setCounter(0);
        }
    };

    return (
        <div
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => onHandleFileInput(e.target.files)}
                name="picture"
                id="picture-button-file"
                type="file"
                multiple
            />
            <InputLabel
                htmlFor="picture-button-file"
                sx={{
                    color: (theme) =>
                        props.error
                            ? theme.palette.error.main
                            : theme.palette.action.active,
                    '&:hover': { color: (theme) => theme.palette.primary.main },
                }}
            >
                <Box
                    sx={{
                        fontSize: '1rem',
                        cursor: 'pointer',
                        height: `calc(180px - 2 * 10px - 2 * 1.6px)`,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        padding: '10px',
                        marginBottom: pictures.length > 0 ? '0.4rem' : '16px',
                        border: (theme) =>
                            drag
                                ? `2px dashed ${theme.palette.primary.main}`
                                : props.error
                                ? `2px dashed ${theme.palette.error.main}`
                                : `2px dashed ${theme.palette.action.active}`,
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Icon
                            path={mdiCamera}
                            size={2}
                            spin={showImageProgress ? 0.9 : 0}
                        />
                        <br />
                        {!showImageProgress ? 'Bilder wählen' : 'Bilder laden'}
                    </div>
                </Box>
            </InputLabel>
        </div>
    );
}

function Pictures() {
    const dispatch = useDispatch();

    const pictures = useSelector(
        (state) => state.recipeFormular.pictures.order
    );
    const newPictures = useSelector(
        (state) => state.recipeFormular.pictures.new
    );
    const confirmed = useSelector(
        (state) => state.recipeFormular.pictures.confirmed
    );
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.recipeFormular.error.pictures);
    const authors = pictures.map((picture) =>
        !picture.id
            ? `von ${user} am ${moment().format(
                  'DD.MM.YYYY [um] HH:mm'
              )} Uhr hochgeladen`
            : `von ${picture.user} am ${moment(picture.date).format(
                  'DD.MM.YYYY [um] HH:mm'
              )} Uhr hochgeladen`
    );
    const picturesUrl = pictures.map((picture) =>
        !picture.id
            ? picture.url
            : `${process.env.REACT_APP_IMAGE_URL}/${picture.url}`
    );
    const title = useSelector((state) => state.recipeFormular.title);
    const errorPictures = useSelector(
        (state) => state.message.error && state.message.type === 'images'
    );

    const elemRef = useRef();
    const inViewport = useInViewport(elemRef);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        return () => dispatch(resetMessage());
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

    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const col = lg ? 4 : md ? 3 : sm ? 2 : 1;

    return (
        <div>
            {errorPictures || error ? (
                <Box
                    sx={{
                        paddingBottom: '10px',
                        position: 'sticky',
                        top: 'calc(55px + 78px + 34px)',
                        background: (theme) => theme.palette.background.default,
                        zIndex: 2,
                    }}
                >
                    {errorPictures ? (
                        <Alert
                            type={'images'}
                            style={{ marginBottom: error ? '10px' : 0 }}
                            reset
                        />
                    ) : null}
                    {error ? (
                        <Alert
                            error
                            message={`Bestätige die Herkunft ${
                                newPictures.length > 1
                                    ? 'deiner neuen Bilder'
                                    : 'deines neuen Bildes'
                            }.`}
                        />
                    ) : null}
                </Box>
            ) : null}
            <Grid item xs={12}>
                {newPictures.length > 0 ? (
                    <Checkbox
                        error={error}
                        label={`Ich bestätige, dass ${
                            newPictures.length > 1
                                ? 'die neuen Fotos von mir sind'
                                : 'das neue Foto von mir ist'
                        } und ich kein Urheberrecht Dritter verletze.`}
                        checked={confirmed}
                        onChecked={() => dispatch(confirmPicture(true))}
                        onUnchecked={() => dispatch(confirmPicture(false))}
                        style={{ marginTop: '-9px', marginBottom: '10px' }}
                    />
                ) : null}
                <PictureInput error={errorPictures} />
                <div
                    ref={elemRef}
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
                    {pictures.map((picture, idx) => {
                        return (
                            <ImageListItem
                                key={picturesUrl[idx]}
                                sx={
                                    idx === 0
                                        ? {
                                              border: (theme) =>
                                                  `4px solid ${theme.palette.primary.main}`,
                                              padding: '0px',
                                              height: '172px',
                                          }
                                        : { height: '180px' }
                                }
                            >
                                <Box
                                    sx={{
                                        height: idx === 0 ? '172px' : '180px',
                                        backgroundImage: inViewport
                                            ? `url(${picturesUrl[idx]})`
                                            : 'none',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleOpen(idx)}
                                />
                                <ImageListItemBar
                                    actionPosition={'left'}
                                    actionIcon={
                                        <div style={{ display: 'flex' }}>
                                            <div
                                                style={{
                                                    flexGrow: 1,
                                                    alignContent: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <IconButton
                                                    sx={{
                                                        color: 'white',
                                                        '&:hover': {
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            changePicturePosition(
                                                                idx,
                                                                idx - 1
                                                            )
                                                        )
                                                    }
                                                    disabled={idx === 0}
                                                >
                                                    <Icon
                                                        path={mdiMenuLeft}
                                                        size={1.4}
                                                    />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: 'white',
                                                        '&:hover': {
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        dispatch(
                                                            changePicturePosition(
                                                                idx,
                                                                idx + 1
                                                            )
                                                        )
                                                    }
                                                    disabled={
                                                        idx ===
                                                        pictures.length - 1
                                                    }
                                                >
                                                    <Icon
                                                        path={mdiMenuRight}
                                                        size={1.4}
                                                    />
                                                </IconButton>
                                            </div>
                                            <IconButton
                                                sx={{
                                                    padding: '8px',
                                                    color: 'white',
                                                    '&:hover': {
                                                        color: (theme) =>
                                                            theme.palette
                                                                .primary.main,
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
                                                            theme.palette
                                                                .primary.main,
                                                    },
                                                }}
                                                onClick={() => {
                                                    dispatch(
                                                        removePicture(
                                                            picture.url
                                                        )
                                                    );
                                                }}
                                                disabled={picture.user !== user}
                                            >
                                                <Icon
                                                    path={mdiDelete}
                                                    size={1}
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
                            </ImageListItem>
                        );
                    })}
                    <ImageCarousel
                        images={picturesUrl}
                        authors={authors}
                        title={title}
                        open={open}
                        index={index}
                    />
                </div>
            </Grid>
        </div>
    );
}

export default Pictures;
