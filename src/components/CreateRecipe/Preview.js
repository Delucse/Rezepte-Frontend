import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { checkRecipeError, submitRecipe } from "../../actions/recipeActions";

import { Box, Alert, Button } from "@mui/material";

function Preview() {

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe);
    const {error} = recipe;

    useEffect(() => {    
        dispatch(checkRecipeError());
    });

    return(
        <div>
            {error.submit ? 
                error.title || error.source || error.portion || error.time || error.keywords || error.ingredients.includes(true) || error.steps || error.pictures ? 
                    <Box sx={{paddingBottom: '10px', marginTop: '-10px', position: 'sticky', top: theme => `calc(55px + 30px + 2 * ${theme.spacing(3)} + 20px + 10px)`, background: 'white', zIndex: 2}}>
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es gibt noch Fehler.</Alert>
                    </Box>
                :   <div>Alles okay! TODO: Preview
                        <div>
                            <Button variant="contained" sx={{borderRadius: 0}} onClick={() => dispatch(submitRecipe())}>Submit</Button>
                        </div>
                    </div>
            : null}
            <div style={error.pictures ? {marginTop: '10px'} : {}}/>
        </div>
    );
}

export default Preview;