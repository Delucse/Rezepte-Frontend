import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipeSettings } from '../../actions/recipeActions';

import Button from '../Button';
import Dialog from '../Dialog';
import Autocomplete from '../Autocomplete';
import Textfield from '../Textfield';
import IconButton from '../IconButton';
import Help from '../Help';

import {
    Typography,
    Box,
    Alert,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiPencil, mdiCupcake, mdiRotateLeft } from '@mdi/js';

import bakeware from '../../data/bakeware.json';

const bakewares = bakeware.concat([
    {
        area: 2,
        name: 'individuelle Backform',
        group: 'Sonstiges',
    },
]);

function Portion() {
    const dispatch = useDispatch();
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(settings.count);
    const [area, setArea] = useState(settings.area);
    const [rounded, setRounded] = useState(settings.rounded);
    const [individual, setIndividual] = useState(0);
    const [errorArea, setErrorArea] = useState(false);
    const [errorCount, setErrorCount] = useState(false);

    useEffect(() => {
        setCount(settings.count);
        setArea(settings.area);
        setRounded(settings.rounded);
    }, [open, settings]);

    const portionAdd = () => {
        if (!isNaN(count)) {
            setCount(parseInt(count) + 1);
        } else {
            setErrorCount(false);
            setCount(1);
        }
    };

    const portionReduce = () => {
        if (!isNaN(count)) {
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

    const reset = () => {
        setCount(portion.count);
        setArea(portion.area);
    };

    const cancel = () => {
        setOpen(false);
    };

    const confirm = () => {
        var countDecimal = count;
        if (typeof countDecimal === 'string') {
            countDecimal = countDecimal.replace(',', '.');
        }
        if (area === 2) {
            dispatch(
                setRecipeSettings(Number(countDecimal), individual, rounded)
            );
        } else {
            dispatch(setRecipeSettings(Number(countDecimal), area, rounded));
        }
        setOpen(false);
    };

    const setA = (area) => {
        if (area > 2) {
            setErrorArea(false);
            setArea(area);
        } else if (area === 2) {
            setErrorArea(true);
            setArea(area);
        } else {
            setErrorArea(true);
            setArea(1);
        }
    };

    const setarea = (e) => {
        if (e.target.value > 2) {
            setErrorArea(false);
        } else {
            setErrorArea(true);
        }
        setIndividual(e.target.value);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Typography
                    sx={{
                        lineHeight: '24px',
                        color: (theme) => theme.palette.text.primary,
                    }}
                    variant="body1"
                >
                    für {settings.count.toLocaleString()}
                    {settings.area > 0
                        ? bakeware.filter((bake) => bake.area === settings.area)
                              .length > 0
                            ? `x ${
                                  bakeware.filter(
                                      (bake) => bake.area === settings.area
                                  )[0].name
                              }`
                            : 'x individuelle Backform'
                        : ` Portion${settings.count !== 1 ? 'en' : ''}`}
                </Typography>
                <IconButton
                    tooltipProps={{ title: 'Portionsangabe ändern' }}
                    sx={{
                        height: 'inherit',
                        width: '24px',
                        marginLeft: '5px',
                    }}
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    <Icon path={mdiPencil} size={1} />
                </IconButton>
            </div>
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
                                sx={{ marginBottom: '20px', borderRadius: 0 }}
                            >
                                Gib eine positive Zahl an.
                            </Alert>
                        ) : null}
                        {errorArea ? (
                            <Alert
                                severity="error"
                                sx={{ marginBottom: '20px', borderRadius: 0 }}
                            >
                                {area !== 2
                                    ? 'Wähle eine Backform aus.'
                                    : 'Gebe einen Flächeninhalt in cm² an (mind. 3 cm²).'}
                            </Alert>
                        ) : null}
                        <Box
                            sx={{
                                display: {
                                    xs: area > 0 ? 'inherit' : 'flex',
                                    sm: 'flex',
                                },
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    width: '95px',
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
                                    value={count.toString().replace('.', ',')}
                                    style={{ width: '49px' }}
                                    onChange={(e) => setPortion(e.target.value)}
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
                                        xs: area > 0 ? '20px' : 0,
                                        sm: 0,
                                    },
                                    width: {
                                        xs: '100%',
                                        sm: 'calc(100% - 95px - 10px)',
                                    },
                                }}
                            >
                                {area > 0 ? (
                                    <Autocomplete
                                        value={
                                            bakewares.filter(
                                                (bake) => bake.area === area
                                            )[0]
                                        }
                                        onChange={setA}
                                        options={bakewares}
                                        optionLabel={'name'}
                                        optionGroup={'group'}
                                        optionChange={'area'}
                                        label={'Backform'}
                                        start={
                                            <Icon path={mdiCupcake} size={1} />
                                        }
                                        fullWidth={true}
                                        style={{ marginRight: '10px' }}
                                        error={errorArea && area === 1}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            marginRight: '10px',
                                            lineHeight: '56px',
                                            flexGrow: 1,
                                        }}
                                    >
                                        Portion{count !== 1 ? 'en' : ''}
                                    </div>
                                )}
                                {count === portion.count &&
                                area === portion.area ? null : (
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
                        {area === 2 ? (
                            <Box sx={{ ml: { sm: '105px' }, mt: 2 }}>
                                <Textfield
                                    label="Flächenangabe"
                                    error={errorArea && individual === 2}
                                    type="number"
                                    value={individual}
                                    onChange={setarea}
                                    autoFocus
                                />
                            </Box>
                        ) : null}
                        <Box sx={{ display: 'flex' }}>
                            <FormControlLabel
                                label={'Mengenangaben runden'}
                                control={
                                    <Checkbox
                                        checked={rounded}
                                        onChange={(e) =>
                                            setRounded(e.target.checked)
                                        }
                                        disableRipple
                                    />
                                }
                                sx={{ marginRight: '0px' }}
                            />
                            <Help explanation="Findet ausschließlich Anwendung, sofern mindestens eine Portionsangabe vom Original abweicht." />
                        </Box>
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
                            disabled={errorCount || errorArea}
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
