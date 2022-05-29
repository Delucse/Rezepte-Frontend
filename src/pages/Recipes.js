import React, {useEffect, useState} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from '../actions/settingsActions';

import { useNavigate } from "react-router-dom";

import axios from 'axios';

import Favourite from '../components/Favourite';
import NotePaper from '../components/NotePaper';
import Loader from '../components/Loader';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Icon from '@mdi/react';
import { mdiBarleyOff, mdiEggOffOutline, mdiFoodSteakOff } from '@mdi/js';

function Recipes(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState(null);
    const {error, loading} = useSelector((state) => state.settings);

    useEffect(() => {
        dispatch(setError(false));
        dispatch(setLoading(true));
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            onUploadProgress: progressEvent => {
              console.log('Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100/2) +' %');
            },
            onDownloadProgress: progressEvent => {
              console.log('Progress: ' + (50 + Math.round(progressEvent.loaded / progressEvent.total * 100/2)) +' %');
            }
          };
          axios.get(`${process.env.REACT_APP_API_URL}/recipe`, config)
            .then(res => {
                setRecipes(res.data);
                dispatch(setError(false));
                dispatch(setLoading(false));
            })
            .catch(err => {
              dispatch(setError(true));
              dispatch(setLoading(false));
            });
    }, [dispatch]);

    return(
        !loading && !error && recipes ? 
            <div style={{marginTop: '-10px'}}>
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
                                    <Box sx={{height: 'calc(24px * 10)', marginBottom: '24px', width: 'calc(100% + 24px)'}}>
                                        <img 
                                            src={recipe.pictures[0].url ? recipe.pictures[0].url : `${process.env.REACT_APP_API_URL}/media/${recipe.pictures[0].file}`}
                                            alt={recipe.title} 
                                            style={{height: '100%', width: '100%', objectFit: 'cover'}}
                                        />
                                    </Box>
                                    <Box>
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
                                </NotePaper>
                            </Grid>
                        );
                    })}
                </Grid>
                
                {/* <div style={{justifyContent: 'center', display: 'flex'}}><Button variant='contained' onClick={furtherItems}>weiter Rezepte laden</Button></div> */}
            </div>
        : 
        error ? 
            <div>Error</div>
        :   <Loader/>
   );
}

export default Recipes;