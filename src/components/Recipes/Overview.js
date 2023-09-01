import React, { useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    deleteRecipePrototype,
    deleteRecipesFavorite,
    setRecipesFavorite,
} from '../../actions/recipeFilterActions';

import { Link } from 'react-router-dom';

import moment from 'moment';

import { useInViewport } from '../../hooks/useInViewport';

import Ripped from './Ripped';
import Tape from '../Tape';
import Button from '../Button';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Icon from '@mdi/react';
import {
    mdiDotsHorizontal,
    mdiClockOutline,
    mdiCalendar,
    mdiEggOffOutline,
    mdiFoodSteakOff,
    mdiBarleyOff,
    mdiImageOffOutline,
    mdiDelete,
} from '@mdi/js';
import Dialog from '../Dialog';
import { Typography } from '@mui/material';
import Textfield from '../Textfield';

const msToHoursAndMinutes = (time) => {
    var t = time / 1000 / 60 / 60;
    var hour = Math.trunc(t);
    var minute = Math.round((t - hour) * 60);
    return `${hour > 0 ? `${hour} Stunde${hour === 1 ? '' : 'n'} ` : ''}${
        minute > 0 ? `${minute} Minute${minute === 1 ? '' : 'n'}` : ''
    }`;
};

function Overview(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const route = useSelector((state) => state.recipeFilter.route);

    const elemRef = useRef();
    const inViewport = useInViewport(elemRef);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');

    const cancel = () => {
        setTitle('');
        setOpenDialog(false);
    };

    return (
        <div style={{ height: props.fullscreen ? '100%' : 'max-content' }}>
            {props.fullscreen ? null : (
                <Tape
                    rotate={props.rotate}
                    top
                    heart={user && route !== 'vorlage'}
                    check={props.favorite}
                    onClick={
                        user && route !== 'vorlage'
                            ? props.favorite
                                ? () =>
                                      dispatch(deleteRecipesFavorite(props.id))
                                : () => dispatch(setRecipesFavorite(props.id))
                            : null
                    }
                />
            )}
            <Link
                to={`/rezepte/${
                    route !== 'vorlage'
                        ? props.id
                        : `formular/vorlagen/${props.id}`
                }`}
                style={{ textDecoration: 'none' }}
            >
                <Box
                    sx={{
                        height: 'inherit',
                        margin: !props.fullscreen ? '2px 0' : 0,
                        background: (theme) => theme.palette.action.hover,
                        boxShadow: props.fullscreen
                            ? 'none'
                            : (theme) =>
                                  `0 1px 4px ${theme.palette.action.disabled}`, // original: hsla(0,0%,0%,.25)
                        position: 'relative',
                        backgroundImage: (theme) =>
                            `radial-gradient(transparent 21%, transparent 21%), radial-gradient(transparent 10%, transparent 12%), linear-gradient(to top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,0) 95%, ${`${theme.palette.primary.light}33`} 95%, ${`${theme.palette.primary.light}33`} 100%)`,
                        backgroundPosition: '0px 6px, 6px 5px, 50% 18px',
                        backgroundRepeat: 'repeat-y, repeat-y, repeat',
                        backgroundSize: '48px 48px, 48px 48px, 24px 24px',
                        cursor: 'pointer',
                    }}
                >
                    {props.picture || props.fullscreen ? (
                        <Box
                            ref={elemRef}
                            sx={{
                                height: !props.fullscreen
                                    ? 'calc(24px * 10)'
                                    : 'calc(100% - 64px)',
                                width: 'calc(100%)',
                                position: 'relative',
                                backgroundImage:
                                    inViewport && props.picture
                                        ? `url(${props.picture})`
                                        : 'none',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                            }}
                        >
                            {!props.picture ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        color: (theme) =>
                                            theme.palette.action.hover,
                                        background: (theme) =>
                                            theme.palette.primary.light,
                                        display: 'grid',
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        path={mdiImageOffOutline}
                                        size={'100%'}
                                    />
                                </Box>
                            ) : null}
                            <Ripped />
                        </Box>
                    ) : null}
                    <Box
                        sx={{
                            display: 'flex',
                            padding: !props.fullscreen
                                ? '20px 18px'
                                : '16px 18px 20px 18px',
                        }}
                    >
                        <Box
                            sx={{
                                fontWeight: 700,
                                fontFamily: 'Lobster Two',
                                fontSize: '24px',
                                lineHeight: !props.fullscreen ? '24px' : '28px',
                                flexGrow: 1,
                                marginRight: !props.fullscreen ? '5px' : 0,
                                color: (theme) => theme.palette.text.primary,
                                overflow: !props.fullscreen
                                    ? 'inherit'
                                    : 'hidden',
                                textOverflow: !props.fullscreen
                                    ? 'inherit'
                                    : 'ellipsis',
                                whiteSpace: !props.fullscreen
                                    ? 'inherit'
                                    : 'nowrap',
                            }}
                        >
                            {props.title ? props.title : 'unbekannter Titel'}
                        </Box>
                        {!props.fullscreen ? (
                            route !== 'vorlage' ? (
                                <Button
                                    tooltipProps={{
                                        title: 'weitere Informationen',
                                    }}
                                    sx={{
                                        float: 'right',
                                        height: '24px',
                                        minWidth: '20px',
                                        padding: 0,
                                    }}
                                    onClick={handleClick}
                                >
                                    <Icon path={mdiDotsHorizontal} size={1} />
                                </Button>
                            ) : (
                                <Button
                                    tooltipProps={{
                                        title: 'löschen',
                                    }}
                                    sx={{
                                        float: 'right',
                                        height: '24px',
                                        minWidth: '20px',
                                        padding: 0,
                                        color: (theme) =>
                                            theme.palette.primary.light,
                                        '&:hover': {
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        },
                                    }}
                                    onClick={(evt) => {
                                        evt.stopPropagation();
                                        setOpenDialog(true);
                                    }}
                                >
                                    <Icon path={mdiDelete} size={1} />
                                </Button>
                            )
                        ) : null}
                    </Box>
                </Box>
            </Link>
            {route !== 'vorlage' ? (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    {[
                        props.keywords.includes('vegan')
                            ? { title: 'vegan', icon: mdiEggOffOutline }
                            : {},

                        props.keywords.includes('vegetarisch')
                            ? { title: 'vegetarisch', icon: mdiFoodSteakOff }
                            : {},
                        props.keywords.includes('glutenfrei')
                            ? { title: 'glutenfrei', icon: mdiBarleyOff }
                            : {},

                        props.keywords.includes('laktosefrei')
                            ? { title: 'laktosefrei', icon: mdiBarleyOff }
                            : {},
                        {
                            title: `${msToHoursAndMinutes(
                                props.time
                            )} Gesamtzeit`,
                            icon: mdiClockOutline,
                        },
                        {
                            title: `erstellt am ${moment(props.date).format(
                                'DD.MM.YYYY, HH:mm'
                            )} Uhr`,
                            icon: mdiCalendar,
                        },
                    ].map((item, index) =>
                        item.icon ? (
                            <div key={index}>
                                {item.icon === mdiClockOutline &&
                                [
                                    'vegan',
                                    'vegetarisch',
                                    'glutenfrei',
                                    'laktosefrei',
                                ].some((ingredient) =>
                                    props.keywords.includes(ingredient)
                                ) ? (
                                    <Divider />
                                ) : null}
                                <MenuItem sx={{ cursor: 'default' }}>
                                    <ListItemIcon>
                                        <Icon path={item.icon} size={1} />
                                    </ListItemIcon>
                                    <ListItemText>{item.title}</ListItemText>
                                </MenuItem>
                            </div>
                        ) : null
                    )}
                </Menu>
            ) : (
                <Dialog
                    open={openDialog}
                    onClose={cancel}
                    closeIcon
                    fullWidth
                    title={`Rezeptvorlage löschen`}
                    noPadding
                    content={
                        <Box>
                            <Typography sx={{ marginBottom: '10px' }}>
                                Gib als Bestätigung den Rezepttitel an, um die
                                Rezeptvorlage{' '}
                                <div
                                    style={{
                                        fontWeight: 700,
                                        display: 'contents',
                                    }}
                                >
                                    {props.title
                                        ? props.title
                                        : 'unbekannter Titel'}
                                </div>{' '}
                                endgültig zu löschen.
                            </Typography>
                            <Textfield
                                value={title}
                                label="Rezepttitel"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Box>
                    }
                    actions={
                        <div>
                            <Button
                                variant="outlined"
                                onClick={cancel}
                                sx={{ mr: 1 }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    dispatch(deleteRecipePrototype(props.id))
                                }
                                disabled={
                                    props.title
                                        ? props.title !== title
                                        : 'unbekannter Titel' !== title
                                }
                            >
                                Bestätigen
                            </Button>
                        </div>
                    }
                />
            )}
        </div>
    );
}

export default Overview;
