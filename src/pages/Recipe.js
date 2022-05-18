import React, { useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getRecipe, getRecipePreview, resetRecipe } from '../actions/recipeActions';

import { useParams  } from "react-router-dom";

import Fraction from '../components/Fraction';
import NotePaper from '../components/NotePaper';
import Portion from '../components/Recipe/Portion';

import { Grid, Box, List, ListItem, ListItemIcon, ListItemText, Chip, Typography } from "@mui/material";

import Icon from '@mdi/react';
import { mdiBarleyOff, mdiClockOutline, mdiEggOffOutline, mdiFoodSteakOff  } from '@mdi/js';

function Recipe(){

    const {id} = useParams ();

    const dispatch = useDispatch();
    const recipe = useSelector((state) => state.recipe);
    const {error, loading} = useSelector((state) => state.settings);

    useEffect(() => {
        if(id){
            dispatch(getRecipe(id));
        } else {
            dispatch(getRecipePreview());
        }
        return () => {      
            dispatch(resetRecipe());
        }; 
    }, [id, dispatch]);

    return(
        !loading && !error && recipe.title ? 
            <NotePaper>
                {/* Titel */}
                <div style={{fontWeight: 700, fontSize: '22px', lineHeight: '24px', marginBottom: '24px'}}>{recipe.title}</div>

                <Grid container spacing={0} sx={{marginBottom: '24px'}}>
                    <Grid item xs={12} sm={6} sx={{height: 'calc(24px * 10)'}}>
                         <img 
                            src={recipe.pictures[0].url ? recipe.pictures[0].url : `${process.env.REACT_APP_API_URL}/media/${recipe.pictures[0].file}`}
                            alt={recipe.title} 
                            style={{border: '1px solid black', height: '100%', width: '100%', objectFit: 'cover'}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{paddingLeft: {xs: 0, sm: '20px'}, marginTop: {xs: '24px', sm: 0}}}>
                        <div style={{display: 'flex', marginBottom: '24px'}}>
                            {recipe.keywords.includes('vegetarisch') || recipe.keywords.includes('vegan') ?
                                <Box title="vegetarisch" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                    <Icon path={mdiFoodSteakOff} size={0.8} style={{color: 'inherit'}}/>
                                </Box>
                            : null}
                            {recipe.keywords.includes('vegan') ?
                                <Box title="vegan" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                    <Icon path={mdiEggOffOutline} size={0.8} style={{color: 'inherit'}}/>
                                </Box>
                            : null}
                            {recipe.keywords.includes('glutenfrei') ?
                                <Box title="glutenfrei" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                    <Icon path={mdiBarleyOff} size={0.8} style={{color: 'inherit'}}/>
                                </Box>
                            : null}
                            {recipe.keywords.includes('laktosefrei') ?
                                <Box title="laktosefrei" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                    <Icon path={mdiBarleyOff} size={0.8} style={{color: 'inherit'}}/>
                                </Box>
                            : null}
                        </div>
                        <div style={{marginBottom: '24px'}}>
                            <Box title="Zubereitungzeit" sx={{'&:hover': {color: theme => theme.palette.primary.light}, color: theme => theme.palette.primary.main, marginRight: '10px', display: 'flex'}}>
                                <Icon path={mdiClockOutline} size={1} style={{color: 'inherit', marginRight: '10px', width: '24px'}}/><Typography variant="body1">Zubereitungzeit: {(recipe.time.preparation)/1000/60/60} Stunden</Typography>
                            </Box>
                            <Box title="Wartezeit" sx={{'&:hover': {color: theme => theme.palette.primary.light}, color: theme => theme.palette.primary.main, marginRight: '10px', display: 'flex'}}>
                                <Icon path={mdiClockOutline} size={1} style={{color: 'inherit', marginRight: '10px'}}/><Typography variant="body1">Wartezeit: {(recipe.time.resting)/1000/60/60} Stunden</Typography>
                            </Box>
                            <Box title="Koch-/Backzeit" sx={{'&:hover': {color: theme => theme.palette.primary.light}, color: theme => theme.palette.primary.main, marginRight: '10px', display: 'flex'}}>
                                <Icon path={mdiClockOutline} size={1} style={{color: 'inherit', marginRight: '10px'}}/><Typography variant="body1">Koch-/Backzeit: {(recipe.time.baking)/1000/60/60} Stunden</Typography>
                            </Box>
                        </div>
                        {/* Portion */}
                        <Portion />
                    </Grid>
                </Grid>

                {/* Zutaten */}
                <Grid container spacing={0}>
                    {recipe.ingredients.map((ingredient, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index} sx={{marginBottom: '24px'}}>
                                <List sx={{lineHeight: '24px', padding: 0}}>
                                    <ListItem disablePadding>
                                        <Typography variant="body1" sx={{fontWeight: 700}}>
                                            {`Zutaten für ${ingredient.title}`}
                                        </Typography>
                                    </ListItem>
                                    {ingredient.food.map((food, index) => {
                                        return (
                                            <ListItem disablePadding key={index}>
                                                <ListItemIcon sx={{minWidth: '25px'}}>
                                                    -
                                                </ListItemIcon>
                                                <ListItemIcon sx={{minWidth: '0px', color: 'black', marginRight: '4px'}}>
                                                    <Typography variant="body1">{recipe.portion.volume > 0 ? <Fraction decimal={food.amount * (recipe.settings.count / recipe.portion.count) * (recipe.settings.volume / recipe.portion.volume)} /> : <Fraction decimal={food.amount * (recipe.settings.count / recipe.portion.count)} />}</Typography>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${food.unit} ${food.aliment}`}
                                                    sx={{margin: 0}}
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Grid>
                        );
                    })}
                </Grid>

                <List sx={{lineHeight: '24px', padding: 0, marginBottom: '24px'}}>
                    <ListItem disablePadding>
                        <Typography variant="body1" sx={{fontWeight: 700}}>
                            Arbeitsschritte
                        </Typography>
                    </ListItem>
                    {recipe.steps.map((step, index) => {
                        return (
                            <ListItem disablePadding key={index}>
                                <ListItemIcon sx={{minWidth: '25px'}}>
                                    {`${index + 1}.`}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{margin: 0}}
                                    primary={step}
                                />
                            </ListItem>
                        );
                    })}
                </List>

                {/* Schlagwörter */}
                <div style={{marginTop: '-5px'}}>
                    {recipe.keywords.map((keyword, index) => {
                        return (
                            <Chip
                                sx={{marginTop: '7px', marginRight: '5px', height: '19px', marginBottom: '-2px'}}
                                key={index} 
                                label={keyword}
                                color="primary"
                            />
                        );
                    })}
                </div>

            </NotePaper>
        : 
            error ? 
                <div>Error</div>
            :   <div>Rezept lädt ...</div>
   );
}

export default Recipe;