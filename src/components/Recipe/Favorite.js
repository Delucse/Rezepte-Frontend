import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    deleteRecipeFavorite,
    setRecipeFavorite,
} from '../../actions/recipeActions';

import IconButton from '../IconButton';

import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

function Favorite() {
    const dispatch = useDispatch();

    const check = useSelector((state) => state.recipe.favorite);

    return (
        <IconButton
            tooltipProps={{
                title: check
                    ? 'aus meinem Kochbuch entfernen'
                    : 'zu meinem Kochbuch hinzufügen',
                placement: 'right',
            }}
            id="favorite"
            sx={{
                marginBottom: '25px',
                width: '24.8px',
                height: '23px',
                background: (theme) => theme.palette.action.hover,
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={
                check
                    ? () => dispatch(deleteRecipeFavorite())
                    : () => dispatch(setRecipeFavorite())
            }
        >
            <Box id="heart" sx={{ display: 'flex' }}>
                <Icon path={check ? mdiHeart : mdiHeartOutline} size={1} />
            </Box>
            <Box id="heartHover" sx={{ display: 'none' }}>
                <Icon path={check ? mdiHeartOutline : mdiHeart} size={1} />
            </Box>
        </IconButton>
    );
}

export default Favorite;
