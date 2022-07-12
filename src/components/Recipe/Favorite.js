import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteRecipeFavorite, setRecipeFavorite } from '../../actions/recipeActions';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { mdiHeart , mdiHeartOutline  } from '@mdi/js'; 

function Favorite(props){

    const dispatch = useDispatch();
    
    return (
        <Box>
            <IconButton
                id="favorite"
                sx={{
                    padding: '0px', 
                    marginBottom: '12px',
                    width: '24.8px',
                    color: theme => theme.palette.primary.light,
                    '&:hover': {
                        color: theme => theme.palette.primary.main
                    }
                }} 
                onClick={props.check ? () => dispatch(deleteRecipeFavorite()) : () => dispatch(setRecipeFavorite())}
                disableRipple
            >
                <Box id="heart" sx={{display: 'flex'}}><Icon path={props.check ? mdiHeart : mdiHeartOutline} size={1} /></Box>
                <Box id="heartHover" sx={{display: 'none'}}><Icon path={props.check ? mdiHeartOutline : mdiHeart} size={1} /></Box>
            </IconButton>
        </Box>
    );
}

export default Favorite;
