import React from 'react';

import { Button as MuiButton } from '@mui/material';
import Tooltip from './Tooltip';

function Button({ onClick, sx, tooltipProps, children, ...rest }) {
    const button = (
        <MuiButton
            onClick={onClick}
            sx={{ borderRadius: 0, boxShadow: 'none', ...sx }}
            disableRipple
            {...rest}
        >
            {children}
        </MuiButton>
    );
    return tooltipProps ? (
        <Tooltip {...tooltipProps}>{button}</Tooltip>
    ) : (
        button
    );
}

export default Button;
