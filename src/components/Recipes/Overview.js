import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    deleteRecipesFavorite,
    setRecipesFavorite,
} from '../../actions/recipeFilterActions';

import { useNavigate } from 'react-router-dom';

import moment from 'moment';

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
} from '@mdi/js';

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

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const rgbaToRgb = (background, rgb, alpha) => {
        rgb = rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(', ');
        background = background
            .slice(background.indexOf('(') + 1, background.indexOf(')'))
            .split(', ');
        return `rgb(${(1 - alpha) * background[0] + alpha * rgb[0]}, ${
            (1 - alpha) * background[1] + alpha * rgb[1]
        }, ${(1 - alpha) * background[2] + alpha * rgb[2]})`;
    };

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ height: props.fullscreen ? '100%' : 'max-content' }}>
            {props.fullscreen ? null : (
                <Tape
                    rotate={props.rotate}
                    top
                    heart={user}
                    check={props.favorite}
                    onClick={
                        user
                            ? props.favorite
                                ? () =>
                                      dispatch(deleteRecipesFavorite(props.id))
                                : () => dispatch(setRecipesFavorite(props.id))
                            : null
                    }
                />
            )}
            <Box
                sx={{
                    height: 'inherit',
                    margin: !props.fullscreen ? '2px 0' : 0,
                    background: (theme) => theme.palette.action.hover,
                    boxShadow: props.fullscreen
                        ? 'none'
                        : '0 1px 4px hsla(0,0%,0%,.25)',
                    position: 'relative',
                    backgroundImage: (theme) =>
                        `radial-gradient(transparent 21%, transparent 21%), radial-gradient(transparent 10%, transparent 12%), linear-gradient(to top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,0) 95%, ${rgbaToRgb(
                            theme.palette.action.hover,
                            theme.palette.primary.light,
                            0.2
                        )} 95%, ${rgbaToRgb(
                            theme.palette.action.hover,
                            theme.palette.primary.light,
                            0.2
                        )} 100%)`,
                    backgroundPosition: '0px 6px, 6px 5px, 50% 18px',
                    backgroundRepeat: 'repeat-y, repeat-y, repeat',
                    backgroundSize: '48px 48px, 48px 48px, 24px 24px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate(`/rezepte/${props.id}`)}
            >
                {props.picture || props.fullscreen ? (
                    <Box
                        sx={{
                            height: !props.fullscreen
                                ? 'calc(24px * 10)'
                                : 'calc(100% - 64px)',
                            width: 'calc(100%)',
                            position: 'relative',
                            backgroundImage: `url(${props.picture})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                        }}
                    >
                        {props.picture ? (
                            <img
                                style={{ display: 'none' }}
                                alt=""
                                src={props.picture}
                                onError={(e) => {
                                    e.currentTarget.parentNode.style.backgroundImage = `url(${process.env.PUBLIC_URL}/logo512.png)`;
                                    e.currentTarget.parentNode.style.filter =
                                        'grayscale(1)';
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    // paddingTop: '32px',
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
                                <Icon path={mdiImageOffOutline} size={'100%'} />
                            </Box>
                        )}
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
                            overflow: !props.fullscreen ? 'inherit' : 'hidden',
                            textOverflow: !props.fullscreen
                                ? 'inherit'
                                : 'ellipsis',
                            whiteSpace: !props.fullscreen
                                ? 'inherit'
                                : 'nowrap',
                        }}
                    >
                        {props.title}
                    </Box>
                    {!props.fullscreen ? (
                        <Button
                            tooltipProps={{ title: 'weitere Informationen' }}
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
                    ) : null}
                </Box>
            </Box>
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
                        title: `${msToHoursAndMinutes(props.time)} Gesamtzeit`,
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
        </div>
    );
}

export default Overview;
