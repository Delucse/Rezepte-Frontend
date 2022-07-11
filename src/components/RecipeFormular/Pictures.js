import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changePicturePosition, changePictures, removePicture } from "../../actions/recipeFormularActions";

import imageCompression from 'browser-image-compression';

import ImageCarousel from "../ImageCarousel";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Alert, Box, InputLabel,IconButton, Grid, ImageListItem , ImageListItemBar } from "@mui/material";

import Icon from '@mdi/react';
import { mdiDelete, mdiFullscreen, mdiCamera, mdiMenuLeft, mdiMenuRight } from '@mdi/js'; 

function PictureInput(props){

    const pictures = useSelector((state) => state.recipeFormular.pictures.order);

    const dispatch = useDispatch();

    const [drag, setDrag] = useState(false);
    const [counter, setCounter] = useState(0);


    const onHandleFileInput = async (targetFiles) => {

        targetFiles = [...targetFiles];

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
                console.error('image', e)  
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
            onHandleFileInput(e.dataTransfer.files);
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
                onChange={(e) => onHandleFileInput(e.target.files)}
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

    const pictures = useSelector((state) => state.recipeFormular.pictures.order);
    const picturesUrl = pictures.map(picture => !picture.id ? picture.url : `${process.env.REACT_APP_API_URL}/media/${picture.url}`);
    const title = useSelector((state) => state.recipeFormular.title);
    const errorPictures = useSelector((state) => state.recipeFormular.error.pictures);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(open){
            setOpen(false);
        }
    }, [open])

    const handleOpen = (i) => {
        setIndex(i);
        setOpen(true)
    }
        
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const col = lg ? 4 : md ? 3 : sm ? 2 : 1;

    return(
        <div>
            {errorPictures ?
                <Box sx={{paddingBottom: '10px', position: 'sticky', top: 'calc(55px + 78px + 34px)', background: 'white', zIndex: 2}}>
                    <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens ein Bild ausgewählt werden.</Alert>
                </Box>
            : null}
            <div style={{marginTop: '10px'}}/>
            <Grid item xs={12}>
                <PictureInput error={errorPictures}/>
                <div style={{width: '100%', listStyle: 'none', marginBottom: '16px', display: 'grid', gridGap: '0.4rem', gridTemplateColumns: `repeat(${col}, calc(100% / ${col} - 0.4rem * ${(-1+col)/col}))`}}>
                    {pictures.map((picture, idx) => {
                        return(
                            <ImageListItem key={idx} sx={idx===0 ? {border: theme => `4px solid ${theme.palette.primary.main}`, padding: '0px', height: '172px'} : {height: '180px'}}>
                                <img src={picturesUrl[idx]} alt='' style={{cursor: 'pointer', height: idx === 0 ? "172px" : '180px', objectFit: 'cover'}} onClick={() => handleOpen(idx)}/>
                                <ImageListItemBar
                                    actionPosition={'left'}
                                    actionIcon={
                                        <div style={{display: 'flex'}}>
                                            <div style={{flexGrow: 1, alignContent: 'center', display: 'flex'}}>
                                                <IconButton 
                                                    sx={{padding: 0, color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} 
                                                    onClick={() => dispatch(changePicturePosition(idx, idx-1))}
                                                    disableRipple
                                                    disabled={idx === 0}
                                                >
                                                    <Icon path={mdiMenuLeft} size={1.4} />
                                                </IconButton>
                                                <IconButton
                                                    sx={{padding: 0, color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} 
                                                    onClick={() => dispatch(changePicturePosition(idx, idx+1))}
                                                    disableRipple
                                                    disabled={idx === pictures.length - 1}
                                                >
                                                    <Icon path={mdiMenuRight} size={1.4} />
                                                </IconButton>
                                            </div>
                                            <IconButton 
                                                sx={{color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} 
                                                onClick={() => handleOpen(idx)}
                                                disableRipple
                                            >
                                                <Icon path={mdiFullscreen} size={1} />
                                            </IconButton>
                                            <IconButton
                                                sx={{color: "white", '&:hover': {color: theme => theme.palette.primary.main}}} 
                                                onClick={() => {dispatch(removePicture(picture.url))}}
                                                disableRipple
                                            >
                                                <Icon path={mdiDelete} size={1} />
                                            </IconButton>
                                        </div>
                                    }
                                    sx={{
                                        background: 'rgba(0, 0, 0, 0.25)',
                                        '.MuiImageListItemBar-titleWrap': {
                                            padding: 0
                                        },
                                        '.MuiImageListItemBar-actionIcon': {
                                            width: '100%'
                                        }
                                    }}
                                />
                            </ImageListItem>
                        );
                    })}
                    <ImageCarousel images={picturesUrl} title={title} open={open} index={index}/>
                </div>
            </Grid>
        </div>
    );
}

export default Pictures;