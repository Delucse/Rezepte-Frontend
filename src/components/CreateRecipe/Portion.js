import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRecipePortion } from "../../actions/recipeActions";

import Textfield from "../Textfield";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button, MenuItem, InputLabel, Select, InputAdornment } from "@mui/material";

import Icon from '@mdi/react';
import { mdiCupcake } from '@mdi/js'; 


function Portion() {

    const dispatch = useDispatch();
    const {portion, error} = useSelector((state) => state.recipe);
    const { count, volume } = portion;

    const portionAdd = () => {
        dispatch(setRecipePortion(count + 1, volume))
    }

    const portionReduce = () => {
        dispatch(setRecipePortion(count - 1, volume))
    }

    const isDish = (e) => {
        if(e.target.value === '0'){
            dispatch(setRecipePortion(count, 0))
        } else {
            dispatch(setRecipePortion(count, 1));
        } 
    }

    const setVolume = (e) => {
        dispatch(setRecipePortion(count, parseInt(e.target.value)))
    }

    return(
        <div style={{marginBottom: '20px'}}>
            <FormControl>
                <FormLabel id="Portionen">Portionen</FormLabel>
                <RadioGroup
                    row
                    name="Portionen"
                    value={volume > 0 ? 1 : volume < 0 ? -1 : 0}
                    onChange={isDish}
                >
                    <FormControlLabel value={0} control={<Radio sx={error.portion && volume < 0 ? {color: theme => theme.palette.error.main} : {}}/>} label="Gericht" />
                    <FormControlLabel value={1} control={<Radio sx={error.portion && volume < 0 ? {color: theme => theme.palette.error.main} : {}}/>} label="Gebäck" />
                </RadioGroup>
            </FormControl>
            {volume >= 0 ?
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', width: '110px'}}>
                        <Button
                            disabled={count <= 1}
                            sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '23px', padding: 0}} 
                            variant="contained" 
                            onClick={portionReduce}
                        >
                            -
                        </Button>
                        <Textfield disabled value={count} error={count === 0 && error.portion}/>
                        <Button
                            sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '23px', padding: 0}} 
                            variant="contained" 
                            onClick={portionAdd}
                        >
                            +
                        </Button>
                    </div> 
                    { volume > 0 ?
                        <FormControl fullWidth sx={{marginLeft: '20px'}} error={error.portion && volume === 1}>
                            <InputLabel id="volume">Backform</InputLabel>
                            <Select
                                sx={{borderRadius: '0px'}}
                                defaultOpen
                                labelId="volume"
                                value={volume}
                                label='Backform'
                                onChange={setVolume}
                                startAdornment={
                                    <InputAdornment sx={{maxHeight: '56px', height: '56px'}} position="start">
                                        <Icon path={mdiCupcake} size={1}/>
                                    </InputAdornment>
                                }
                            >   
                                <MenuItem value={10}>28er-Form</MenuItem>
                                <MenuItem value={20}>26er-Form</MenuItem>
                                <MenuItem value={30}>Backblech</MenuItem>
                            </Select>
                        </FormControl> 
                    : null}
                </div>
            : null}
        </div>
    );
}

export default Portion;