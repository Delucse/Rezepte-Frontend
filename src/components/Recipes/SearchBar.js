import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import Sort from './Sort';
import Filter from './Filter';
import Search from './Search';


function HideOnScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger();
  
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


function SearchBar(props) {

    return (
        <div style={{marginBottom: '86px'}}> {/* Navbar: 790x + Recipe-Shadow: mind. 4, aber hier 10px */}
            
            <HideOnScroll {...props}>
                <AppBar sx={{background: 'White', boxShadow: 'none', top: 'calc(55px + 54px + 24px)', padding: theme => `0 ${theme.spacing(3)}`}}>
                    <Toolbar sx={{padding: '0px !important', display: 'initial'}}>
                        <div style={{display: 'flex', paddingBottom: '20px'}}>
                            <Search />
                            <Filter />
                            <Sort />
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}

export default SearchBar;

