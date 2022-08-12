import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addPicture } from '../../actions/recipeActions';
import {
    alertErrorMessage,
    snackbarMessage,
} from '../../actions/messageActions';

import { Link } from 'react-router-dom';

import imageCompression from 'browser-image-compression';

import axios from 'axios';

import Dialog from '../Dialog';
import Button from '../Button';
import IconButton from '../IconButton';
import Tooltip from '../Tooltip';
import Alert from '../Alert';

import {
    Typography,
    Box,
    InputLabel,
    ImageListItem,
    ImageListItemBar,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiCameraPlus, mdiCamera, mdiDelete, mdiLoading } from '@mdi/js';

function AddImage(props) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.recipe.id);
    const pictures = useSelector((state) => state.recipe.pictures);
    const user = useSelector((state) => state.auth.user);
    const picturesLength = pictures.filter((pic) => pic.user === user).length;

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(false);
    const [drag, setDrag] = useState(false);
    const [counter, setCounter] = useState(0);

    const onHandleFileInput = async (targetFiles) => {
        targetFiles = [...targetFiles];

        var error = false;
        var index = 0;
        while (!error && index < targetFiles.length) {
            if (
                !['image/jpeg', 'image/png'].includes(targetFiles[index].type)
            ) {
                error = true;
            }
            index += 1;
        }
        if (error) {
            dispatch(
                alertErrorMessage(
                    'Das hochzuladene Bild hat ein falsches Dateiformat. Gültige Bildformate sind ".png", ".jpg" und ".jpeg".',
                    'images'
                )
            );
            return;
        }

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 600,
            useWebWorker: true,
            // onProgress: (percent) => {console.log(percent)}
        };
        const promises = targetFiles.map((file) => {
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
        });
        const files = await Promise.all(promises);
        changeImage(files[0]);
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

    const changeImage = (file) => {
        const url = URL.createObjectURL(file);
        const img = { file: file, url };
        setImage(img);
    };

    const submit = () => {
        setProgress(true);
        var body = new FormData();
        body.append('picture', image.file);

        const config = {
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/recipe/image/${id}`,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data', // necessary to upload files
            },
            onUploadProgress: (progressEvent) => {
                // console.info('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
            },
            onDownloadProgress: (progressEvent) => {
                // console.info('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
            },
            success: (res) => {
                dispatch(addPicture(res.data.image));
                setOpen(false);
                setImage(null);
                setProgress(false);
                dispatch(
                    snackbarMessage(
                        'Dein Bild wurde erfolgreich hochgeladen.',
                        `image-${res.data.image}`
                    )
                );
            },
            error: (err) => {
                if (err.response.status !== 401) {
                    setProgress(false);
                }
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

    return user ? (
        <div>
            <Tooltip title="Bild hinzufügen" placement="left">
                <Box sx={{ color: (theme) => theme.palette.primary.main }}>
                    <Icon
                        path={mdiCameraPlus}
                        size={1}
                        onClick={() => setOpen(true)}
                        style={{ cursor: 'pointer', padding: 8 }}
                    />
                </Box>
            </Tooltip>
            <Dialog
                open={open}
                onClose={!progress ? () => setOpen(false) : null}
                closeIcon={!progress}
                title={'Bild hinzufügen'}
                fullWidth
                content={
                    <div>
                        <Alert type={'images'} reset />
                        {picturesLength < 4 ? (
                            image === null ? (
                                <div
                                    onDragEnter={handleDragIn}
                                    onDragLeave={handleDragOut}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={(e) =>
                                            onHandleFileInput(e.target.files)
                                        }
                                        name="picture"
                                        id="picture-button-file"
                                        type="file"
                                    />
                                    <InputLabel
                                        htmlFor="picture-button-file"
                                        sx={{
                                            color: (theme) =>
                                                props.error
                                                    ? theme.palette.error.main
                                                    : theme.palette.action
                                                          .active,
                                            '&:hover': {
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            },
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
                                                border: (theme) =>
                                                    drag
                                                        ? `2px dashed ${theme.palette.primary.main}`
                                                        : props.error
                                                        ? `2px dashed ${theme.palette.error.main}`
                                                        : `2px dashed ${theme.palette.action.active}`,
                                            }}
                                        >
                                            <div
                                                style={{ textAlign: 'center' }}
                                            >
                                                <Icon
                                                    path={mdiCamera}
                                                    size={2}
                                                />
                                                <br />
                                                Bilder wählen
                                            </div>
                                        </Box>
                                    </InputLabel>
                                </div>
                            ) : (
                                <ImageListItem
                                    sx={{ height: '180px', width: '100%' }}
                                >
                                    <img
                                        src={image.url}
                                        alt=""
                                        style={{
                                            height: '180px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <ImageListItemBar
                                        actionIcon={
                                            !progress ? (
                                                <IconButton
                                                    sx={{
                                                        padding: '8px',
                                                        color: 'white',
                                                        '&:hover': {
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setImage(null);
                                                    }}
                                                >
                                                    <Icon
                                                        path={mdiDelete}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            ) : null
                                        }
                                        sx={{
                                            background: 'rgba(0, 0, 0, 0.25)',
                                            '.MuiImageListItemBar-titleWrap': {
                                                padding: 0,
                                            },
                                        }}
                                    />
                                </ImageListItem>
                            )
                        ) : (
                            <Alert
                                error
                                message={
                                    <div>
                                        Du hast die maximale Anzahl von vier
                                        Bildern je Nutzer je Rezept erreicht und
                                        musst eines deiner bisherigen Bilder
                                        löschen, bevor du ein neues Bild
                                        hochladen kannst:{' '}
                                        <Link
                                            to={'/bilder'}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#ef5350',
                                            }}
                                        >
                                            Bilder verwalten
                                        </Link>
                                        .
                                    </div>
                                }
                                style={{ margin: 0 }}
                            />
                        )}
                    </div>
                }
                actions={
                    !progress ? (
                        <div>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setOpen(false);
                                    setImage(null);
                                }}
                                sx={{ mr: 1 }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                disabled={image === null}
                                variant="contained"
                                onClick={submit}
                            >
                                Bestätigen
                            </Button>
                        </div>
                    ) : (
                        <Box
                            sx={{
                                height: '36.5px',
                                color: (theme) => theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                path={mdiLoading}
                                size={1}
                                spin={0.9}
                                style={{ marginRight: '10px' }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                Bild wird hochgeladen
                            </Typography>
                        </Box>
                    )
                }
            />
        </div>
    ) : null;
}

export default AddImage;
