import React, { useEffect, useState } from 'react';

import Button from '../Button';
import Dialog from '../Dialog';
import Autocomplete from '../Autocomplete';
import Textfield from '../Textfield';
import IconButton from '../IconButton';
import Checkbox from '../Checkbox';
import Help from '../Help';

import {
    Typography,
    Box,
    Alert,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiCupcake, mdiPencilOutline, mdiRotateLeft } from '@mdi/js';

import bakewares from '../../data/bakeware.json';
import {
    singularPortionsDictionary,
    pluralPortionsDictionary,
} from '../../helpers/dictionaries';

const getPortion = (count, portion) => {
    if (count === 1) {
        if (pluralPortionsDictionary[portion]) {
            return pluralPortionsDictionary[portion];
        }
    } else {
        if (singularPortionsDictionary[portion]) {
            return singularPortionsDictionary[portion];
        }
    }
    return portion;
};

function Portion({ portion, settings, onSubmit, style, start, end }) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(settings.count);
    const [errorCount, setErrorCount] = useState(false);
    const [form, setForm] = useState(settings.form);
    const [errorForm, setErrorForm] = useState(false);
    const [individualForm, setIndividualForm] = useState(false);
    const [rounded, setRounded] = useState(settings.rounded);

    useEffect(() => {
        setCount(settings.count);
        setErrorCount(false);
        setForm(settings.form);
        setRounded(settings.rounded);
        setIndividualForm(
            settings.form &&
                bakewares.filter(
                    (bake) =>
                        JSON.stringify(bake.form) ===
                        JSON.stringify(settings.form)
                ).length === 0
        );
        setErrorForm(false);
    }, [open, settings]);

    const portionAdd = () => {
        if (count !== '' && !isNaN(count)) {
            setCount(parseInt(count) + 1);
        } else {
            setErrorCount(false);
            setCount(1);
        }
    };

    const portionReduce = () => {
        if (count !== '' && !isNaN(count)) {
            var parsedCount = parseInt(count);
            if (parsedCount !== count) {
                parsedCount += 1;
            }
            setCount(parsedCount - 1);
        } else {
            setErrorCount(false);
            setCount(1);
        }
    };

    const setPortion = (portion) => {
        const portionDecimal = portion.replace(',', '.');
        if (!isNaN(portionDecimal) && portionDecimal > 0) {
            setErrorCount(false);
        } else {
            setErrorCount(true);
        }
        setCount(portion);
    };

    const dimensionAdd = (index) => {
        if (form[index] !== '' && !isNaN(form[index])) {
            var parsedDimension = parseInt(form[index]);
            parsedDimension += 1;
            if (form.length > 1) {
                if (index > 0) {
                    const dimensionDecimal = form[0].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([form[0], parsedDimension]);
                } else {
                    const dimensionDecimal = form[1].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([parsedDimension, form[1]]);
                }
            } else {
                setErrorForm(false);
                setForm([parsedDimension]);
            }
        } else {
            if (form.length > 1) {
                if (index > 0) {
                    const dimensionDecimal = form[0].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([form[0], 1]);
                } else {
                    const dimensionDecimal = form[1].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([1, form[1]]);
                }
            } else {
                setErrorForm(false);
                setForm([1]);
            }
        }
    };

    const dimensionReduce = (index) => {
        if (form[index] !== '' && !isNaN(form[index])) {
            var parsedDimension = parseInt(form[index]);
            if (parsedDimension !== form[index]) {
                parsedDimension += 1;
            }
            parsedDimension -= 1;
            if (form.length > 1) {
                if (index > 0) {
                    const dimensionDecimal = form[0].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([form[0], parsedDimension]);
                } else {
                    const dimensionDecimal = form[1].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([parsedDimension, form[1]]);
                }
            } else {
                setErrorForm(false);
                setForm([parsedDimension]);
            }
        } else {
            if (form.length > 1) {
                if (index > 0) {
                    const dimensionDecimal = form[0].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([form[0], 1]);
                } else {
                    const dimensionDecimal = form[1].toLocaleString();
                    if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
                        setErrorForm(false);
                    }
                    setForm([1, form[1]]);
                }
            } else {
                setErrorForm(false);
                setForm([1]);
            }
        }
    };

    const setDimension = (d, index) => {
        const dimensionDecimal = d.replace(',', '.');
        if (!isNaN(dimensionDecimal) && dimensionDecimal > 0) {
            setErrorForm(false);
        } else {
            setErrorForm(true);
        }
        if (form.length > 1) {
            if (index > 0) {
                setForm([form[0], d]);
            } else {
                setForm([d, form[1]]);
            }
        } else {
            setForm([d]);
        }
    };

    const reset = () => {
        setCount(portion.count);
        setIndividualForm(
            portion.form &&
                bakewares.filter(
                    (bake) =>
                        JSON.stringify(bake.form) ===
                        JSON.stringify(portion.form)
                ).length === 0
        );
        setForm(portion.form);
    };

    const cancel = () => {
        setOpen(false);
    };

    const confirm = () => {
        var countDecimal = count;
        if (typeof countDecimal === 'string') {
            countDecimal = countDecimal.replace(',', '.');
        }
        onSubmit(
            Number(countDecimal),
            form &&
                form.map((f) => {
                    if (typeof f === 'string') {
                        f = f.replace(',', '.');
                    }
                    return Number(f);
                }),
            rounded
        );
        setOpen(false);
    };

    const setForms = (form) => {
        if (form) {
            setErrorForm(form[0] === 0 || (form.length > 1 && form[1] === 0));
            setIndividualForm(
                form[0] === 0 ||
                    bakewares.filter(
                        (bake) =>
                            JSON.stringify(bake.form) === JSON.stringify(form)
                    ).length === 0
            );
            setForm(form);
        } else {
            setErrorForm(true);
            setForm([-1]);
        }
    };

    return (
        <div style={style}>
            <Typography
                sx={{
                    lineHeight: '24px',
                    color: (theme) => theme.palette.text.primary,
                }}
                variant="body1"
            >
                {start}
                {settings.count.toLocaleString()}
                {settings.form
                    ? ` ${
                          settings.form.length > 1
                              ? `${
                                    settings.form[0] < 15 ||
                                    settings.form[1] < 15
                                        ? `Kastenform${
                                              settings.count !== 1 ? 'en' : ''
                                          }`
                                        : `Backblech${
                                              settings.count !== 1 ? 'e' : ''
                                          }`
                                } ${settings.form[0].toLocaleString()} cm x ${settings.form[1].toLocaleString()} cm`
                              : `Springform${
                                    settings.count !== 1 ? 'en' : ''
                                } Ø ${settings.form[0].toLocaleString()} cm`
                      }`
                    : portion.art
                    ? ` ${getPortion(settings.count, portion.art)}`
                    : ` Portion${settings.count !== 1 ? 'en' : ''}`}
                <IconButton
                    tooltipProps={{ title: 'Portionsangabe ändern' }}
                    sx={{
                        height: 'inherit',
                        width: '24px',
                        marginLeft: '5px',
                        '&:hover': {
                            color: (theme) => theme.palette.primary.light,
                        },
                    }}
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    <Icon path={mdiPencilOutline} size={'20px'} />
                </IconButton>
                {end}
            </Typography>
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={'Portionsangabe ändern'}
                noPadding
                content={
                    <Box sx={{ marginTop: 2 }}>
                        {errorCount ? (
                            <Alert
                                severity="error"
                                sx={{
                                    marginBottom: errorForm ? '10px' : '20px',
                                    borderRadius: 0,
                                }}
                            >
                                Mengenangabe: Gib eine positive Zahl an.
                            </Alert>
                        ) : null}
                        {errorForm ? (
                            <Alert
                                severity="error"
                                sx={{ marginBottom: '20px', borderRadius: 0 }}
                            >
                                {!individualForm
                                    ? 'Wähle eine Backform aus.'
                                    : 'Abmessungen der Backform: Gib eine positive Zahl an.'}
                            </Alert>
                        ) : null}
                        <Box
                            sx={{
                                display: {
                                    xs: form ? 'inherit' : 'flex',
                                    sm: 'flex',
                                },
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    width: '115px',
                                    marginRight: '10px',
                                }}
                            >
                                <Button
                                    disabled={count <= 1}
                                    sx={{
                                        height: '56px',
                                        minWidth: '23px',
                                        padding: 0,
                                    }}
                                    variant="contained"
                                    onClick={portionReduce}
                                >
                                    -
                                </Button>
                                <Textfield
                                    type="number"
                                    inputProps={{
                                        sx: { textAlign: 'center' },
                                        step: 'any',
                                    }}
                                    value={count}
                                    style={{ width: '69px' }}
                                    onChange={(e) => {
                                        if (
                                            /^\d*(\.?|,?)\d*$/.test(
                                                e.target.value
                                            )
                                        ) {
                                            setPortion(e.target.value);
                                        }
                                    }}
                                    error={errorCount}
                                />
                                <Button
                                    sx={{
                                        height: '56px',
                                        minWidth: '23px',
                                        padding: 0,
                                    }}
                                    variant="contained"
                                    onClick={portionAdd}
                                >
                                    +
                                </Button>
                            </div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    marginTop: {
                                        xs: form ? '20px' : 0,
                                        sm: 0,
                                    },
                                    width: {
                                        xs: '100%',
                                        sm: 'calc(100% - 115px - 10px)',
                                    },
                                }}
                            >
                                {form && form.length > 0 ? (
                                    <Autocomplete
                                        value={
                                            individualForm
                                                ? bakewares[
                                                      bakewares.length - 1
                                                  ]
                                                : bakewares.filter(
                                                      (bake) =>
                                                          JSON.stringify(
                                                              bake.form
                                                          ) ===
                                                          JSON.stringify(form)
                                                  )[0]
                                        }
                                        onChange={setForms}
                                        options={bakewares}
                                        optionLabel={'name'}
                                        optionGroup={'group'}
                                        optionChange={'form'}
                                        label={'Backform'}
                                        start={
                                            <Icon path={mdiCupcake} size={1} />
                                        }
                                        fullWidth={true}
                                        style={{
                                            marginRight:
                                                count === portion.count &&
                                                JSON.stringify(form) ===
                                                    JSON.stringify(portion.form)
                                                    ? '0px'
                                                    : '10px',
                                        }}
                                        error={errorForm && !individualForm}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            marginRight: '10px',
                                            lineHeight: '56px',
                                            flexGrow: 1,
                                        }}
                                    >
                                        {portion.art
                                            ? getPortion(count, portion.art)
                                            : `Portion${
                                                  count !== 1 ? 'en' : ''
                                              }`}
                                    </div>
                                )}
                                {count === portion.count &&
                                JSON.stringify(form) ===
                                    JSON.stringify(portion.form) ? null : (
                                    <Button
                                        tooltipProps={{
                                            title: 'Portionsangabe zurücksetzen',
                                        }}
                                        sx={{
                                            height: '56px',
                                            minWidth: '56px',
                                            padding: 0,
                                        }}
                                        variant="contained"
                                        onClick={reset}
                                    >
                                        <Icon path={mdiRotateLeft} size={1} />
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        {individualForm ? (
                            <div>
                                <Box
                                    sx={{
                                        ml: { sm: '125px' },
                                        display: 'flex',
                                    }}
                                >
                                    <RadioGroup
                                        row
                                        value={form.length}
                                        onChange={(e) => {
                                            if (e.target.value > 1) {
                                                setForms([
                                                    form[0] > 0 ? form[0] : 0,
                                                    0,
                                                ]);
                                            } else {
                                                setForms([
                                                    form[0] > 0 ? form[0] : 0,
                                                ]);
                                            }
                                        }}
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.text.primary,
                                        }}
                                    >
                                        <FormControlLabel
                                            value={1}
                                            control={<Radio disableRipple />}
                                            label="rund"
                                        />
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio disableRipple />}
                                            label="eckig"
                                        />
                                    </RadioGroup>
                                </Box>
                                <Box
                                    sx={{
                                        ml: { sm: '125px' },
                                        display: 'flex',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.text.secondary,
                                            fontSize: 'small',
                                            fontFamily:
                                                '"Roboto","Helvetica","Arial",sans-serif',
                                        }}
                                    >
                                        {form.length === 1
                                            ? 'Durchmesser'
                                            : 'Länge'}{' '}
                                        (in cm):
                                        <div
                                            style={{
                                                display: 'flex',
                                                width: '115px',
                                                marginRight: '30px',
                                                marginTop: '5px',
                                            }}
                                        >
                                            <Button
                                                disabled={form[0] <= 1}
                                                sx={{
                                                    height: '56px',
                                                    minWidth: '23px',
                                                    padding: 0,
                                                }}
                                                variant="contained"
                                                onClick={() =>
                                                    dimensionReduce(0)
                                                }
                                            >
                                                -
                                            </Button>
                                            <Textfield
                                                type="number"
                                                inputProps={{
                                                    sx: { textAlign: 'center' },
                                                    step: 'any',
                                                }}
                                                value={form[0]}
                                                style={{ width: '69px' }}
                                                onChange={(e) => {
                                                    if (
                                                        /^\d*(\.?|,?)\d*$/.test(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setDimension(
                                                            e.target.value,
                                                            0
                                                        );
                                                    }
                                                }}
                                                error={
                                                    errorForm &&
                                                    (isNaN(form[0]) ||
                                                        form[0] <= 0)
                                                }
                                            />
                                            <Button
                                                sx={{
                                                    height: '56px',
                                                    minWidth: '23px',
                                                    padding: 0,
                                                }}
                                                variant="contained"
                                                onClick={() => dimensionAdd(0)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Box>
                                    {form.length > 1 ? (
                                        <Box
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.text
                                                        .secondary,
                                                fontSize: 'small',
                                                fontFamily:
                                                    '"Roboto","Helvetica","Arial",sans-serif',
                                            }}
                                        >
                                            Breite (in cm):
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    width: '115px',
                                                    marginRight: '30px',
                                                    marginTop: '5px',
                                                }}
                                            >
                                                <Button
                                                    disabled={form[1] <= 1}
                                                    sx={{
                                                        height: '56px',
                                                        minWidth: '23px',
                                                        padding: 0,
                                                    }}
                                                    variant="contained"
                                                    onClick={() =>
                                                        dimensionReduce(1)
                                                    }
                                                >
                                                    -
                                                </Button>
                                                <Textfield
                                                    type="number"
                                                    inputProps={{
                                                        sx: {
                                                            textAlign: 'center',
                                                        },
                                                        step: 'any',
                                                    }}
                                                    value={form[1]}
                                                    style={{ width: '69px' }}
                                                    onChange={(e) => {
                                                        if (
                                                            /^\d*(\.?|,?)\d*$/.test(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            setDimension(
                                                                e.target.value,
                                                                1
                                                            );
                                                        }
                                                    }}
                                                    error={
                                                        errorForm &&
                                                        (isNaN(form[1]) ||
                                                            form[1] <= 0)
                                                    }
                                                />
                                                <Button
                                                    sx={{
                                                        height: '56px',
                                                        minWidth: '23px',
                                                        padding: 0,
                                                    }}
                                                    variant="contained"
                                                    onClick={() =>
                                                        dimensionAdd(1)
                                                    }
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </Box>
                                    ) : null}
                                </Box>
                            </div>
                        ) : null}
                        {settings.hasOwnProperty('rounded') ? (
                            <Box sx={{ display: 'flex', marginTop: '16px' }}>
                                <Checkbox
                                    label={'Mengenangaben runden'}
                                    checked={rounded}
                                    onChecked={() => setRounded(true)}
                                    onUnchecked={() => setRounded(false)}
                                    style={{ marginRight: 0 }}
                                />
                                <Help explanation="Findet ausschließlich Anwendung, sofern mindestens eine Portionsangabe vom Original abweicht." />
                            </Box>
                        ) : null}
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
                            onClick={confirm}
                            disabled={errorCount || errorForm}
                        >
                            Bestätigen
                        </Button>
                    </div>
                }
            />
        </div>
    );
}

export default Portion;
