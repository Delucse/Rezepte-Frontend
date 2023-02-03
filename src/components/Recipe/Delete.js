import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRoute } from '../../actions/recipeFilterActions';
import { snackbarMessage } from '../../actions/messageActions';

import { useNavigate } from 'react-router-dom';

import api from '../../axiosInstance';

import IconButton from '../IconButton';
import Button from '../Button';
import Dialog from '../Dialog';
import Textfield from '../Textfield';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

import { Box, Typography } from '@mui/material';

function Delete() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const id = useSelector((state) => state.recipe.id);
    const recipeTitle = useSelector((state) => state.recipe.title);

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    const cancel = () => {
        setTitle('');
        setOpen(false);
    };

    const deleteRecipe = () => {
        const config = {
            success: (res) => {
                dispatch(setRoute('nutzer'));
                navigate('/rezepte/nutzer');
                dispatch(
                    snackbarMessage(
                        `Dein Rezept wurde erfolgreich gelöscht.`,
                        'recipe'
                    )
                );
            },
            error: (err) => {
                console.log(err);
            },
        };
        api.delete(`/recipe/${id}`, config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

    return (
        <div>
            <IconButton
                tooltipProps={{
                    title: 'Löschen',
                    placement: 'right',
                }}
                sx={{
                    width: '23px',
                    height: '23px',
                    background: (theme) => theme.palette.action.hover,
                    border: (theme) => `1px solid ${theme.palette.error.light}`,
                    color: (theme) => theme.palette.error.light,
                    '&:hover': {
                        border: (theme) =>
                            `1px solid ${theme.palette.error.main}`,
                        color: (theme) => theme.palette.error.main,
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <Icon path={mdiDelete} size={0.7} />
            </IconButton>
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={`Rezept löschen`}
                noPadding
                content={
                    <Box>
                        <Typography sx={{ marginBottom: '10px' }}>
                            Gib als Bestätigung den Rezepttitel an, um das
                            Rezept{' '}
                            <div
                                style={{ fontWeight: 700, display: 'contents' }}
                            >
                                {recipeTitle}
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
                            onClick={deleteRecipe}
                            disabled={recipeTitle !== title}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </div>
    );
}

export default Delete;
