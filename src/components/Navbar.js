import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/authActions';
import { resetFilterSettings } from '../actions/recipeFilterActions';

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
import {
    mdiNotebookEdit,
    mdiMenu,
    mdiClose,
    mdiCog,
    mdiLoginVariant,
    mdiLogoutVariant,
    mdiFolderAccount,
    mdiFood,
    mdiFoodForkDrink,
    mdiBookOpenVariant,
    mdiHome,
    mdiMagnify,
    mdiQrcodeScan,
} from '@mdi/js';

import { useTheme } from '@mui/material';

function Navlink(props) {
    const theme = useTheme();

    const location = useLocation();
    const dispatch = useDispatch();

    const onClick = () => {
        if (props.onClickDispatch) {
            dispatch(props.onClickDispatch());
        }
        props.onClick();
    };

    return props.auth === undefined || props.auth ? (
        <NavLink
            to={props.link}
            end
            style={({ isActive }) => ({
                fontWeight: isActive ? '700' : 'inherit',
                textDecoration: 'none',
                color: isActive
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
            })}
            state={{
                background: props.background ? location : null,
                reset: props.reset ? props.reset : null,
            }}
        >
            <ListItem button onClick={onClick}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                    <Icon path={props.icon} size={1} />
                </ListItemIcon>
                <ListItemText
                    primary={props.text}
                    primaryTypographyProps={{
                        fontWeight: 'inherit',
                        color: 'inherit',
                    }}
                />
            </ListItem>
        </NavLink>
    ) : null;
}

const menue = [
    { text: 'Startseite', link: '/', icon: mdiHome },
    {
        text: 'Suche',
        link: '/suche',
        onClickDispatch: resetFilterSettings,
        icon: mdiMagnify,
    },
    {
        text: 'Rezepte',
        link: '/rezepte',
        onClickDispatch: resetFilterSettings,
        icon: mdiFood,
    },
];

const userMenue = [
    {
        text: 'Mein Kochbuch',
        link: '/rezepte/favoriten',
        auth: true,
        onClickDispatch: resetFilterSettings,
        icon: mdiBookOpenVariant,
    },
    {
        text: 'Eigene Rezepte',
        link: '/rezepte/nutzer',
        auth: true,
        onClickDispatch: resetFilterSettings,
        icon: mdiNotebookEdit,
    },
    {
        text: 'Rezept erstellen',
        link: '/rezepte/formular',
        auth: true,
        icon: mdiFoodForkDrink,
    },
    { text: 'Konto', link: '/konto', auth: true, icon: mdiFolderAccount },
    { text: 'Einstellungen', link: '/einstellungen', icon: mdiCog },
    {
        text: 'Anmeldung',
        link: '/anmeldung',
        auth: false,
        background: true,
        icon: mdiLoginVariant,
    },
];

function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const isAuthenticated = user !== null;

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
            >
                <Toolbar
                    sx={{
                        height: '55px',
                        minHeight: '55px !important',
                        padding: (theme) => `0 ${theme.spacing(2)}`,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '12.5px',
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={toggle}
                            disableRipple
                            sx={{ padding: 0, height: '39px', margin: '8px' }}
                        >
                            <Icon path={open ? mdiClose : mdiMenu} size={1.3} />
                        </IconButton>
                        <NavLink
                            exact="true"
                            to={'/'}
                            style={{
                                display: 'inline',
                                margin: '8px 10px 8px 5px',
                                padding: '7px 0',
                            }}
                        >
                            <DelucseLogo
                                style={{
                                    height: '25px',
                                    verticalAlign: 'text-bottom',
                                }}
                            />
                        </NavLink>
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: '16px',
                            display: 'flex',
                        }}
                    >
                        <NavLink
                            exact="true"
                            to={'/suche'}
                            style={{
                                height: '39px',
                                margin: '8px',
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <Box
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Icon path={mdiMagnify} size={1.3} />
                            </Box>
                        </NavLink>
                        <NavLink
                            exact="true"
                            to={'/qr'}
                            style={{
                                height: '39px',
                                margin: '8px',
                                alignItems: 'center',
                                display: 'flex',
                            }}
                        >
                            <Box
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Icon path={mdiQrcodeScan} size={1} />
                            </Box>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar
                sx={{ height: '55px', minHeight: '55px !important' }}
            ></Toolbar>
            <SwipeableDrawer
                sx={{
                    '.MuiDrawer-paper': {
                        top: '55px',
                        width: '250px',
                        height: 'calc(100vh - 55px)',
                    },
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
                            <Navlink
                                key={index}
                                text={item.text}
                                link={item.link}
                                icon={item.icon}
                                auth={
                                    item.auth
                                        ? isAuthenticated === item.auth
                                        : undefined
                                }
                                onClick={toggle}
                                onClickDispatch={item.onClickDispatch}
                            />
                        );
                    })}
                </List>
                <Divider
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                    }}
                    style={{ marginTop: 'auto' }}
                />
                <List>
                    {userMenue.map((item, index) => {
                        return (
                            <Navlink
                                key={index}
                                text={item.text}
                                link={item.link}
                                icon={item.icon}
                                auth={
                                    item.auth !== undefined
                                        ? isAuthenticated === item.auth
                                        : undefined
                                }
                                onClick={toggle}
                                background={item.background}
                                onClickDispatch={item.onClickDispatch}
                            />
                        );
                    })}
                    {isAuthenticated ? (
                        <ListItem
                            button
                            onClick={() => {
                                dispatch(signout());
                                toggle();
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                }}
                            >
                                <Icon path={mdiLogoutVariant} size={1} />
                            </ListItemIcon>
                            <ListItemText
                                primary={'Abmelden'}
                                primaryTypographyProps={{
                                    fontWeight: 'inherit',
                                    color: (theme) =>
                                        theme.palette.text.secondary,
                                }}
                            />
                        </ListItem>
                    ) : null}
                </List>
            </SwipeableDrawer>
        </div>
    );
}

export default Navbar;
