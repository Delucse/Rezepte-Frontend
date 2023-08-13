import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipePortion } from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Autocomplete from '../Autocomplete';
import Button from '../Button';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Icon from '@mdi/react';
import { mdiCupcake } from '@mdi/js';

import bakewares from '../../data/bakeware.json';
import {
    pluralPortions,
    singularPortions,
    singularPortionsDictionary,
    pluralPortionsDictionary,
} from '../../data/dictionaries';

const getArt = (count, art) => {
    if (art === null) {
        return art;
    }
    if (count === 1) {
        if (pluralPortionsDictionary[art]) {
            return pluralPortionsDictionary[art];
        }
    } else {
        if (singularPortionsDictionary[art]) {
            return singularPortionsDictionary[art];
        }
    }
    return art;
};

function Portion() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.recipeFormular.portion.count);
    const form = useSelector((state) => state.recipeFormular.portion.form);
    const art = useSelector((state) => state.recipeFormular.portion.art);
    const errorPortion = useSelector(
        (state) => state.recipeFormular.error.portion
    );

    const [individualForm, setIndividualForm] = useState(
        form &&
            bakewares.filter(
                (bake) => JSON.stringify(bake.form) === JSON.stringify(form)
            ).length === 0
    );

    const portionAdd = () => {
        if (count !== '' && !isNaN(count)) {
            dispatch(
                setRecipePortion(
                    parseInt(count) + 1,
                    form,
                    getArt(parseInt(count) + 1, art)
                )
            );
        } else {
            dispatch(setRecipePortion(1, form, getArt(1, art)));
        }
    };

    const portionReduce = () => {
        if (count !== '' && !isNaN(count)) {
            if (parseInt(count) !== count) {
                dispatch(
                    setRecipePortion(
                        parseInt(count),
                        form,
                        getArt(parseInt(count), art)
                    )
                );
            } else {
                dispatch(
                    setRecipePortion(
                        parseInt(count) - 1,
                        form,
                        getArt(parseInt(count) - 1, art)
                    )
                );
            }
        } else {
            dispatch(setRecipePortion(1, form, getArt(1, art)));
        }
    };

    const isDish = (e) => {
        if (e.target.value === '0') {
            setIndividualForm(false);
            dispatch(setRecipePortion(count || 0, null, null));
        } else {
            dispatch(setRecipePortion(count || 0, [-1]));
        }
    };

    const setForms = (form) => {
        if (form) {
            setIndividualForm(form[0] === 0);
            dispatch(setRecipePortion(count, form));
        } else {
            dispatch(setRecipePortion(count, [-1]));
        }
    };

    const dimensionAdd = (index) => {
        if (form[index] !== '' && !isNaN(form[index])) {
            var parsedDimension = parseInt(form[index]);
            parsedDimension += 1;
            if (form.length > 1) {
                if (index > 0) {
                    dispatch(
                        setRecipePortion(count, [form[0], parsedDimension])
                    );
                } else {
                    dispatch(
                        setRecipePortion(count, [parsedDimension, form[1]])
                    );
                }
            } else {
                dispatch(setRecipePortion(count, [parsedDimension]));
            }
        } else {
            if (form.length > 1) {
                if (index > 0) {
                    dispatch(setRecipePortion(count, [form[0], 1]));
                } else {
                    dispatch(setRecipePortion(count, [1, form[1]]));
                }
            } else {
                dispatch(setRecipePortion(count, [1]));
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
                    dispatch(
                        setRecipePortion(count, [form[0], parsedDimension])
                    );
                } else {
                    dispatch(
                        setRecipePortion(count, [parsedDimension, form[1]])
                    );
                }
            } else {
                dispatch(setRecipePortion(count, [parsedDimension]));
            }
        } else {
            if (form.length > 1) {
                if (index > 0) {
                    dispatch(setRecipePortion(count, [form[0], 1]));
                } else {
                    dispatch(setRecipePortion(count, [1, form[1]]));
                }
            } else {
                dispatch(setRecipePortion(count, [1]));
            }
        }
    };

    const setDimension = (d, index) => {
        if (form.length > 1) {
            if (index > 0) {
                dispatch(setRecipePortion(count, [form[0], d]));
            } else {
                dispatch(setRecipePortion(count, [d, form[1]]));
            }
        } else {
            dispatch(setRecipePortion(count, [d]));
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <FormControl>
                <FormLabel id="Portionen">Portionen</FormLabel>
                <RadioGroup
                    row
                    name="Portionen"
                    value={form ? 1 : count !== undefined ? 0 : -1}
                    onChange={isDish}
                    sx={{ color: (theme) => theme.palette.text.primary }}
                >
                    <FormControlLabel
                        value={0}
                        control={
                            <Radio
                                disableRipple
                                sx={
                                    errorPortion && count === undefined
                                        ? {
                                              color: (theme) =>
                                                  theme.palette.error.main,
                                          }
                                        : {}
                                }
                            />
                        }
                        label="Gericht"
                    />
                    <FormControlLabel
                        value={1}
                        control={
                            <Radio
                                disableRipple
                                sx={
                                    errorPortion && count === undefined
                                        ? {
                                              color: (theme) =>
                                                  theme.palette.error.main,
                                          }
                                        : {}
                                }
                            />
                        }
                        label="Gebäck"
                    />
                </RadioGroup>
            </FormControl>
            {count !== undefined ? (
                <div>
                    <Box
                        sx={{
                            display: 'flex',
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
                                    step: '1',
                                }}
                                value={count}
                                onChange={(e) => {
                                    if (
                                        /^\d*(\.?|,?)\d*$/.test(e.target.value)
                                    ) {
                                        dispatch(
                                            setRecipePortion(
                                                e.target.value,
                                                form,
                                                getArt(e.target.value, art)
                                            )
                                        );
                                    }
                                }}
                                error={
                                    (!/\d*/.test(count) ||
                                        count < 1 ||
                                        parseInt(count) !== Number(count)) &&
                                    errorPortion
                                }
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
                                marginTop: 0,
                                width: 'calc(100% - 115px - 10px)',
                            }}
                        >
                            {form && form.length > 0 ? (
                                <Autocomplete
                                    value={
                                        individualForm
                                            ? bakewares[bakewares.length - 1]
                                            : bakewares.filter(
                                                  (bake) =>
                                                      JSON.stringify(
                                                          bake.form
                                                      ) === JSON.stringify(form)
                                              )[0]
                                    }
                                    onChange={setForms}
                                    options={bakewares}
                                    optionLabel={'name'}
                                    optionGroup={'group'}
                                    optionChange={'form'}
                                    label={'Backform'}
                                    start={<Icon path={mdiCupcake} size={1} />}
                                    fullWidth
                                    error={errorPortion && !individualForm}
                                />
                            ) : null}
                            {art !== undefined ? (
                                <Autocomplete
                                    value={art}
                                    options={
                                        count === 1
                                            ? singularPortions
                                            : pluralPortions
                                    }
                                    optionLabel={'portion'}
                                    optionGroup={'group'}
                                    label={`Portion${
                                        count === 1 ? '' : 'en'
                                    } (optional)`}
                                    fullWidth
                                    onChange={(art) =>
                                        dispatch(
                                            setRecipePortion(count, form, art)
                                        )
                                    }
                                    freeSolo
                                    error={
                                        art && art.trim() === '' && errorPortion
                                    }
                                />
                            ) : null}
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
                                            dispatch(
                                                setRecipePortion(count, [
                                                    form[0] > 0 ? form[0] : 0,
                                                    0,
                                                ])
                                            );
                                        } else {
                                            dispatch(
                                                setRecipePortion(count, [
                                                    form[0] > 0 ? form[0] : 0,
                                                ])
                                            );
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
                                            onClick={() => dimensionReduce(0)}
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
                                                errorPortion &&
                                                (isNaN(form[0]) || form[0] <= 0)
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
                                                theme.palette.text.secondary,
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
                                                    sx: { textAlign: 'center' },
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
                                                    errorPortion &&
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
                                                onClick={() => dimensionAdd(1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Box>
                                ) : null}
                            </Box>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default Portion;
