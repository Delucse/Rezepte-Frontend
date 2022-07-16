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
                    height: '56px',
                    border: (theme) =>
                        props.disabled && props.error
                            ? `1px solid ${theme.palette.error.main}`
                            : 'inherit',
                }}
                autoFocus={props.autoFocus}
                disabled={props.disabled}
                color={props.error ? 'error' : null}
                error={props.error}
                value={props.value}
                label={props.label}
                id={props.property}
                onChange={props.onChange}
                onClick={props.onClick}
                type={props.type ? props.type : 'text'}
                placeholder={props.placeholder}
                style={props.style}
                startAdornment={
                    props.start ? (
                        <InputAdornment
                            sx={{ maxHeight: '56px', height: '56px' }}
                            position="start"
                        >
                            {props.start}
                        </InputAdornment>
                    ) : null
                }
                endAdornment={
                    props.end ? (
                        <InputAdornment
                            sx={{ maxHeight: '56px', height: '56px' }}
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
