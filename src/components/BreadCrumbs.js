import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';


function BreadCrumbs(){

    const theme = useTheme();
    const {pathname, key} = useLocation();
    const paths = pathname.split('/').filter(path => path !== "");

    return (
        paths.length > 0 ?
            <div style={{zIndex: 1, position: 'sticky', top: 'calc(55px)'}}>
                <Breadcrumbs separator="›" sx={{height: '30px', padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`, background: 'white'}}>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <Box sx={{color: theme.palette.primary.light, '&:hover': {color: theme.palette.primary.main}}}>
                            <Icon path={mdiHome} size={1} style={{color: 'inherit'}}/>
                        </Box>
                    </Link>
                    {key !== 'default' ?
                    paths.map((path, index) => {
                        return (
                            index !== paths.length - 1 ?
                            <Box sx={{color: theme.palette.primary.light, '&:hover': {color: theme.palette.primary.main}}} key={index}>
                                <Link to={paths.slice(0, index+1).join('/')} style={{textDecoration: 'none', color: 'inherit'}}>
                                    {path}
                                </Link>
                                </Box>
                            :   <div key={index}>{path}</div>
                        );
                    }) : <div>Error</div>}
                </Breadcrumbs>
                <Box sx={{height: theme => theme.spacing(3), background: 'white'/*'linear-gradient(white 0%, transparent 60%)'*/}}/>
            </div>
        : <Box sx={{zIndex: 1, padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`, position: 'sticky', top: 'calc(55px)', background: 'white'/*'linear-gradient(white 0%, transparent 60%)'*/}}/>
    );
}

export default BreadCrumbs;