import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../actions/recipeFilterActions';

import Button from '../Button';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Icon from '@mdi/react';
import {
    mdiDotsVertical,
    mdiSortAscending,
    mdiSortDescending,
    mdiSortAlphabeticalAscending,
    mdiSortAlphabeticalDescending,
    mdiSortClockAscending,
    mdiSortClockDescending,
    mdiSortCalendarAscending,
    mdiSortCalendarDescending,
} from '@mdi/js';

const sort = [
    {
        title: 'Relevanz aufsteigend',
        icon: mdiSortAscending,
        type: 'score',
        ascending: true,
    },
    {
        title: 'Relevanz absteigend',
        icon: mdiSortDescending,
        type: 'score',
        ascending: false,
    },
    {
        title: 'Alphabet aufsteigend',
        icon: mdiSortAlphabeticalAscending,
        type: 'title',
        ascending: true,
    },
    {
        title: 'Alphabet absteigend',
        icon: mdiSortAlphabeticalDescending,
        type: 'title',
        ascending: false,
    },
    {
        title: 'Gesamtzeit aufsteigend',
        icon: mdiSortClockAscending,
        type: 'time',
        ascending: true,
    },
    {
        title: 'Gesamtzeit absteigend',
        icon: mdiSortClockDescending,
        type: 'time',
        ascending: false,
    },
    {
        title: 'Datum aufsteigend',
        icon: mdiSortCalendarAscending,
        type: 'date',
        ascending: true,
    },
    {
        title: 'Datum absteigend',
        icon: mdiSortCalendarDescending,
        type: 'date',
        ascending: false,
    },
];

function Sort() {
    const dispatch = useDispatch();
    const { type, ascending } = useSelector((state) => state.recipeFilter.sort);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                tooltipProps={{ title: 'Reihenfolge' }}
                sx={{
                    height: '56px',
                    minWidth: '56px',
                    padding: '16px',
                    display: { xs: 'none', sm: 'initial' },
                }}
                variant="outlined"
                onClick={handleClick}
            >
                <Icon
                    path={
                        sort.filter(
                            (s) => type === s.type && ascending === s.ascending
                        )[0].icon
                    }
                    size={1}
                />
            </Button>
            <Button
                sx={{
                    height: '56px',
                    minWidth: '20px',
                    padding: 0,
                    display: { xs: 'initial', sm: 'none' },
                }}
                onClick={handleClick}
            >
                <Icon path={mdiDotsVertical} size={1} />
            </Button>
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
                {sort.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            dispatch(setSort(item.type, item.ascending));
                            handleClose();
                        }}
                        sx={
                            type === item.type && ascending === item.ascending
                                ? {
                                      background: (theme) =>
                                          theme.palette.primary.light,
                                  }
                                : {}
                        }
                    >
                        <ListItemIcon>
                            <Icon path={item.icon} size={1} />
                        </ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default Sort;
