import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipeTime } from '../../actions/recipeFormularActions';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ClockPicker } from '@mui/x-date-pickers/ClockPicker';

import moment from 'moment';

import Textfield from '../Textfield';
import Dialog from '../Dialog';
import Button from '../Button';
import Alert from '../Alert';

import { Grid, Tabs, Tab, Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiClockOutline, mdiStove, mdiTimerPauseOutline } from '@mdi/js';

function TimePicker(props) {
    const dispatch = useDispatch();

    const date = moment(props.time).utc();

    const [previewDate, setPreviewDate] = useState(date);
    const [days, setDays] = useState(
        parseInt(previewDate.valueOf() / (24 * 60 * 60 * 1000))
    );
    const [hours, setHours] = useState(previewDate.hours());
    const [minutes, setMinutes] = useState(previewDate.minutes());
    const [view, setView] = useState('days');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const daysInMs = days * 24 * 60 * 60 * 1000;
        const hourssInMs = hours * 60 * 60 * 1000;
        const minutesInMs = minutes * 60 * 1000;
        setPreviewDate(moment(daysInMs + hourssInMs + minutesInMs).utc());
    }, [days, hours, minutes]);

    const toggle = () => {
        setOpen(!open);
    };

    const submit = () => {
        dispatch(setRecipeTime(previewDate.valueOf(), props.type));
        toggle();
    };

    const cancel = () => {
        toggle();
        setDays(parseInt(date.valueOf() / (24 * 60 * 60 * 1000)));
        setHours(date.hours());
        setMinutes(date.minutes());
        setView('days');
    };

    const getTimeTitle = (date, preview) => {
        var title = '';
        var days = parseInt(date.valueOf() / (24 * 60 * 60 * 1000));
        var hours = date.hours();
        var minutes = date.minutes();
        if (days > 0) {
            title += `${days} ${days > 1 ? 'Tage' : 'Tag'}`;
        }
        if (hours > 0) {
            title += `${title !== '' ? ' ' : ''}${hours} ${
                hours > 1 ? 'Stunden' : 'Stunde'
            }`;
        }
        if (minutes > 0) {
            title += `${title !== '' ? ' ' : ''}${minutes} ${
                minutes > 1 ? 'Minuten' : 'Minute'
            }`;
        }
        if (preview) {
            if (title !== '') {
                title = `: ${title}`;
            }
        } else {
            if (title === '') {
                title = `keine Angabe`;
            }
        }
        return title;
    };

    const handleTab = (event, newValue) => {
        setView(newValue);
    };

    const add = () => {
        if (days !== '' && !isNaN(days)) {
            setDays(parseInt(days) + 1);
        } else {
            setDays(1);
        }
    };

    const reduce = () => {
        if (days !== '' && !isNaN(days)) {
            if (parseInt(days) !== days) {
                setDays(parseInt(days));
            } else {
                setDays(parseInt(days) - 1);
            }
        } else {
            setDays(1);
        }
    };

    const error =
        !/\d*/.test(days) ||
        days < 0 ||
        parseInt(days) !== Number(days) ||
        Number(days) > 100000000;

    return (
        <div>
            <Textfield
                value={getTimeTitle(date)}
                onClick={toggle}
                label={props.label}
                error={props.error}
                start={
                    <Icon
                        path={props.icon ? props.icon : mdiClockOutline}
                        size={1}
                    />
                }
            />
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                width="280px"
                title={`${props.label}${
                    previewDate.valueOf() === 0 || error
                        ? ''
                        : getTimeTitle(previewDate, true)
                }`}
                content={
                    <div
                        style={{
                            height: `calc(315px + ${error ? '50' : '0'}px)`,
                        }}
                    >
                        {error ? (
                            <Alert
                                error
                                message={'Gib eine positive Zahl an.'}
                            />
                        ) : null}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                onChange={handleTab}
                                indicatorColor="primary"
                                variant="fullWidth"
                                value={view}
                            >
                                <Tab
                                    disableRipple
                                    value="days"
                                    label="Tage"
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                    }}
                                />
                                <Tab
                                    disableRipple
                                    value="hours"
                                    label="Stunden"
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                    }}
                                />
                                <Tab
                                    disableRipple
                                    value="minutes"
                                    label="Minuten"
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                    }}
                                />
                            </Tabs>
                        </Box>
                        {view !== 'days' ? (
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <ClockPicker
                                    componentsProps={{ sx: { width: '100%' } }}
                                    date={previewDate}
                                    onChange={(newDate) => {
                                        if (view === 'minutes') {
                                            setMinutes(newDate.minutes());
                                        } else {
                                            setHours(newDate.hours());
                                        }
                                    }}
                                    view={view}
                                />
                            </LocalizationProvider>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    margin: '16px 0',
                                }}
                            >
                                <Button
                                    disabled={days <= 0}
                                    sx={{
                                        height: '56px',
                                        minWidth: '56px',
                                        padding: 0,
                                    }}
                                    variant="contained"
                                    onClick={() => reduce()}
                                >
                                    -
                                </Button>
                                <Textfield
                                    type="number"
                                    inputProps={{
                                        sx: { textAlign: 'center' },
                                        step: '1',
                                    }}
                                    value={days}
                                    onChange={(e) => {
                                        if (
                                            /^\d*(\.?|,?)\d*$/.test(
                                                e.target.value
                                            )
                                        ) {
                                            setDays(e.target.value);
                                        }
                                    }}
                                    error={error}
                                />
                                <Button
                                    sx={{
                                        height: '56px',
                                        minWidth: '56px',
                                        padding: 0,
                                    }}
                                    variant="contained"
                                    onClick={() => add()}
                                >
                                    +
                                </Button>
                            </div>
                        )}
                    </div>
                }
                actions={
                    <div>
                        <Button
                            onClick={cancel}
                            variant="outlined"
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        <Button
                            disabled={error}
                            onClick={submit}
                            variant="contained"
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
                    label="Ruhezeit"
                    icon={mdiTimerPauseOutline}
                    time={resting}
                    type="resting"
                    error={errorTime}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TimePicker
                    label="Backzeit"
                    icon={mdiStove}
                    time={baking}
                    type="baking"
                    error={errorTime}
                />
            </Grid>
        </Grid>
    );
}

export default Time;
