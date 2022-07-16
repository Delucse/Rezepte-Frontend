import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { submitRecipe } from '../../actions/recipeFormularActions';

import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../Alert';

import { Box, Button } from '@mui/material';
import Recipe from '../../pages/Recipe';

function Preview() {
    const navigate = useNavigate();
    const { id } = useParams();
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
            error.source ||
            error.portion ||
            error.time ||
            error.keywords ||
            error.ingredients.includes(true) ||
            error.steps ||
            error.pictures);

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
                            background: 'white',
                            zIndex: 2,
                        }}
                    >
                        <Alert error message={'Es gibt noch Fehler.'} />
                    </Box>
                ) : (
                    <div>
                        {alert ? (
                            <Box
                                sx={{
                                    paddingBottom: '10px',
                                    position: 'sticky',
                                    top: 'calc(55px + 78px + 34px)',
                                    background: 'white',
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
                                sx={{ borderRadius: 0, mt: '20px' }}
                                onClick={() => dispatch(submitRecipe(id))}
                            >
                                Rezept{' '}
                                {id ? 'aktualisieren' : 'veröffentlichen'}
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
