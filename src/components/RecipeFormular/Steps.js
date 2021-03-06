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

import Icon from '@mdi/react';
import { mdiDelete, mdiChevronUp, mdiChevronDown, mdiPlus } from '@mdi/js';

import { Button, Box } from '@mui/material';

function Step(props) {
    const dispatch = useDispatch();

    return (
        <div
            style={{
                display: 'flex',
                marginBottom: props.length - 1 === props.fIndex ? 0 : '10px',
            }}
        >
            <div style={{ display: 'grid', marginRight: '5px' }}>
                <Button
                    onClick={() =>
                        dispatch(
                            changeStepPosition(props.index, props.index - 1)
                        )
                    }
                    disabled={props.index === 0}
                    sx={{
                        height: 'calc(56px / 3)',
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
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
                        borderRadius: 0,
                        minWidth: '23px',
                        boxShadow: 'none',
                        padding: '0px',
                    }}
                    variant="contained"
                >
                    <Icon path={mdiChevronDown} size={1} />
                </Button>
            </div>
            <Textfield
                value={props.step}
                onChange={(e) =>
                    dispatch(changeStep(props.index, e.target.value))
                }
                error={props.step.length === 0 && props.error}
                label={`Schritt ${props.index + 1}`}
                start={`${props.index + 1}.`}
            />
            <Button
                disabled={props.length === 1}
                onClick={() => dispatch(removeStep(props.index))}
                sx={{
                    height: '56px',
                    marginLeft: '5px',
                    borderRadius: 0,
                    minWidth: '23px',
                    boxShadow: 'none',
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
            {errorSteps ? (
                <Box
                    sx={{
                        paddingBottom: '10px',
                        position: 'sticky',
                        top: 'calc(55px + 78px + 34px)',
                        background: (theme) => theme.palette.background.default,
                        zIndex: 2,
                    }}
                >
                    <Alert
                        error
                        message={
                            'Es muss mindestens ein Arbeitsschritt geben. ??berfl??ssige Schritte bitte l??schen.'
                        }
                    />
                </Box>
            ) : null}
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
