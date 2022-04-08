import React, {useState} from 'react';

import { NavLink } from 'react-router-dom';

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
import { mdiMenu, mdiClose, mdiCog, mdiFolderAccount, mdiImageMultiple, mdiBookOpenVariant, mdiHome, mdiForum, mdiMagnify, mdiQrcodeScan } from '@mdi/js';


function Navlink(props){
    return (
        <NavLink 
            to={props.link} 
            end
            style={({ isActive }) => ({ 
                fontWeight: isActive ? "700" : 'inherit',
                textDecoration: 'none', 
                color: isActive ? 'black': 'rgba(0, 0, 0, 0.54)'
            })}
        >
            <ListItem button onClick={props.onClick}>
                <ListItemIcon sx={{color: 'inherit'}}><Icon path={props.icon} size={1}/></ListItemIcon>
                <ListItemText primary={props.text} primaryTypographyProps={{fontWeight: 'inherit', color: 'black'}}/>
            </ListItem>
        </NavLink>
    )
}

const menue = [
    { text: 'Startseite', link: "/", icon: mdiHome },
    { text: 'Titel ändern', link: "/test", icon: mdiForum },
    { text: 'Bilder', link: "/bilder", icon: mdiImageMultiple },
    { text: 'Bilder hinzufügen', link: "/test2", icon: mdiForum }
]

const userMenue = [
    { text: 'Mein Kochbuch', link: "/rezepte", icon: mdiBookOpenVariant  },
    { text: 'Konto', link: "/konto", icon: mdiFolderAccount },
    { text: 'Einstellungen', link: "/einstellungen", icon: mdiCog }
];


function Navbar(){

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
                            <Navlink key={index} text={item.text} link={item.link} icon={item.icon} onClick={toggle}/>
                        );
                    })}
                </List>
                <Divider sx={{backgroundColor: (theme) => theme.palette.primary.main }} style={{ marginTop: 'auto' }} />
                <List>
                    {userMenue.map((item, index) => {
                        return (
                            <Navlink key={index} text={item.text} link={item.link} icon={item.icon} onClick={toggle}/>
                        );
                    })}
                </List>
            </SwipeableDrawer>
        </div>
    );
}

export default Navbar;