import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changePictures, removePicture, onDragEndPicture } from "../../actions/recipeActions";

import { ReactSortable } from "react-sortablejs";

import imageCompression from 'browser-image-compression';


import Icon from '@mdi/react';
import { mdiDelete, mdiFullscreen, mdiCamera } from '@mdi/js'; 

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Alert, Box, InputLabel, Dialog, DialogContent, DialogTitle, IconButton, Grid, ImageListItem , ImageListItemBar } from "@mui/material";


function PictureInput(props){

    const recipe = useSelector((state) => state.recipe);
    var {pictures} = recipe;

    const dispatch = useDispatch();

    const [drag, setDrag] = useState(false);
    const [counter, setCounter] = useState(0);


    const onHandleFileInput = async (e) => {

        var targetFiles = [...e.target.files];

        if(targetFiles.length + pictures.length > 4){
            alert('Insgesamt zu viele Bilder. Es dürfen nur maximal vier Bilder hochgeladen werden.')
            return
        }

        var error = false
        var index = 0
        while (!error && index < targetFiles.length){
            if(!["image/jpeg","image/png"].includes(targetFiles[index].type)){
            error = true;
            }
            index += 1;
        }
        if(error){
            alert('Falsches Dateiformat.')
            return;
        }

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 600,
            useWebWorker: true,
            // onProgress: (percent) => {console.log(percent)}
        }
        const promises = targetFiles.map(file =>  {
            return imageCompression(file, options)
            .then(compressedBlob => {
                // Conver the blob to file
                return new File([compressedBlob], file.name, { type: file.type, lastModified: Date.now()})
            })
            .catch(e => {
            console.log('image', e)  
            });
        })
        const files = await Promise.all(promises);
        dispatch(changePictures(files))
    }
        
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounter(counter+1);
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setDrag(true);
        }
    }
    
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCounter(counter-1);
        if (counter === 0) {
          setDrag(false)
        }
      }
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          dispatch(changePictures(e.dataTransfer.files));
          // e.dataTransfer.clearData()
          setCounter(0);
        }
      }
    

    return (
        <div 
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input
                style={{display: 'none'}}
                accept="image/*"
                onChange={onHandleFileInput}
                name="picture"
                id="picture-button-file"
                type="file"
                multiple
            />
            <InputLabel htmlFor="picture-button-file" sx={{color: theme => props.error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.54)', '&:hover': {color: theme => theme.palette.primary.main}}}>
                <Box 
                    sx={{
                        fontSize: '1rem',
                        cursor:"pointer",
                        height: `calc(180px - 2 * 10px - 2 * 1.6px)`,
                        justifyContent: "center",
                        alignItems: "center",
                        display:"flex",
                        padding: "10px",
                        // marginTop: '16px',
                        marginBottom: pictures.length > 0 ? '0.4rem' : '16px',
                        border: theme => drag ? `2px dashed ${theme.palette.primary.main}` : props.error ? `2px dashed ${theme.palette.error.main}` : "2px dashed rgba(0, 0, 0, 0.54)"
                    }}
                >
                    <div style={{textAlign: "center"}}>
                        <Icon path={mdiCamera} size={2} />
                        <br/>
                        Bilder wählen
                    </div>
                </Box>
            </InputLabel>
        </div>
    );
}

function Pictures() {

    const dispatch = useDispatch();

    const recipe = useSelector((state) => state.recipe);
    var {pictures, error} = recipe;

    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    
    const handleClickOpen = (title, url) => {
        setTitle(title);
        setUrl(url)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const col = lg ? 4 : md ? 3 : sm ? 2 : 1;

    return(
        <div>
            {error.pictures ?
                <Box sx={{paddingBottom: '10px', marginTop: '-10px', position: 'sticky', top: theme => `calc(55px + 30px + 2 * ${theme.spacing(3)} + 20px + 10px)`, background: 'white', zIndex: 2}}>
                    <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens ein Bild ausgewählt werden.</Alert>
                </Box>
            : null}
            <div style={error.pictures ? {marginTop: '10px'} : {}}/>
            <Grid item xs={12}>
                <PictureInput error={error.pictures}/>
                {pictures.length > 0 ?
                    <ReactSortable
                        animation={200}
                        list={pictures}
                        setList={newState => dispatch(onDragEndPicture(newState))}
                        style={{width: '100%', listStyle: 'none', marginBottom: '16px', display: 'grid', gridGap: '0.4rem', gridTemplateColumns: `repeat(${col}, calc(100% / ${col} - 0.4rem * ${(-1+col)/col}))`}}
                    >
                        {pictures.map((picture, index) => {
                            return(
                                <ImageListItem key={index} sx={index===0 ? {border: theme => `4px solid ${theme.palette.primary.main}`, padding: '0px', height: '180px'} : {height: '180px'}}>
                                    <img src={picture.url} alt={picture.title}  style={{cursor: 'pointer', height: "180px", objectFit: 'cover'}}/>
                                    <ImageListItemBar
                                        title={picture.title}
                                        actionIcon={
                                            <div>
                                                <IconButton sx={{color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} onClick={() => handleClickOpen(picture.title, picture.url)}>
                                                    <Icon path={mdiFullscreen} size={1} />
                                                </IconButton>
                                                <IconButton sx={{color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} onClick={() => {dispatch(removePicture(picture.url))}}>
                                                    <Icon path={mdiDelete} size={1} />
                                                </IconButton>
                                            </div>
                                        }
                                    />
                                </ImageListItem>
                            );
                        })}
                    </ReactSortable>
                : 
                    null
                }
                <Dialog
                    sx={{zIndex: 1500}}
                    PaperProps={{
                        sx: {borderRadius: 0}
                    }}
                    fullWidth={true}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle style={{padding: "10px 24px"}}>{title}</DialogTitle>
                    <DialogContent style={{padding: "0px", display: 'contents'}}>
                        <img src={url} width="100%" alt={title}/>
                    </DialogContent>
                    {/* <DialogActions style={{padding: "10px 24px"}}>
                        <IconButton style={{padding: "0px"}} color="primary" aria-label='Vollbild' onClick={handleClose}>
                            <Icon path={mdiClose} size={1}/>
                        </IconButton>
                    </DialogActions> */}
                </Dialog>
            </Grid>
        </div>
    );
}

export default Pictures;