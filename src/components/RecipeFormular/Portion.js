import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setRecipePortion } from '../../actions/recipeFormularActions';

import Textfield from '../Textfield';
import Autocomplete from '../Autocomplete';
import Button from '../Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Icon from '@mdi/react';
import { mdiCupcake } from '@mdi/js';

import bakeware from '../../data/bakeware.json';

function Portion() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.recipeFormular.portion.count);
    const volume = useSelector((state) => state.recipeFormular.portion.volume);
    const errorPortion = useSelector(
        (state) => state.recipeFormular.error.portion
    );

    const portionAdd = () => {
        dispatch(setRecipePortion(count + 1, volume));
    };

    const portionReduce = () => {
        dispatch(setRecipePortion(count - 1, volume));
    };

    const isDish = (e) => {
        if (e.target.value === '0') {
            dispatch(setRecipePortion(count, 0));
        } else {
            dispatch(setRecipePortion(count, 1));
        }
    };

    const setVolume = (volume) => {
        if (volume) {
            dispatch(setRecipePortion(count, volume));
        } else {
            dispatch(setRecipePortion(count, 1));
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <FormControl>
                <FormLabel id="Portionen">Portionen</FormLabel>
                <RadioGroup
                    row
                    name="Portionen"
                    value={volume > 0 ? 1 : volume < 0 ? -1 : 0}
                    onChange={isDish}
                    sx={{ color: (theme) => theme.palette.text.primary }}
                >
                    <FormControlLabel
                        value={0}
                        control={
                            <Radio
                                disableRipple
                                sx={
                                    errorPortion && volume < 0
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
                                    errorPortion && volume < 0
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
            {volume >= 0 ? (
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            width: '110px',
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
                            disabled
                            value={count}
                            error={count === 0 && errorPortion}
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
                    {volume > 0 ? (
                        <Autocomplete
                            value={
                                bakeware.filter(
                                    (bake) => bake.volume === volume
                                )[0]
                            }
                            onChange={setVolume}
                            options={bakeware}
                            optionLabel={'name'}
                            optionGroup={'group'}
                            optionChange={'volume'}
                            label={'Backform'}
                            start={<Icon path={mdiCupcake} size={1} />}
                            error={errorPortion && volume === 1}
                            fullWidth={true}
                        />
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default Portion;
