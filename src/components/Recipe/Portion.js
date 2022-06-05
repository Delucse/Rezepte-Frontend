import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRecipeSettings } from '../../actions/recipeActions';


import Dialog from '../Dialog';
import Autocomplete from "../Autocomplete";
import Textfield from "../Textfield";

import { Typography, IconButton, Button, Box, Alert } from "@mui/material";

import Icon from '@mdi/react';
import { mdiPencil, mdiCupcake, mdiRotateLeft } from '@mdi/js';

import bakeware from '../../data/bakeware.json';

const bakewares = bakeware.concat([{
    "volume": 2, 
    "name": "individuelle Backform",
    "group": "Sonstiges"
}])

function Portion() {

    const dispatch = useDispatch();
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(settings.count);
    const [volume, setVolume] = useState(settings.volume);
    const [individual, setIndividual] = useState(0);
    const [errorVolume, setErrorVolume] = useState(false);
    const [errorCount, setErrorCount] = useState(false);

    useEffect(() => {
        setCount(settings.count);
        setVolume(settings.volume);
    }, [open, settings])

    const portionAdd = () => {
        if(!isNaN(count)){
            setCount(parseInt(count) + 1);    
        } else {
            setErrorCount(false);
            setCount(1);
        }
    }

    const portionReduce = () => {
        if(!isNaN(count)){
            var parsedCount = parseInt(count);
            if (parsedCount !== count) {
                parsedCount += 1
            }
            setCount(parsedCount - 1);
        } else {
            setErrorCount(false);
            setCount(1);
        }
    }

    const setPortion = (portion) => {
        const portionDecimal = portion.replace(',','.');
        if(!isNaN(portionDecimal) && portionDecimal > 0){
            setErrorCount(false);
        } else {
            setErrorCount(true);
        }
        setCount(portion);
    }

    const reset = () => {
        setCount(portion.count);
        setVolume(portion.volume);
    }

    const cancel = () => {
        setOpen(false)
    }

    const confirm = () => {
        var countDecimal = count
        if(typeof(countDecimal) === 'string'){
            countDecimal = countDecimal.replace(',','.');
        }
        if(volume === 2){
            dispatch(setRecipeSettings(Number(countDecimal), individual));
        } else {
            dispatch(setRecipeSettings(Number(countDecimal), volume));
        }
        setOpen(false);
    }

    const setV = (volume) => {
        if(volume > 2){
            setErrorVolume(false);
            setVolume(volume);
        } else if(volume === 2){
            setErrorVolume(true);
            setVolume(volume);
        } else {
            setErrorVolume(true);
            setVolume(1);
        }
    }

    const setArea = (e) => {
        if(e.target.value > 2){
            setErrorVolume(false);
        } else {
            setErrorVolume(true);
        }
        setIndividual(e.target.value);
    }

    return(
        <div>
            <div style={{display: 'flex'}}>
                <Typography style={{lineHeight: '24px'}} variant="body1">
                    für {settings.count.toLocaleString()}{settings.volume > 0 ? bakeware.filter(bake => bake.volume === settings.volume).length > 0 ? `x ${bakeware.filter(bake => bake.volume === settings.volume)[0].name}` : 'x individuelle Backform' : ` Portion${settings.count !== 1 ? 'en' : ''}`}
                </Typography>
                <IconButton 
                    sx={{height: 'inherit', width: '24px', marginLeft: '5px', padding: 0}} 
                    color="primary"
                    onClick={() => setOpen(true)}
                    disableRipple
                >
                    <Icon path={mdiPencil} size={1}/>
                </IconButton>
            </div>
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={'Portionsangabe ändern'}
                noPadding
                content={
                    <Box sx={{marginTop: 2}}>
                        {errorCount ? <Alert severity="error" sx={{marginBottom: '20px', borderRadius: 0}}>Gib eine positive Zahl an.</Alert> : null}
                        {errorVolume ? <Alert severity="error" sx={{marginBottom: '20px', borderRadius: 0}}>{volume !== 2 ? 'Wähle eine Backform aus.' : 'Gebe einen Flächeninhalt in cm² an (mind. 3 cm²).'}</Alert> : null}
                        <Box sx={{display: {xs: volume > 0 ? 'inherit' : 'flex', sm: 'flex'}}}>
                            <div style={{display: 'flex', width: '95px', marginRight: '10px'}}>
                                <Button
                                    disabled={count <= 1}
                                    sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '23px', padding: 0}} 
                                    variant="contained" 
                                    onClick={portionReduce}
                                >
                                    -
                                </Button>
                                <Textfield 
                                    value={count.toString().replace('.',',')} 
                                    style={{width: '49px'}} 
                                    onChange={(e) => setPortion(e.target.value)}
                                    error={errorCount}
                                />
                                <Button
                                    sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '23px', padding: 0}} 
                                    variant="contained" 
                                    onClick={portionAdd}
                                >
                                    +
                                </Button>
                            </div>
                            <Box  sx={{display: 'flex',  marginTop: {xs: volume > 0 ? '20px' : 0, sm: 0}, width: {xs: '100%', sm: 'calc(100% - 95px - 10px)'}}}>
                                { volume > 0 ?
                                    <Autocomplete
                                        value={bakewares.filter(bake => bake.volume === volume)[0]}
                                        onChange={setV}
                                        options={bakewares}
                                        optionLabel={'name'}
                                        optionGroup={'group'}
                                        optionChange={'volume'}
                                        label={'Backform'}
                                        start={<Icon path={mdiCupcake} size={1}/>}
                                        fullWidth={true}
                                        style={{marginRight: '10px'}}
                                        error={errorVolume && volume === 1}                        
                                    />
                                : <div style={{marginRight: '10px', lineHeight: '56px', flexGrow: 1}}>Portion{count !== 1 ? 'en' : ''}</div>}
                                <Button
                                    sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '56px', padding: 0}} 
                                    variant="contained" 
                                    onClick={reset}
                                >
                                    <Icon path={mdiRotateLeft} size={1}/>
                                </Button>
                            </Box> 
                        </Box>
                        {volume === 2 ? 
                            <Box sx={{ml: {sm: '105px'}, mt: 2}}>
                                <Textfield 
                                    label='Flächenangabe'
                                    error={errorVolume && individual === 2} 
                                    type='number'
                                    value={individual}
                                    onChange={setArea} 
                                    autoFocus
                                />
                            </Box> 
                        : null}
                    </Box>
                }
                actions={
                    <div>
                        <Button variant="outlined" onClick={cancel} sx={{borderRadius: 0, mr: 1}}>
                            Abbrechen
                        </Button>
                        <Button variant="contained" onClick={confirm} sx={{borderRadius: 0}} disabled={errorCount || errorVolume}>
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </div>
    );
}

export default Portion;