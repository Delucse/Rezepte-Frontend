import React, { useState } from 'react';

import MuiAutocomplete, {
    createFilterOptions,
} from '@mui/material/Autocomplete';
import { TextField, InputAdornment } from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronDown, mdiClose } from '@mdi/js';

const filter = createFilterOptions();

function Autocomplete(props) {
    const [inputValue, setInputValue] = useState('');

    return (
        <MuiAutocomplete
            value={props.value}
            onChange={(event, newValue) => {
                if (!newValue || typeof newValue === 'string') {
                    props.onChange(newValue);
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    props.onChange(newValue.inputValue);
                } else {
                    props.onChange(
                        newValue[
                            props.optionChange
                                ? props.optionChange
                                : props.optionLabel
                        ]
                    );
                }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            options={props.options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option[props.optionLabel];
            }}
            groupBy={(option) =>
                props.optionGroup ? option[props.optionGroup] : null
            }
            renderOption={(prop, option) => (
                <li {...prop}>
                    {props.optionLabel ? option[props.optionLabel] : option}
                </li>
            )}
            filterOptions={
                props.freeSolo
                    ? (options, params) => {
                          const filtered = filter(options, params);
                          const { inputValue } = params;
                          // Suggest the creation of a new value
                          if (props.optionLabel) {
                          }
                          const isExisting = options.some(
                              (option) =>
                                  inputValue === option[props.optionLabel]
                          );
                          if (inputValue !== '' && !isExisting) {
                              var object = { inputValue };
                              object[
                                  props.optionLabel
                              ] = `"${inputValue}" hinzufügen`;
                              filtered.push(object);
                          }
                          return filtered;
                      }
                    : filter
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        error: props.error,
                        startAdornment: props.start ? (
                            <InputAdornment
                                sx={{ maxHeight: '56px' }}
                                position="start"
                            >
                                {props.start}
                            </InputAdornment>
                        ) : null,
                    }}
                />
            )}
            freeSolo={props.freeSolo}
            fullWidth={props.fullWidth}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            openOnFocus
            sx={{
                '.MuiAutocomplete-inputRoot': {
                    borderRadius: '0px',
                    height: '56px',
                },
                '.MuiAutocomplete-popupIndicator': {
                    '&:hover': {
                        color: (theme) => theme.palette.primary.main,
                        background: 'none',
                    },
                },
                '.MuiTouchRipple-root': {
                    display: 'none',
                },
            }}
            componentsProps={{
                paper: {
                    sx: {
                        borderRadius: 0,
                    },
                },
                clearIndicator: {
                    sx: {
                        '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                            background: 'none',
                        },
                    },
                },
            }}
            clearIcon={<Icon path={mdiClose} size={1} />}
            popupIcon={<Icon path={mdiChevronDown} size={1.1667} />}
            clearText="löschen"
            closeText="schließen"
            openText="öffnen"
            noOptionsText="keine Ergebnisse"
            style={props.style}
        />
    );
}

export default Autocomplete;
