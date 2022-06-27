import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRecipeTitle, setRecipeSource } from "../../actions/recipeFormularActions";

import Textfield from "../Textfield";
import Portion from "./Portion";
import Time from "./Time";

import Icon from '@mdi/react';
import { mdiCopyright, mdiTextShadow   } from '@mdi/js'; 

import { Alert, Box } from "@mui/material";

function General() {

    const dispatch = useDispatch();
    const title = useSelector((state) => state.recipeFormular.title);
    const source = useSelector((state) => state.recipeFormular.source);
    const errorTitle = useSelector((state) => state.recipeFormular.error.title);
    const errorSource = useSelector((state) => state.recipeFormular.error.source);
    const errorPortion = useSelector((state) => state.recipeFormular.error.portion);
    const errorTime = useSelector((state) => state.recipeFormular.error.time);

    const onChangeTitle = (e) => {
        dispatch(setRecipeTitle(e.target.value));
    };

    const onChangeSource = (e) => {
        dispatch(setRecipeSource(e.target.value));
    };

    return(
        <div>
            {errorTitle || errorSource || errorPortion || errorTime ? 
                <Box sx={{paddingBottom: '10px', position: 'sticky', top: 'calc(55px + 78px + 34px)', background: 'white', zIndex: 2}}>
                    {errorTitle ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss ein Titel gewählt werden.</Alert>
                    : null}
                    {errorSource ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens eine Quelle genant werden.</Alert>
                    : null}
                    {errorPortion ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss eine Portionsangabe gemacht werden.</Alert>
                    : null}
                    {errorTime ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens eine Zeitangabe gemacht werden.</Alert>
                    : null}
                </Box>
            : null}
            <div style={{marginTop: '10px'}}/>
            
            <Textfield
                error={errorTitle}
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
                error={errorSource}
                value={source}
                onChange={onChangeSource}
                property={'source'} 
                label={'Quelle'}
                margin
                start={<Icon path={mdiCopyright} size={1}/>} 
            />

            {/* Portionen */}
            <Portion/>

            <Time />
        </div>
    );
}

export default General;