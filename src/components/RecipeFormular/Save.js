import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { saveRecipeFormular } from '../../actions/savedRecipeFormularActions';

import { isEqual } from 'lodash';

import { IconButton } from '@mui/material';

import Icon from '@mdi/react';
import { mdiContentSave } from '@mdi/js';

const Save = () => {
    const dispatch = useDispatch();

    const { id, recipe, ...savedRecipeFormular } = useSelector(
        (state) => state.savedRecipeFormular
    );
    const recipeFormular = useSelector((state) => ({
        title: state.recipeFormular.title,
        portion: state.recipeFormular.portion,
        time: state.recipeFormular.time,
        keywords: state.recipeFormular.keywords,
        ingredients: state.recipeFormular.ingredients,
        steps: state.recipeFormular.steps,
    }));

    return !isEqual(recipeFormular, savedRecipeFormular) ? (
        <IconButton
            sx={{
                position: 'absolute',
                right: { xs: '24px', md: 'calc(48px + 15px)' },
                bottom: { xs: '26px', md: '60px' },
                marginBottom: '24px',
                background: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                    background: (theme) => theme.palette.primary.light,
                },
            }}
            onClick={() => dispatch(saveRecipeFormular())}
        >
            <Icon path={mdiContentSave} size={1} style={{ color: 'inherit' }} />
        </IconButton>
    ) : null;
};

export default Save;
