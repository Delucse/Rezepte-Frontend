import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';


function BreadCrumbs(){

    const theme = useTheme();
    const {pathname} = useLocation();
    const paths = pathname.split('/').filter(path => path !== "");
    console.log(paths)

    return (
        paths.length > 0 ?
            <Breadcrumbs separator="›" sx={{marginBottom: '10px'}}>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                    <Box sx={{color: theme.palette.secondary.main, '&:hover': {color: theme.palette.primary.main}}}>
                        <Icon path={mdiHome} size={1} style={{color: 'inherit'}}/>
                    </Box>
                </Link>
                {paths.map((path, index) => {
                    return (
                        index !== paths.length - 1 ?
                        <Box sx={{color: theme.palette.secondary.main, '&:hover': {color: theme.palette.primary.main}}}>
                            <Link to={paths.slice(0, index+1).join('/')} style={{textDecoration: 'none', color: 'inherit'}} key={index}>
                                {path}
                            </Link>
                            </Box>
                        :   <div key={index}>{path}</div>
                    );
                })}
            </Breadcrumbs>
        : null
    );
}

export default BreadCrumbs;