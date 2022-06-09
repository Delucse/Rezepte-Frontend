import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { setOpen } from '../../actions/recipeFilterActions';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Icon from '@mdi/react';
import { mdiFilterMenu } from '@mdi/js';


const drawerBleeding = 40;

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.primary.light,
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));


function Filter() {

    const dispatch = useDispatch();
    const { open, recipes } = useSelector(state => state.recipeFilter);

    const toggle = () => {
        dispatch(setOpen(!open));
    };

    return (
        <div>
            <Button
                sx={{margin: '0 5px', height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '56px', padding: 0}} 
                variant="contained"
                disableRipple
                onClick={toggle} 
            >
                <Icon path={mdiFilterMenu} size={1}/>
            </Button>
                            
            
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(100% - 55px - 54px - 96px - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggle}
                onOpen={toggle}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{zIndex: 1}}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        borderTop: theme => `1px solid ${theme.palette.primary.light}`,
                        height: `${drawerBleeding}px`,
                        background: 'white'
                    }}
                >
                    <Puller />
                    <Typography variant="body2" sx={{ padding: theme => `10px ${theme.spacing(3)}`, color: 'text.secondary' }}>
                        {recipes.length} Rezept{recipes.length !== 1 ? 'e': ''}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Skeleton variant="rectangular" height="100%" />
                </Box>
            </SwipeableDrawer>
            <Box sx={{position: 'fixed', bottom: `${drawerBleeding}px`, left: 0, backgroundColor: 'white', height: '20px', width: '100%', zIndex: 1}}></Box>
        </div>
    );
}

export default Filter;

