import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import imageCompression from 'browser-image-compression';
import axios from 'axios';

import Dialog from '../Dialog';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import Icon from '@mdi/react';
import { mdiCameraPlus, mdiCamera, mdiDelete } from '@mdi/js';
import { addPicture } from '../../actions/recipeActions';

function AddImage(props) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.recipe.id);
    const user = useSelector((state) => state.auth.user);

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [drag, setDrag] = useState(false);
    const [counter, setCounter] = useState(0);

    const onHandleFileInput = async (targetFiles) => {
        targetFiles = [...targetFiles];

        if (targetFiles.length > 1) {
            alert(
                'Insgesamt zu viele Bilder. Es darf nur maximal ein Bilder hochgeladen werden.'
            );
            return;
        }

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
            alert('Falsches Dateiformat.');
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
        var body = new FormData();
        body.append('picture', image.file);

        const config = {
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/recipe/${id}/image`,
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

    return user ? (
        <div>
            <Box sx={{ color: (theme) => theme.palette.primary.main }}>
                <Icon
                    path={mdiCameraPlus}
                    size={1}
                    onClick={() => setOpen(true)}
                    style={{ cursor: 'pointer', padding: 8 }}
                />
            </Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                title={'Bild hinzufügen'}
                fullWidth
                content={
                    <div>
                        {image === null ? (
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
                                                : theme.palette.action.active,
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
                                        <div style={{ textAlign: 'center' }}>
                                            <Icon path={mdiCamera} size={2} />
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
                                        <IconButton
                                            sx={{
                                                color: 'white',
                                                '&:hover': {
                                                    color: (theme) =>
                                                        theme.palette.primary
                                                            .main,
                                                },
                                            }}
                                            onClick={() => {
                                                setImage(null);
                                            }}
                                            disableRipple
                                        >
                                            <Icon path={mdiDelete} size={1} />
                                        </IconButton>
                                    }
                                    sx={{
                                        background: 'rgba(0, 0, 0, 0.25)',
                                        '.MuiImageListItemBar-titleWrap': {
                                            padding: 0,
                                        },
                                    }}
                                />
                            </ImageListItem>
                        )}
                    </div>
                }
                actions={
                    <div>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpen(false);
                                setImage(null);
                            }}
                            sx={{ borderRadius: 0, mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            disabled={image === null}
                            variant="contained"
                            onClick={submit}
                            sx={{ borderRadius: 0 }}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </div>
    ) : null;
}

export default AddImage;
