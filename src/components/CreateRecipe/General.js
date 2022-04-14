import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setRecipeTitle } from "../../actions/recipeActions";

import Textfield from "../Textfield";

import Icon from '@mdi/react';
import { mdiCopyright, mdiTextShadow   } from '@mdi/js'; 
import { Button } from "@mui/material";

function General() {

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe);
    const {title} = recipe;

    const onChangeTitle = (e) => {
        dispatch(setRecipeTitle(e.target.value));
    };

    const updateTitle = () => {
        dispatch(setRecipeTitle(title+'Hallo'));
    }

    return(
        <div>
            <Textfield value={title} onChange={onChangeTitle} autoFocus property={'title'} label={'Titel'} start={<Icon path={mdiTextShadow } size={1}/>} end={<Button sx={{height: '100%', marginRight: '-22px', borderRadius: 0}} variant="contained" onClick={updateTitle}>Test</Button>}/>
            <Textfield property={'source'} label={'Quelle'} start={<Icon path={mdiCopyright} size={1}/>} placeholder='Test'/>
            <Textfield disabled placeholder='Quelle eingeben...' property={'source'} label={'Quelle'}/>
        </div>
    );
}

export default General;