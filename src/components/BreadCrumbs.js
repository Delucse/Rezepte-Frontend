import React from 'react';

import { useSelector } from 'react-redux';

import { Link, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';


function GetRecipeTitle(){
    const title = useSelector(state => state.recipe.title);
    
    return (
        title ? 
            <div>{title}</div>
        :   <div>lädt ...</div>
    )
}

function RecipeSearch(){
    const { word, type } = useSelector(state => state.recipeFilter); 
    return (
        <div>
            {type === 'all' ? 
                "Suche" 
            :   type === 'title' ? 
                'Titelsuche' 
            :   type === 'ingredients' ? 
                'Zutatensuche' 
            :   type === 'keywords' ?
                'Schlüsselwortsuche' 
            :   type === 'steps' ? 
                'Arbeitsschrittsuche' 
            : 'Suche'}{word !== '' ? ` von "${word}"` : ''}
        </div>
    )
}

const routes = [
    {   pathname: /^\/$/i,
        params: [], 
        breadcrumbs: []
    },
    {   pathname: /^\/(anmeldung|registrierung)$/i, 
        breadcrumbs: []
    },
    {   pathname: /^\/rezepte$/i, 
        params: [],
        breadcrumbs: [
            {title: <RecipeSearch/>, pathname: '/suche'},
            {title: 'Rezepte'}
        ]
    },
    {   pathname: /^\/rezepte\/nutzer$/i, 
        params: [],
        breadcrumbs: [
            {title: <RecipeSearch/>, pathname: '/suche'},
            {title: 'Rezepte', pathname: '/rezepte'},
            {title: 'Nutzer'},
        ]
    },
    {   pathname: /^\/rezepte\/favoriten$/i, 
        params: [],
        breadcrumbs: [
            {title: <RecipeSearch/>, pathname: '/suche'},
            {title: 'Rezepte', pathname: '/rezepte'},
            {title: 'Favoriten'},
        ]
    },
    {   pathname: /^\/rezepte\/.{24}$/i, 
        params: ['id'],
        breadcrumbs: [
            {title: <RecipeSearch/>, pathname: '/suche'},
            {title: 'Rezepte', pathname: '/rezepte'},
            {title: 'Nutzer', pathname: '/rezepte/nutzer', condition: 'nutzer'},
            {title: 'Favoriten', pathname: '/rezepte/favoriten', condition: 'favoriten'},
            {title: <GetRecipeTitle/>},
        ]
    },
    {   pathname: /^\/rezepte\/formular$/i, 
        params: [],
        breadcrumbs: [
            {title: 'Rezepte', pathname: '/rezepte'},
            {title: 'Formular'},
        ]
    },
    {   pathname: /^\/rezepte\/formular\/.{24}$/i, 
        params: ['id'],
        breadcrumbs: [
            {title: 'Rezepte', pathname: '/rezepte'},
            {title: <GetRecipeTitle/>, pathname: '/rezepte/:id', params: 'id', replace: '/rezepte/'},
            {title: 'Formular'},
        ]
    },
    {   
        pathname: /^\/suche$/i, 
        params: [],
        breadcrumbs: [
            {title: <RecipeSearch/>}
        ]
    },
    {   
        pathname: /^\/konto$/i, 
        params: [],
        breadcrumbs: [
            {title: 'Konto'}
        ]
    },
    {   
        pathname: /^\/einstellungen$/i, 
        params: [],
        breadcrumbs: [
            {title: 'Einstellungen'}
        ]
    },
    {   
        pathname: /^\/qr$/i, 
        params: [],
        breadcrumbs: [
            {title: 'QR-Code auslesen'}
        ]
    },
    {   
        pathname: /^.*$/i, 
        // params: ['*'],
        breadcrumbs: [
            {title: 'Error'}
        ]
    },
]

function BreadCrumbs(){

    const route = useSelector(state => state.recipeFilter.route);

    const location = useLocation();
    const pathname = location.state && location.state.background ? location.state.background.state && location.state.background.state.background ? location.state.background.state.background.pathname : location.state.background.pathname : location.pathname;

    var params = useParams();
    var keyParams = Object.keys(params);
    if(/\/(anmeldung|registrierung)/.test(location.pathname)){
        if(/^\/rezepte(\/formular\/|\/).{24}$/i.test(pathname)){
            keyParams = ['id'];
        } else {
            keyParams = [];
        }
    }
    
    const currentRoute = routes.filter(route => {
        if(route.hasOwnProperty("params")){
            return route.pathname.test(pathname) && JSON.stringify(route.params) === JSON.stringify(keyParams);
        }
        return route.pathname.test(pathname);
    })[0];

    var breadcrumbs = currentRoute.breadcrumbs.map(bc => {
        if(bc.params){
            if(bc.pathname.includes(`:${bc.params}`)){
                bc.pathname = bc.pathname.replace(`:${bc.params}`, params[bc.params]);
            } else {
                bc.pathname = `${bc.replace}${params[bc.params]}`;
            }   
        }
        return bc;
    });

    breadcrumbs = breadcrumbs.filter(bc => {
        return (!bc.hasOwnProperty("condition")) || (bc.hasOwnProperty("condition") && bc.condition === route);
    });

    return (
        breadcrumbs.length > 0 ?
            <div style={{zIndex: 1, position: 'sticky', top: 'calc(55px)'}}>
                <Box sx={{height: '30px', background: 'white', padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`, width: theme => `calc(100% - 2 * ${theme.spacing(3)})`, overflowY: 'hidden'}}>
                    <Box sx={{overflowX: 'auto', overflowY: 'hidden', display: 'flex'}}>
                        <Breadcrumbs 
                            separator="›" 
                            sx={{ 
                                marginBottom: '10px',
                                '.MuiBreadcrumbs-ol': {
                                    flexWrap: 'nowrap'
                                },
                                '.MuiBreadcrumbs-li': {
                                    width: 'max-content'
                                }
                            }}
                        >
                            <Link to={'/'} style={{textDecoration: 'none'}}>
                                <Box sx={{color: theme => theme.palette.primary.light, '&:hover': {color: theme =>  theme.palette.primary.main}}}>
                                    <Icon path={mdiHome} size={1} style={{color: 'inherit'}}/>
                                </Box>
                            </Link>
                            {breadcrumbs.map(({pathname, title}, index) => {
                                return (
                                    index !== breadcrumbs.length - 1 ?
                                        <Box sx={{color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} key={index}>
                                            <Link to={pathname} style={{textDecoration: 'none', color: 'inherit'}}>
                                                {title}
                                            </Link>
                                        </Box>
                                    :   <div key={index}>{title}</div>
                            )})}
                        </Breadcrumbs>
                    </Box>
                </Box>                
                <Box sx={{height: theme => theme.spacing(3), background: 'white'/*'linear-gradient(white 0%, transparent 60%)'*/}}/>
            </div>
        :   currentRoute.hasOwnProperty("params") || (location.state && location.state.background && location.state.background.pathname === '/') ?
                <Box sx={{zIndex: 1, padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 0px ${theme.spacing(3)}`, position: 'sticky', top: 'calc(55px)', background: 'white'/*'linear-gradient(white 0%, transparent 60%)'*/}}/>
            :   <Box sx={{zIndex: 1, padding: theme => `${theme.spacing(3)} ${theme.spacing(3)} 54px ${theme.spacing(3)}`, position: 'sticky', top: 'calc(55px)', background: 'white'/*'linear-gradient(white 0%, transparent 60%)'*/}}/>
    );
}

export default BreadCrumbs;