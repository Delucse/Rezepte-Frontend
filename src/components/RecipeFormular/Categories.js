import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setRecipeCategories } from "../../actions/recipeFormularActions";

import Keywords from "./Keywords";

import { Alert, Box, Checkbox, FormControlLabel, Grid, Divider } from "@mui/material";

function IndeterminateCheckbox(props) {

    const dispatch = useDispatch();
  
    const handleChangeAll = (event) => {
        if(event.target.checked){
            dispatch(setRecipeCategories(props.categories, props.objectKey));
        } else {
            dispatch(setRecipeCategories([], props.objectKey));
        }
    };
  
    const handleChange = (event) => {
        var categories = props.value ? props.value : [];
        if(event.target.checked){
            categories.push(event.target.value);
        } else {
            categories = categories.filter(cat => cat !== event.target.value);
        }
        dispatch(setRecipeCategories(categories, props.objectKey));
    };

    const handleChangeNot = (event) => {
        if(event.target.checked){
            dispatch(setRecipeCategories(false, props.objectKey));
        } else {
            dispatch(setRecipeCategories([], props.objectKey));
        }
    };

    return (
      <div>
        <FormControlLabel
          label={props.title}
          control={
            <Checkbox
                sx={props.error ? {color: theme => theme.palette.error.main} : {}}
                checked={props.value.length === props.categories.length}
                indeterminate={props.value ? props.value.length > 0 && props.value.length !== props.categories.length : props.value === false}
                onChange={handleChangeAll}
            />
          }
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {props.categories.map((category, index) => {
                return (
                    <FormControlLabel
                        key={index}
                        label={category}
                        control={
                            <Checkbox 
                                sx={props.error ? {color: theme => theme.palette.error.main} : {}}
                                checked={props.value && props.value.includes(category)} value={category} 
                                onChange={handleChange} 
                            />
                        }
                    />
                );
            })}
            <Divider sx={{borderBottomWidth: 'medium'}}/>
            <FormControlLabel
                label={'nichts zutreffend'}
                control={
                    <Checkbox 
                        sx={props.error ? {color: theme => theme.palette.error.main} : {}}
                        checked={props.value === false} 
                        onChange={handleChangeNot} 
                    />
                }
            />
        </Box>
        
      </div>
    );
  }

function Categories() {

    const recipe = useSelector((state) => state.recipeFormular);
    const {error, categories} = recipe;

    return(
        <div>
            {error.keywords || error.categories ? 
                <Box sx={{paddingBottom: '10px', position: 'sticky', top: 'calc(55px + 78px + 34px)', background: 'white', zIndex: 2}}>
                    {error.categories ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss jeweils mindestens eine Auswahlmöglichkeit ausgewählt werden. Es fehlen</Alert>
                    : null}
                    {error.keywords ?
                        <Alert severity="error" sx={{marginBottom: '10px', borderRadius: 0}}>Es muss mindestens ein Schlüsselwort hinzugefügt werden.</Alert>
                    : null}
                </Box>
            : null}
            <div style={{marginTop: '10px'}}/>
            
            
            <Grid container spacing={4} sx={{marginBottom: '40px'}}>
                {/* Lebensmittel */}
                <Grid item xs={12} sm={6} md={4}>
                    <IndeterminateCheckbox 
                        title='Lebensmittel' 
                        categories={['vegan', 'vegetarisch', 'glutenfrei', 'laktosefrei']} 
                        objectKey='ingredients' 
                        value={categories.ingredients}
                        error={error.categories && categories.ingredients && categories.ingredients.length === 0}
                    />
                </Grid>
                {/* Gericht */}
                <Grid item xs={12} sm={6} md={4}>
                    <IndeterminateCheckbox 
                        title='Gericht' 
                        categories={['Aperitif', 'Vorspeise', 'Hauptgang', 'Dessert', 'Frühstück', 'Kaffeetrinken']} 
                        objectKey='dish' 
                        value={categories.dish}
                        error={error.categories && categories.dish && categories.dish.length === 0}
                    />
                </Grid>
                {/* Saison */}
                <Grid item xs={12} sm={6} md={4}>
                    <IndeterminateCheckbox 
                        title='Saison' 
                        categories={['Frühling', 'Sommer', 'Herbst', 'Winter']} 
                        objectKey='season' 
                        value={categories.season}
                        error={error.categories && categories.season && categories.season.length === 0}
                    />
                </Grid>
                {/* Wärmegrad */}
                <Grid item xs={12} sm={6} md={4}>
                    <IndeterminateCheckbox 
                        title='Wärmegrad' 
                        categories={['kalt', 'lauwarm', 'heiß']} 
                        objectKey='heat' 
                        value={categories.heat}
                        error={error.categories && categories.heat && categories.heat.length === 0}
                    />
                </Grid>
            </Grid>
            
            <Keywords/>
        </div>
    );
}

export default Categories;