import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipeTitle } from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Portion from './Portion';
import Time from './Time';
import Alert from '../Alert';

import Icon from '@mdi/react';
import { mdiTextShadow } from '@mdi/js';

import { Box } from '@mui/material';

function General() {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.recipeFormular.title);
    const errorTitle = useSelector((state) => state.recipeFormular.error.title);
    const errorPortion = useSelector(
        (state) => state.recipeFormular.error.portion
    );
    const errorTime = useSelector((state) => state.recipeFormular.error.time);

    const onChangeTitle = (e) => {
        dispatch(setRecipeTitle(e.target.value));
    };

    return (
        <div>
            {errorTitle || errorPortion || errorTime ? (
                <Box
                    sx={{
                        paddingBottom: '10px',
                        position: 'sticky',
                        top: 'calc(55px + 78px + 34px)',
                        background: (theme) => theme.palette.background.default,
                        zIndex: 2,
                    }}
                >
                    {errorTitle ? (
                        <Alert error message={'Gib einen Titel an.'} />
                    ) : null}
                    {errorPortion ? (
                        <Alert
                            error
                            message={'Mach eine Angabe zu den Portionen.'}
                        />
                    ) : null}
                    {errorTime ? (
                        <Alert
                            error
                            message={'Gib mindestens eine Zeitangabe an.'}
                        />
                    ) : null}
                </Box>
            ) : null}
            <div style={{ marginTop: '10px' }} />

            <Textfield
                error={errorTitle}
                value={title}
                onChange={onChangeTitle}
                autoFocus
                property={'title'}
                label={'Titel'}
                margin
                start={<Icon path={mdiTextShadow} size={1} />}
            />

            {/* Portionen */}
            <Portion />

            <Time />
        </div>
    );
}

export default General;
