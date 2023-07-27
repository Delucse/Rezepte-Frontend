import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    setActiveStep,
    submitRecipe,
} from '../../actions/recipeFormularActions';

import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../Alert';
import Button from '../Button';

import { Box } from '@mui/material';
import Recipe from '../../pages/Recipe';

function Preview() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blocked = useSelector((state) => state.recipeFormular.blocked);
    const error = useSelector((state) => state.recipeFormular.error);
    const recipeId = useSelector((state) => state.recipe.id);
    const uploaded = useSelector((state) => state.recipeFormular.uploaded);
    const alert = useSelector(
        (state) => state.message.type === 'recipeFormular'
    );
    const preview =
        error.submit &&
        (error.title ||
            error.portion ||
            error.time ||
            error.keywords ||
            error.ingredients.includes(true) ||
            error.steps ||
            error.pictures);

    const { id } = useParams();

    useEffect(() => {
        if (!blocked && recipeId && uploaded) {
            navigate(`/rezepte/${recipeId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocked, recipeId, uploaded]);

    return (
        <div>
            {error.submit ? (
                preview ? (
                    <Box
                        sx={{
                            paddingBottom: '10px',
                            position: 'sticky',
                            top: 'calc(55px + 78px + 34px)',
                            background: (theme) =>
                                theme.palette.background.default,
                            zIndex: 2,
                        }}
                    >
                        <Alert
                            error
                            message={
                                <div>
                                    Du hast leider noch nicht alle Pflichtfelder
                                    (korrekt) ausgefüllt:
                                    <ul style={{ marginBottom: 0 }}>
                                        {error.title ||
                                        error.portion ||
                                        error.time ? (
                                            <Box
                                                component="li"
                                                sx={{
                                                    maxWidth: 'max-content',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'none',
                                                    },
                                                }}
                                                onClick={() =>
                                                    dispatch(setActiveStep(0))
                                                }
                                            >
                                                Allgemein
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                        {error.keywords ? (
                                            <Box
                                                component="li"
                                                sx={{
                                                    maxWidth: 'max-content',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'none',
                                                    },
                                                }}
                                                onClick={() =>
                                                    dispatch(setActiveStep(1))
                                                }
                                            >
                                                Kategorien
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                        {error.ingredients.includes(true) ? (
                                            <Box
                                                component="li"
                                                sx={{
                                                    maxWidth: 'max-content',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'none',
                                                    },
                                                }}
                                                onClick={() =>
                                                    dispatch(setActiveStep(2))
                                                }
                                            >
                                                Zutaten
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                        {error.steps ? (
                                            <Box
                                                component="li"
                                                sx={{
                                                    maxWidth: 'max-content',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'none',
                                                    },
                                                }}
                                                onClick={() =>
                                                    dispatch(setActiveStep(3))
                                                }
                                            >
                                                Arbeitsschritte
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                        {error.pictures ? (
                                            <Box
                                                component="li"
                                                sx={{
                                                    maxWidth: 'max-content',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        textDecoration: 'none',
                                                    },
                                                }}
                                                onClick={() =>
                                                    dispatch(setActiveStep(4))
                                                }
                                            >
                                                Bilder
                                            </Box>
                                        ) : (
                                            <></>
                                        )}
                                    </ul>
                                </div>
                            }
                        />
                    </Box>
                ) : (
                    <div>
                        {alert ? (
                            <Box
                                sx={{
                                    paddingBottom: '10px',
                                    position: 'sticky',
                                    top: 'calc(55px + 78px + 34px)',
                                    background: (theme) =>
                                        theme.palette.background.default,
                                    zIndex: 2,
                                }}
                            >
                                <Alert type={'recipeFormular'} />
                            </Box>
                        ) : null}
                        <div
                            style={{ justifyItems: 'center', display: 'grid' }}
                        >
                            <div style={{ width: '100%' }}>
                                <Recipe />
                            </div>
                            <Button
                                variant="contained"
                                sx={{ mt: '20px' }}
                                onClick={() => dispatch(submitRecipe())}
                            >
                                Rezept{' '}
                                {id && recipeId
                                    ? 'aktualisieren'
                                    : 'veröffentlichen'}
                            </Button>
                        </div>
                    </div>
                )
            ) : null}
            <div style={{ marginTop: '10px' }} />
        </div>
    );
}

export default Preview;
