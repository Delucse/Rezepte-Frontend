import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton';
import { ListItemText, Menu, MenuItem } from '@mui/material';

function Edit() {
    const navigate = useNavigate();

    const id = useSelector((state) => state.recipe.id);
    const prototype = useSelector((state) => state.recipe.prototype);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                tooltipProps={{
                    title: 'Editier-Modus starten',
                    placement: 'right',
                }}
                sx={{
                    marginBottom: '25px',
                    width: '23px',
                    height: '23px',
                    background: (theme) => theme.palette.action.hover,
                    border: (theme) =>
                        `1px solid ${theme.palette.primary.light}`,
                    color: (theme) => theme.palette.primary.light,
                    '&:hover': {
                        border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        color: (theme) => theme.palette.primary.main,
                    },
                }}
                onClick={(evt) =>
                    prototype
                        ? handleClick(evt)
                        : navigate(`/rezepte/formular/${id}`)
                }
            >
                <Icon path={mdiPencil} size={0.7} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: 0,
                    },
                    '& .MuiList-root': {
                        padding: 0,
                    },
                }}
            >
                <MenuItem
                    onClick={() => navigate(`/rezepte/formular/${id}`)}
                    sx={{
                        '&:hover': {
                            background: (theme) => theme.palette.primary.light,
                        },
                    }}
                >
                    <ListItemText>Original bearbeiten</ListItemText>
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        navigate(`/rezepte/formular/vorlagen/${prototype}`)
                    }
                    sx={{
                        '&:hover': {
                            background: (theme) => theme.palette.primary.light,
                        },
                    }}
                >
                    <ListItemText>Vorlage bearbeiten</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export default Edit;
