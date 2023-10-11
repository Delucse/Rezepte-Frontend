import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    setRecipeTitle,
    setRecipeCredits,
} from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Portion from './Portion';
import Time from './Time';
import Alert from '../Alert';

import Icon from '@mdi/react';
import { mdiBookOpenVariant, mdiLinkVariant, mdiTextShadow } from '@mdi/js';

import { Box } from '@mui/material';

function General() {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.recipeFormular.title);
    const credits = useSelector((state) => state.recipeFormular.credits);
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

            <Box sx={{ marginTop: '20px' }}>
                <Textfield
                    value={credits}
                    onChange={(e) => dispatch(setRecipeCredits(e.target.value))}
                    property={'credits'}
                    label={'Quellenangabe (optional)'}
                    start={
                        <>
                            <Icon path={mdiBookOpenVariant} size={1} />
                            <div style={{ margin: '0 5px' }}>|</div>
                            <Icon path={mdiLinkVariant} size={1} />
                        </>
                    }
                />
            </Box>
        </div>
    );
}

export default General;
