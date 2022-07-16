import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipeTime } from '../../actions/recipeFormularActions';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ClockPicker } from '@mui/x-date-pickers/ClockPicker';

import Textfield from '../Textfield';
import Dialog from '../Dialog';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight, mdiClockOutline } from '@mdi/js';

import { Button, IconButton, Grid } from '@mui/material';

function TimePicker(props) {
    const dispatch = useDispatch();

    const [date, setDate] = useState(
        new Date(
            props.time + new Date(props.time).getTimezoneOffset() * 60 * 1000
        )
    );
    const [previewDate, setPreviewDate] = useState(date);
    const [view, setView] = useState('hours');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setDate(
            new Date(
                props.time +
                    new Date(props.time).getTimezoneOffset() * 60 * 1000
            )
        );
    }, [props]);

    const toggle = () => {
        setOpen(!open);
    };

    const submit = () => {
        var newDate = new Date(
            previewDate.getTime() -
                new Date(previewDate.getTime()).getTimezoneOffset() * 60 * 1000
        );
        dispatch(setRecipeTime(newDate.getTime(), props.type));
        setDate(previewDate);
        toggle();
        setView('hours');
    };

    const cancel = () => {
        toggle();
        setPreviewDate(date);
        setView('hours');
    };

    const getHours = (date) => {
        return date.getHours().toString().padStart(2, 0);
    };

    const getMinutes = (date) => {
        return date.getMinutes().toString().padStart(2, 0);
    };

    return (
        <div>
            <Textfield
                value={`${getHours(date)}:${getMinutes(date)} Stunden`}
                onClick={toggle}
                label={props.label}
                error={props.error}
                start={<Icon path={mdiClockOutline} size={1} />}
            />
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                title={`${props.label}${
                    previewDate.getHours() === 0 &&
                    previewDate.getMinutes() === 0
                        ? ''
                        : `: ${getHours(previewDate)}:${getMinutes(
                              previewDate
                          )} Stunden`
                }`}
                content={
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <ClockPicker
                                date={previewDate}
                                onChange={(newDate) => {
                                    setPreviewDate(newDate);
                                    setView(
                                        view === 'hours' ? 'minutes' : view
                                    );
                                }}
                                openTo="hours"
                                view={view}
                            />
                        </LocalizationProvider>
                        <div
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >
                            <IconButton
                                onClick={() => setView('hours')}
                                disabled={view === 'hours'}
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                                disableRipple
                            >
                                <Icon path={mdiChevronLeft} size={1} />
                            </IconButton>
                            <IconButton
                                onClick={() => setView('minutes')}
                                disabled={view === 'minutes'}
                                sx={{
                                    '&:hover': {
                                        color: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                }}
                                disableRipple
                            >
                                <Icon path={mdiChevronRight} size={1} />
                            </IconButton>
                        </div>
                    </div>
                }
                actions={
                    <div>
                        <Button
                            onClick={cancel}
                            variant="outlined"
                            sx={{ borderRadius: 0, mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            onClick={submit}
                            variant="contained"
                            sx={{ borderRadius: 0 }}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </div>
    );
}

function Time() {
    const preparation = useSelector(
        (state) => state.recipeFormular.time.preparation
    );
    const resting = useSelector((state) => state.recipeFormular.time.resting);
    const baking = useSelector((state) => state.recipeFormular.time.baking);
    const errorTime = useSelector((state) => state.recipeFormular.error.time);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <TimePicker
                    label="Zubereitungszeit"
                    time={preparation}
                    type="preparation"
                    error={errorTime}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TimePicker
                    label="Wartezeit"
                    time={resting}
                    type="resting"
                    error={errorTime}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TimePicker
                    label="Backzeit"
                    time={baking}
                    type="baking"
                    error={errorTime}
                />
            </Grid>
        </Grid>
    );
}

export default Time;
