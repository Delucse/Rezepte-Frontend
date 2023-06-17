import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setWord, setType } from '../../actions/recipeFilterActions';

import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import IconButton from '../IconButton';

import params from '../../data/params.json';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiClose, mdiCog, mdiMagnify } from '@mdi/js';

function Search(props) {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const word = useSelector((state) => state.recipeFilter.word);
    const sort = useSelector((state) => state.recipeFilter.sort);
    const type = useSelector((state) => state.recipeFilter.type);
    const categories = useSelector((state) => state.recipeFilter.categories);
    const route = useSelector((state) => state.recipeFilter.route);

    const [search, setSearch] = useState(word);

    useEffect(() => {
        if (word === '' && search !== '') {
            setSearch('');
        } else if (word !== '' && search === '') {
            setSearch(word);
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

    const setParams = () => {
        var newParams = '';
        if (word !== '') {
            newParams += `&wort=${search}`;
        }
        if (type !== 'all') {
            newParams += `&typ=${params.type[type.toLowerCase()]}`;
        }
        if (sort.type !== 'score') {
            newParams += `&sortierung=${
                params.sort.type[sort.type.toLowerCase()]
            }`;
        }
        if (sort.ascending !== false) {
            newParams += `&reihenfolge=${
                params.sort.ascending[sort.ascending]
            }`;
        }
        if (categories.length > 0) {
            newParams += `&filter=${categories.join(',')}`;
        }
        if (newParams !== '') {
            newParams = newParams.replace('&', '?');
        }
        return newParams;
    };

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Textfield
                value={search}
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
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        dispatch(setWord(search.trim()));
                        if (props.redux) {
                            navigate(
                                `/rezepte${
                                    route !== '' ? `/${route}` : ''
                                }${setParams()}`,
                                { exact: true }
                            );
                        }
                    }
                }}
                start={
                    <IconButton
                        tooltipProps={{ title: 'Sucheinstellungen' }}
                        sx={{
                            color: (theme) => theme.palette.text.secondary,
                        }}
                        onClick={handleClick}
                    >
                        <Icon path={mdiCog} size={1} />
                    </IconButton>
                }
                end={
                    search !== '' ? (
                        <IconButton
                            tooltipProps={{ title: 'Löschen' }}
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
                        >
                            <Icon path={mdiClose} size={1} />
                        </IconButton>
                    ) : null
                }
            />

            <Button
                tooltipProps={{ title: 'Rezepte durchsuchen' }}
                sx={{
                    height: '56px',
                    minWidth: '56px',
                    width: '56px',
                    padding: 0,
                    color: (theme) => theme.palette.background.default,
                }}
                variant="contained"
                onClick={() => {
                    dispatch(setWord(search.trim()));
                    if (props.redux) {
                        navigate(
                            `/rezepte${
                                route !== '' ? `/${route}` : ''
                            }${setParams()}`,
                            { exact: true }
                        );
                    }
                }}
            >
                <Icon path={mdiMagnify} size={1.2} />
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
                MenuListProps={{ sx: { padding: 0 } }}
                PaperProps={{ sx: { borderRadius: 0 } }}
                sx={{
                    '&.MuiMenu-root': {
                        zIndex: (theme) => theme.zIndex.search,
                    },
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
