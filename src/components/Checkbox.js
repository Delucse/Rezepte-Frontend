import React from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

function Checkbox({
    label,
    value,
    checked,
    size,
    indeterminate,
    onChecked,
    onUnchecked,
    error,
    style,
}) {
    const handleChange = (event) => {
        if (event.target.checked) {
            onChecked(value ? event.target.value : event.target.checked);
        } else {
            onUnchecked(value ? event.target.value : event.target.checked);
        }
    };

    return (
        <div>
            <FormControlLabel
                label={label}
                sx={{
                    color: (theme) => theme.palette.text.primary,
                    alignItems: 'start',
                    ...style,
                }}
                componentsProps={{
                    typography: {
                        sx: {
                            marginTop: '8px',
                        },
                    },
                }}
                control={
                    <MuiCheckbox
                        sx={
                            error
                                ? { color: (theme) => theme.palette.error.main }
                                : {}
                        }
                        value={value}
                        checked={checked}
                        indeterminate={indeterminate}
                        onChange={handleChange}
                        disableRipple
                        size={size}
                    />
                }
            />
        </div>
    );
}

export default Checkbox;
