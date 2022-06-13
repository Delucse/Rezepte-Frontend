import React, {useEffect, useState} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getRecipes, resetFilterSettings } from '../actions/recipeFilterActions';

import { useNavigate } from "react-router-dom";

import moment from 'moment';

import Favourite from '../components/Recipes/Favourite';
import NotePaper from '../components/NotePaper';
import Loader from '../components/Loader';
import SearchBar from '../components/Recipes/SearchBar';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Icon from '@mdi/react';
import { mdiBarleyOff, mdiEggOffOutline, mdiFoodSteakOff, mdiClockOutline, mdiCalendar } from '@mdi/js';

function Recipes({route}){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, loading} = useSelector((state) => state.settings);
    const {word, sort, type, categories, recipes} = useSelector((state) => state.recipeFilter);

    const [oldType, setOldType] = useState(type);

    useEffect(() => {
        if(!(type !== oldType && word === '')){
            dispatch(getRecipes(route));
        }
        setOldType(type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, sort, type, categories, route, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetFilterSettings());
        };
    }, [dispatch])

    return(
        <div style={{marginTop: '-90px'}}>
            <div style={{paddingTop: '80px', marginBottom: 'calc(-24px + 50px + 20px)'}}>
                <SearchBar />
                {!loading && !error && recipes ?
                    recipes.length > 0 ?
                        <Grid container spacing={3}>
                            {recipes.map((recipe, index) => {
                                return(
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                        <NotePaper onClick={() => {navigate(`/rezepte/${recipe._id}`);}} style={{cursor: 'pointer'}} key={index}>
                                            <Box sx={{display: 'flex', marginBottom: '24px'}}>
                                                <Box sx={{fontWeight: 700, fontSize: '20px', lineHeight: '24px', marginRight: '5px', flexGrow: 1}}>
                                                    {recipe.title}
                                                </Box>
                                                <Box sx={{float: 'right', height: '24px'}}>
                                                    <Favourite/>
                                                </Box>
                                            </Box>
                                            <Box sx={{marginBottom: '24px'}}>
                                                <div style={{display: 'flex'}}>
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
                                            </Box>
                                            <Box sx={{height: 'calc(24px * 10)', marginBottom: '24px', width: 'calc(100% + 24px)'}}>
                                                <img 
                                                    src={recipe.pictures ? recipe.pictures[0].url : `${process.env.REACT_APP_API_URL}/media/${recipe.picture}`}
                                                    alt={recipe.title} 
                                                    style={{height: '100%', width: '100%', objectFit: 'cover'}}
                                                />
                                            </Box>
                                            <Box title="Gesamtzeit" sx={{display: 'flex'}}>
                                                <Icon path={mdiClockOutline} size={1} style={{color: 'inherit', marginRight: '10px', width: '24px'}}/>
                                                <Typography variant="body1">Gesamtzeit: {(recipe.time)/1000/60/60} Stunden</Typography>
                                            </Box>
                                            <Box sx={{display: 'flex'}}>
                                                <Icon path={mdiCalendar} size={1} style={{color: 'inherit', marginRight: '10px', width: '24px'}}/>
                                                <Typography variant="body1">{moment(recipe.date).format('DD.MM.YYYY, HH:mm:ss')} Uhr</Typography>
                                            </Box>
                                        </NotePaper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    : `Es konnten keine Rezepte mit dem angegebenen Suchwort "${word}" gefunden werden.`
                : 
                error ? 
                    <div>Error</div>
                :   <Loader top={189}/>}
            </div>
        </div>
   );
}

export default Recipes;