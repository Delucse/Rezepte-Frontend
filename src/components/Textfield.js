import React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';

function Textfield(props) {
    return (
        <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: props.margin ? '20px' : '0px' }}
        >
            <InputLabel
                htmlFor={props.property}
                color={props.error ? 'error' : null}
            >
                {props.label}
            </InputLabel>
            <OutlinedInput
                sx={{
                    borderRadius: '0px',
                    minHeight: '56px',
                    border: (theme) =>
                        props.disabled && props.error
                            ? `1px solid ${theme.palette.error.main}`
                            : 'inherit',
                }}
                inputRef={props.inputRef}
                autoFocus={props.autoFocus}
                disabled={props.disabled}
                color={props.error ? 'error' : null}
                error={props.error}
                value={props.value}
                label={props.label}
                id={props.property}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                onKeyDown={props.onKeyDown}
                onClick={props.onClick}
                type={props.type ? props.type : 'text'}
                multiline={props.multiline}
                minRows={props.minRows}
                maxRows={props.maxRows}
                inputProps={props.inputProps}
                placeholder={props.placeholder}
                style={props.style}
                startAdornment={
                    props.start ? (
                        <InputAdornment
                            sx={
                                !props.multiline
                                    ? { maxHeight: '56px', height: '56px' }
                                    : {
                                          alignItems: 'start',
                                          height: '100%',
                                          maxHeight: '100%',
                                      }
                            }
                            position="start"
                        >
                            {props.start}
                        </InputAdornment>
                    ) : null
                }
                endAdornment={
                    props.end ? (
                        <InputAdornment
                            sx={
                                !props.multiline
                                    ? { maxHeight: '56px', height: '56px' }
                                    : {
                                          alignItems: 'start',
                                          height: '100%',
                                          maxHeight: '100%',
                                      }
                            }
                            position="start"
                        >
                            {props.end}
                        </InputAdornment>
                    ) : null
                }
            />
            {props.error && props.message ? (
                <FormHelperText
                    sx={{
                        color: (theme) => theme.palette.error.main,
                        margin: 0,
                        paddingTop: '3px',
                    }}
                >
                    {props.message}
                </FormHelperText>
            ) : null}
        </FormControl>
    );
}

export default Textfield;
