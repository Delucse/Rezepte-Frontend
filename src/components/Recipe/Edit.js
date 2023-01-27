import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton';

function Edit() {
    const navigate = useNavigate();

    const id = useSelector((state) => state.recipe.id);

    return (
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
                border: (theme) => `1px solid ${theme.palette.primary.light}`,
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                    color: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={() => navigate(`/rezepte/formular/${id}`)}
        >
            <Icon path={mdiPencil} size={0.7} />
        </IconButton>
    );
}

export default Edit;
