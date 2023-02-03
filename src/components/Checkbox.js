import React from 'react';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

function Checkbox({
    label,
    value,
    checked,
    indeterminate,
    onChecked,
    onUnchecked,
    error,
    style,
}) {
    const handleChange = (event) => {
        if (event.target.checked) {
            onChecked(event.target.value);
        } else {
            onUnchecked(event.target.value);
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
                    />
                }
            />
        </div>
    );
}

export default Checkbox;
