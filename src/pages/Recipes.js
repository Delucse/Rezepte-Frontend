import React, {useEffect, useState} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getRecipes, resetFilterSettings, setRoute } from '../actions/recipeFilterActions';

import Loader from '../components/Loader';
import SearchBar from '../components/Recipes/SearchBar';
import Overview from '../components/Recipes/Overview';

import Grid from '@mui/material/Grid';

function Recipes(props){

    const dispatch = useDispatch();
    const {error, loading} = useSelector((state) => state.settings);
    const {word, sort, type, categories, recipes, route} = useSelector((state) => state.recipeFilter);

    const [oldType, setOldType] = useState(type);

    useEffect(() => {
        if(props.route !== route){
            dispatch(resetFilterSettings());
            dispatch(setRoute(props.route));
        }
        if(!(type !== oldType && word === '')){
            dispatch(getRecipes());
        }
        setOldType(type);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, sort, type, categories, props.route, dispatch]);

    return(
        <div style={{marginTop: '-90px'}}>
            <div style={{paddingTop: '80px', marginBottom: 'calc(-24px + 50px + 20px)'}}>
                <SearchBar />
                {!loading && !error && recipes ?
                    recipes.length > 0 ?
                        <Grid container spacing={3}>
                            {recipes.map((recipe, index) => 
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                                    <Overview 
                                        id={recipe._id}
                                        title={recipe.title}
                                        picture={`${process.env.REACT_APP_API_URL}/media/${recipe.picture}`}
                                        keywords={recipe.keywords}
                                        time={recipe.time}
                                        date={recipe.date}
                                        rotate={Math.floor(Math.random() * (10 - (-10) + 1)) + (-10)}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    : `Es konnten keine Rezepte mit ${word !== '' ? `dem angegebenen Suchwort "${word}"` : ''} ${word !== '' && categories.length > 0 ? 'und' : ''} ${categories.length > 0 ? `den angegebenen Filtern "${categories.join('", "')}"` : ''} gefunden werden.`
                : 
                error ? 
                    <div>Error</div>
                :   <Loader top={189}/>}
            </div>
        </div>
   );
}

export default Recipes;