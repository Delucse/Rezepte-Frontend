import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setWord, setType } from '../../actions/recipeFilterActions';

import { NavLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiClose, mdiCog, mdiMagnify } from '@mdi/js';

function Search(props) {
    const dispatch = useDispatch();
    const word = useSelector((state) => state.recipeFilter.word);
    const type = useSelector((state) => state.recipeFilter.type);
    const route = useSelector((state) => state.recipeFilter.route);

    const [search, setSearch] = useState(word);

    useEffect(() => {
        if (word === '' && search !== '') {
            setSearch('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Textfield
                value={props.redux ? word : search}
                placeholder={
                    type === 'all'
                        ? 'Suche ...'
                        : type === 'title'
                        ? 'Titel suchen ...'
                        : type === 'ingredients'
                        ? 'Zutaten suchen ...'
                        : type === 'keywords'
                        ? 'Schlüsselwort suchen ...'
                        : type === 'steps'
                        ? 'Arbeitsschrittsuche ...'
                        : 'Suche ...'
                }
                onChange={(e) =>
                    props.redux
                        ? dispatch(setWord(e.target.value))
                        : setSearch(e.target.value)
                }
                start={
                    <IconButton
                        sx={{ padding: 0 }}
                        onClick={handleClick}
                        disableRipple
                    >
                        <Icon path={mdiCog} size={1} />
                    </IconButton>
                }
                end={
                    props.redux ? (
                        word !== '' ? (
                            <IconButton
                                sx={{
                                    padding: '4px',
                                    marginRight: '-8px',
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                                onClick={() => dispatch(setWord(''))}
                                disableRipple
                            >
                                <Icon path={mdiClose} size={1} />
                            </IconButton>
                        ) : null
                    ) : search !== '' ? (
                        <IconButton
                            sx={{
                                padding: '4px',
                                marginRight: '-8px',
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.main,
                                },
                            }}
                            onClick={() => {
                                setSearch('');
                                dispatch(setWord(''));
                            }}
                            disableRipple
                        >
                            <Icon path={mdiClose} size={1} />
                        </IconButton>
                    ) : null
                }
            />
            {props.redux ? (
                <Button
                    component={NavLink}
                    exact="true"
                    to={`/rezepte${route !== '' ? `/${route}` : ''}`}
                    sx={{
                        height: '56px',
                        borderRadius: 0,
                        boxShadow: 'none',
                        minWidth: '56px',
                        width: '56px',
                        padding: 0,
                    }}
                    variant="contained"
                    disableRipple
                >
                    <Icon path={mdiMagnify} size={1.2} />
                </Button>
            ) : (
                <Button
                    sx={{
                        height: '56px',
                        borderRadius: 0,
                        boxShadow: 'none',
                        minWidth: '56px',
                        width: '56px',
                        padding: 0,
                    }}
                    variant="contained"
                    disableRipple
                    onClick={() => dispatch(setWord(search))}
                >
                    <Icon path={mdiMagnify} size={1.2} />
                </Button>
            )}
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
                    { title: 'Standardsuche', type: 'all' },
                    { title: 'Titelsuche', type: 'title' },
                    { title: 'Zutatensuche', type: 'ingredients' },
                    { title: 'Schlüsselwortsuche', type: 'keywords' },
                    { title: 'Arbeitsschrittsuche', type: 'steps' },
                ].map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => {
                            dispatch(setType(item.type));
                            handleClose();
                        }}
                        sx={
                            type === item.type
                                ? {
                                      background: (theme) =>
                                          theme.palette.primary.light,
                                  }
                                : {}
                        }
                    >
                        <ListItemText>{item.title}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default Search;
