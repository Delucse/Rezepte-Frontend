import React from 'react';

import { useDispatch } from 'react-redux';
import {
    deleteRecipeFavorite,
    setRecipeFavorite,
} from '../../actions/recipeActions';

import IconButton from '../IconButton';

import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';

function Favorite(props) {
    const dispatch = useDispatch();

    return (
        <IconButton
            tooltipProps={{
                title: props.check
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
                props.check
                    ? () => dispatch(deleteRecipeFavorite())
                    : () => dispatch(setRecipeFavorite())
            }
        >
            <Box id="heart" sx={{ display: 'flex' }}>
                <Icon
                    path={props.check ? mdiHeart : mdiHeartOutline}
                    size={1}
                />
            </Box>
            <Box id="heartHover" sx={{ display: 'none' }}>
                <Icon
                    path={props.check ? mdiHeartOutline : mdiHeart}
                    size={1}
                />
            </Box>
        </IconButton>
    );
}

export default Favorite;
