import React from 'react';

import Tooltip from './Tooltip';

import { IconButton as MuiIconButton } from '@mui/material';

function IconButton({ onClick, sx, tooltipProps, children, ...rest }) {
    const button = (
        <MuiIconButton
            onClick={onClick}
            sx={{ padding: '0px', ...sx }}
            disableRipple
            {...rest}
        >
            {children}
        </MuiIconButton>
    );
    return tooltipProps ? (
        <Tooltip {...tooltipProps}>{button}</Tooltip>
    ) : (
        button
    );
}

export default IconButton;
