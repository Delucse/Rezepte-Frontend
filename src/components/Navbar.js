import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/authActions';
import { resetFilterSettings } from '../actions/recipeFilterActions';

import { NavLink, useLocation } from 'react-router-dom';

import DelucseLogo from './DelucseLogo';
import IconButton from './IconButton';
import Tooltip from './Tooltip';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
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
    mdiImageMultipleOutline,
    mdiChefHat,
    mdiFrequentlyAskedQuestions,
    // mdiBabyBottle,
    mdiReceiptTextEditOutline,
} from '@mdi/js';

function NavListItem(props) {
    return (
        <ListItem
            button
            onClick={props.onClick}
            sx={{
                fontWeight: props.isActive ? '700' : 'inherit',
                color: (theme) =>
                    props.isActive
                        ? theme.palette.text.primary
                        : theme.palette.text.secondary,
            }}
        >
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
    );
}

function Navlink(props) {
    const location = useLocation();
    const dispatch = useDispatch();

    const isActive = location.pathname === props.link;

    const onClick = () => {
        if (props.onClickDispatch && !isActive) {
            dispatch(props.onClickDispatch());
        }
        props.onClick();
    };

    return props.auth === undefined || props.auth ? (
        !isActive ? (
            <NavLink
                to={props.link}
                end
                style={{ textDecoration: 'none' }}
                state={{
                    background: props.background ? location : null,
                    reset: props.reset ? props.reset : null,
                }}
            >
                <NavListItem
                    onClick={onClick}
                    icon={props.icon}
                    text={props.text}
                />
            </NavLink>
        ) : (
            <NavListItem
                isActive
                onClick={onClick}
                icon={props.icon}
                text={props.text}
            />
        )
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
    // {
    //     text: 'Baby- & Kleinkinderrezepte',
    //     link: '/rezepte/kleinkind',
    //     onClickDispatch: resetFilterSettings,
    //     icon: mdiBabyBottle,
    // },
    {
        text: 'Grundrezepte',
        link: '/rezepte/basis',
        onClickDispatch: resetFilterSettings,
        icon: mdiChefHat,
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
    {
        text: 'Vorlagen',
        link: '/rezepte/vorlagen',
        auth: true,
        onClickDispatch: resetFilterSettings,
        icon: mdiReceiptTextEditOutline,
    },
    {
        text: 'Meine Bilder',
        link: '/bilder',
        auth: true,
        icon: mdiImageMultipleOutline,
    },
    { text: 'Konto', link: '/konto', auth: true, icon: mdiFolderAccount },
    {
        text: 'Anmelden',
        link: '/anmeldung',
        auth: false,
        background: true,
        icon: mdiLoginVariant,
    },
    { text: 'Einstellungen', link: '/einstellungen', icon: mdiCog },

    { text: 'FAQ', link: '/faq', icon: mdiFrequentlyAskedQuestions },
];

function Navbar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const pathname = useLocation().pathname;

    const isAuthenticated = user !== null;

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.navbar }}
                enableColorOnDark
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
                            sx={{ margin: '11.9px 8px' }}
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
                            onClick={() => setOpen(false)}
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
                        <Tooltip title="Suche">
                            <NavLink
                                exact="true"
                                to={'/suche'}
                                style={{
                                    margin: '11.9px 8px',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                                onClick={() => {
                                    setOpen(false);
                                    if (pathname !== '/suche') {
                                        dispatch(resetFilterSettings());
                                    }
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
                        </Tooltip>
                        <Tooltip title="QR-Code auslesen" arrow>
                            <NavLink
                                exact="true"
                                to={'/qr'}
                                style={{
                                    // height: '39px',
                                    margin: '11.9px 8px',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                                onClick={() => setOpen(false)}
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
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar
                sx={{ height: '55px', minHeight: '55px !important' }}
            ></Toolbar>
            <SwipeableDrawer
                sx={{
                    zIndex: (theme) => theme.zIndex.menu,
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
