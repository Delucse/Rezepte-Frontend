import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { submitRecipe } from "../../actions/recipeFormularActions";

import { useNavigate } from "react-router-dom";

import { Box, Alert, Button } from "@mui/material";
import Recipe from "../../pages/Recipe";


function Preview() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipeFormular);
    const {error, blocked} = recipe;
    const id = useSelector((state) => state.recipe.id);
    const preview = error.submit && (error.title || error.source || error.portion || error.time || error.keywords || error.ingredients.includes(true) || error.steps || error.pictures);

    useEffect(() => {
        if(!blocked && id){
            navigate(`/rezepte/${id}`)
        }
    }, [blocked, navigate, id])

    return(
        <div>
            {error.submit ? 
                preview ? 
                    <Box sx={{paddingBottom: '10px', position: 'sticky', top: 'calc(55px + 78px + 34px)', background: 'white', zIndex: 2}}>
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es gibt noch Fehler.</Alert>
                    </Box>
                :   <div style={{justifyItems: 'center', display: 'grid'}}>
                        <div style={{width: '100%'}}>
                            <Recipe/>
                        </div>
                        <Button variant="contained" sx={{borderRadius: 0, mt: '20px'}} onClick={() => dispatch(submitRecipe())}>Rezept veröffentlichen</Button>
                    </div>
            : null}
            <div style={{marginTop: '10px'}}/>
        </div>
    );
}

export default Preview;