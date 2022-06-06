import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/authActions';

import { NavLink, useLocation } from 'react-router-dom';

import DelucseLogo from './DelucseLogo';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Icon from '@mdi/react';
import { mdiNotebookEdit, mdiMenu, mdiClose, mdiCog, mdiLoginVariant, mdiLogoutVariant, mdiFolderAccount, mdiFood, mdiFoodForkDrink, mdiBookOpenVariant, mdiHome, mdiMagnify, mdiQrcodeScan } from '@mdi/js';



function Navlink(props){
    const location = useLocation();

    return (props.auth === undefined || props.auth ?
            <NavLink 
                to={props.link} 
                end
                style={({ isActive }) => ({ 
                    fontWeight: isActive ? "700" : 'inherit',
                    textDecoration: 'none', 
                    color: isActive ? 'black': 'rgba(0, 0, 0, 0.54)'
                })}
                state={props.background ? { background: location } : {}}
            >
                <ListItem button onClick={props.onClick}>
                    <ListItemIcon sx={{color: 'inherit'}}><Icon path={props.icon} size={1}/></ListItemIcon>
                    <ListItemText primary={props.text} primaryTypographyProps={{fontWeight: 'inherit', color: 'black'}}/>
                </ListItem>
            </NavLink>
        : null
    )
}

const menue = [
    { text: 'Startseite', link: "/", icon: mdiHome },
    { text: 'Rezepte', link: "/rezepte", icon: mdiFood }
]

const userMenue = [
    { text: 'Mein Kochbuch', link: "/rezepte/favoriten", auth: true, icon: mdiBookOpenVariant },
    { text: 'Eigene Rezepte', link: "/rezepte/nutzer", auth: true, icon: mdiNotebookEdit },
    { text: 'Rezept erstellen', link: "/rezepte/formular", auth: true, icon: mdiFoodForkDrink },
    { text: 'Konto', link: "/konto", auth: true, icon: mdiFolderAccount },
    { text: 'Einstellungen', link: "/einstellungen", auth: true, icon: mdiCog },
    { text: 'Anmeldung', link: "/anmeldung", auth: false, background: true, icon: mdiLoginVariant }
];


function Navbar(){

    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const isAuthenticated = user !== null

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <div>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.modal + 1}}>
                <Toolbar sx={{height: '55px', minHeight: '55px !important', padding: (theme) => `0 ${theme.spacing(2)}`}}>
                    <IconButton edge="start" color="inherit" onClick={toggle}>
                        <Icon path={open ? mdiClose : mdiMenu} size={1.3}/>
                    </IconButton>
                    <NavLink exact="true" to={'/'} style={{display: 'inline', marginRight: '10px', flexGrow: 1}}>
                        <DelucseLogo style={{height: '25px', verticalAlign: 'text-bottom'}} />
                    </NavLink>
                    <IconButton edge="end" color="inherit">
                        <Icon path={mdiMagnify} size={1.3}/>
                    </IconButton>
                    <NavLink exact="true" to={'/qr'}>
                    <Box sx={{color: (theme) => theme.palette.primary.contrastText, marginLeft: '20px'}}>
                        <Icon path={mdiQrcodeScan} size={1}/>
                    </Box>
                    </NavLink>
                </Toolbar>
            </AppBar>
            <Toolbar sx={{height: '55px', minHeight: '55px !important'}}>
            </Toolbar>
            <SwipeableDrawer
                sx={{
                    '.MuiDrawer-paper': {
                        top: '55px',
                        width: '250px',
                        height: 'calc(100vh - 55px)'
                    }
                }}
                anchor={'left'}
                open={open}
                onClose={toggle}
                onOpen={toggle}
                ModalProps={{ keepMounted: true }}
            >
                <List>
                    {menue.map((item, index) => {
                        return (
                            <Navlink key={index} text={item.text} link={item.link} icon={item.icon} auth={item.auth ? isAuthenticated === item.auth : undefined} onClick={toggle}/>
                        );
                    })}
                </List>
                <Divider sx={{backgroundColor: (theme) => theme.palette.primary.main }} style={{ marginTop: 'auto' }} />
                <List>
                    {userMenue.map((item, index) => {
                        return (
                            <Navlink key={index} text={item.text} link={item.link} icon={item.icon} auth={item.auth !== undefined ? isAuthenticated === item.auth : undefined} onClick={toggle} background={item.background}/>
                        );
                    })}
                    {isAuthenticated ?
                        <ListItem button onClick={() => {dispatch(signout()); toggle();}}>
                            <ListItemIcon><Icon path={mdiLogoutVariant} size={1}/></ListItemIcon>
                            <ListItemText primary={'Abmelden'} primaryTypographyProps={{fontWeight: 'inherit', color: 'black'}}/>
                        </ListItem>
                    :   null}
                </List>
            </SwipeableDrawer>
        </div>
    );
}

export default Navbar;