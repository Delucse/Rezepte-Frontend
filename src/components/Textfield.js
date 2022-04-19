import React, { useState, useEffect, useRef } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from '@mui/material/InputAdornment';

function Textfield(props) {

    const [error, setError] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
            if(props.error && props.value === ''){
                setError(true)
            } else {
                setError(false)
            }
        }
    }, [props.value]);

    return (
        <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: props.margin ? "20px" : '0px' }}
        >
            <InputLabel
                htmlFor={props.property}
                color={error ? 'error' : null}
            >
                {props.label}
            </InputLabel>
            <OutlinedInput
                sx={{ borderRadius: "0px", height: '56px'}}
                autoFocus={props.autoFocus}
                disabled={props.disabled}
                color={error ? 'error' : null}
                error={error}
                value={props.value}
                label={props.label}
                id={props.property}
                onChange={props.onChange}
                placeholder={props.placeholder}
                startAdornment={props.start ? <InputAdornment sx={{maxHeight: '56px', height: '56px'}} position="start">{props.start}</InputAdornment> : null}
                endAdornment={props.end ? <InputAdornment sx={{maxHeight: '56px', height: '56px'}} position="start">{props.end}</InputAdornment> : null}
            />
            {error ? (
                <FormHelperText sx={{color: theme => theme.palette.error.main, margin: 0, paddingTop: '3px'}}>
                    Error: {props.label} ist erforderlich
                </FormHelperText>
            ) : null}
        </FormControl>
    );
}

export default Textfield;