import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiFilterMenu, mdiMagnify, mdiSwapVertical } from '@mdi/js';

function HideOnScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger();
  
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

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

function SwipeableEdgeDrawer(props) {

    const [open, setOpen] = React.useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <div style={{marginBottom: '86px'}}> {/* Navbar: 790x + Recipe-Shadow: mind. 4, aber hier 10px */}
            
            <HideOnScroll {...props}>
                <AppBar sx={{background: 'White', boxShadow: 'none', top: 'calc(55px + 54px + 24px)', padding: theme => `0 ${theme.spacing(3)}`}}>
                    <Toolbar sx={{padding: '0px !important', display: 'initial'}}>
                        <div style={{display: 'flex', paddingBottom: '20px'}}>
                            <Textfield 
                                placeholder="Suchwort ..."
                                start={
                                    <Icon path={mdiMagnify} size={1}/>
                                }
                            />
                            <Button
                                sx={{margin: '0 5px', height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '56px', padding: 0}} 
                                variant="contained"
                                onClick={toggle} 
                            >
                                <Icon path={mdiFilterMenu} size={1}/>
                            </Button>
                            <Button
                                sx={{height: '56px', borderRadius: 0, boxShadow: 'none', minWidth: '56px', padding: 0}} 
                                variant="contained" 
                            >
                                <Icon path={mdiSwapVertical} size={1}/>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            
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
                    onClick={toggle}
                >
                    <Puller />
                    <Typography variant="body2" sx={{ padding: theme => `10px ${theme.spacing(3)}`, color: 'text.secondary' }}>51 Rezepte</Typography>
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

export default SwipeableEdgeDrawer;

