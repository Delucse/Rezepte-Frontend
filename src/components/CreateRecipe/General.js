import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRecipeTitle, setRecipeSource } from "../../actions/recipeActions";

import Textfield from "../Textfield";
import Portion from "./Portion";
import Keywords from "./Keywords";

import Icon from '@mdi/react';
import { mdiCopyright, mdiTextShadow   } from '@mdi/js'; 

import { Button, Alert, Box } from "@mui/material";

function General() {

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe);
    const {title, source, error} = recipe;

    const onChangeTitle = (e) => {
        dispatch(setRecipeTitle(e.target.value));
    };

    const onChangeSource = (e) => {
        dispatch(setRecipeSource(e.target.value));
    };

    const updateTitle = () => {
        dispatch(setRecipeTitle(title+'Hallo'));
    }

    return(
        <div>
            {error.title || error.source || error.portion || error.keywords ? 
                <Box sx={{paddingBottom: '10px', marginBottom: '10px', marginTop: '-10px', position: 'sticky', top: theme => `calc(55px + 30px + 2 * ${theme.spacing(3)} + 20px + 10px)`, background: 'white', zIndex: 2}}>
                    {error.title ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss ein Titel gewählt werden.</Alert>
                    : null}
                    {error.source ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens eine Quelle genant werden.</Alert>
                    : null}
                    {error.portion ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss eine Portionsangabe gemacht werden.</Alert>
                    : null}
                    {error.keywords ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens ein Schlüsselwort hinzugefügt werden.</Alert>
                    : null}
                </Box>
             : null}
             <div style={error.title || error.source || error.portion || error.keywords ? {marginTop: '10px'} : {}}/>
            
            <Textfield
                error={error.title}
                value={title} 
                onChange={onChangeTitle} 
                autoFocus 
                property={'title'} 
                label={'Titel'}
                margin
                start={
                    <Icon path={mdiTextShadow } size={1}/>
                } 
                // end={
                //     <Button 
                //         sx={{height: '100%', marginRight: '-22px', borderRadius: 0, boxShadow: 'none'}} 
                //         variant="contained" 
                //         onClick={updateTitle}
                //     >
                //         Test
                //     </Button>
                // }
            />
            <Textfield 
                error={error.source}
                value={source}
                onChange={onChangeSource}
                property={'source'} 
                label={'Quelle'}
                margin
                start={<Icon path={mdiCopyright} size={1}/>} 
            />

            {/* Portionen */}
            <Portion/>
            
            <Keywords/>
        </div>
    );
}

export default General;