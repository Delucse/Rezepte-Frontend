import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    changeStep,
    addStep,
    removeStep,
    changeStepPosition,
} from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Alert from '../Alert';
import Button from '../Button';

import { Box, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiDelete, mdiChevronUp, mdiChevronDown, mdiPlus } from '@mdi/js';

function Step(props) {
    const dispatch = useDispatch();

    return (
        <div
            style={{
                display: 'flex',
                marginBottom: props.length - 1 === props.fIndex ? 0 : '10px',
            }}
        >
            <div
                style={{ display: 'grid', marginRight: '5px', height: '56px' }}
            >
                <Button
                    onClick={() =>
                        dispatch(
                            changeStepPosition(props.index, props.index - 1)
                        )
                    }
                    disabled={props.index === 0}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronUp} size={1} />
                </Button>
                <Button
                    onClick={() => dispatch(addStep(props.index))}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiPlus} size={0.7} />
                </Button>
                <Button
                    onClick={() =>
                        dispatch(
                            changeStepPosition(props.index, props.index + 1)
                        )
                    }
                    disabled={props.length - 1 === props.index}
                    sx={{
                        height: 'calc(56px / 3)',
                        minWidth: '23px',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronDown} size={1} />
                </Button>
            </div>
            <Textfield
                value={props.step}
                multiline
                minRows={1}
                onChange={(e) =>
                    dispatch(changeStep(props.index, e.target.value))
                }
                error={props.step.trim().length === 0 && props.error}
                label={`Schritt ${props.index + 1}`}
                start={`${props.index + 1}.`}
            />
            <Button
                disabled={props.length === 1}
                onClick={() => dispatch(removeStep(props.index))}
                sx={{
                    height: '56px',
                    marginLeft: '5px',
                    minWidth: '23px',
                    padding: '0px',
                }}
                variant="outlined"
            >
                <Icon path={mdiDelete} size={1} />
            </Button>
        </div>
    );
}

function Steps() {
    const steps = useSelector((state) => state.recipeFormular.steps);
    const errorSteps = useSelector((state) => state.recipeFormular.error.steps);

    return (
        <div>
            <Box
                sx={{
                    paddingBottom: '10px',
                    position: 'sticky',
                    top: 'calc(55px + 78px + 34px)',
                    background: (theme) => theme.palette.background.default,
                    zIndex: 2,
                }}
            >
                <Typography
                    sx={{
                        fontStyle: 'italic',
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    Die Angabe der Arbeitsschritte soll in eigenen Worten
                    erfolgen, um einerseits mögliches geistiges Eigentum anderer
                    nicht zu verletzen und andererseits lediglich das
                    Wesentliche zu fokussieren.
                </Typography>
                {errorSteps ? (
                    <Alert
                        error
                        message={
                            'Es muss mindestens ein Arbeitsschritt geben. Überflüssige Schritte bitte löschen.'
                        }
                        style={{ marginTop: '10px' }}
                    />
                ) : null}
            </Box>
            <div style={{ marginTop: '10px' }} />
            {steps.map((step, index) => (
                <Step
                    key={index}
                    index={index}
                    step={step}
                    length={steps.length}
                    error={errorSteps}
                />
            ))}
        </div>
    );
}

export default Steps;
