import React from 'react';

import { Tooltip as MuiTooltip } from '@mui/material';

function Tooltip({ title, arrow, placement, children, ...rest }) {
    return (
        <MuiTooltip
            title={title}
            arrow={arrow}
            placement={placement}
            componentsProps={{
                tooltip: {
                    sx: {
                        border: (theme) =>
                            `1px solid ${theme.palette.primary.light}`,
                        borderRadius: 0,
                        boxShadow: (theme) => theme.shadows[1],
                        background: (theme) => theme.palette.background.default,
                        color: (theme) => theme.palette.text.primary,
                        '.MuiTooltip-arrow': {
                            color: (theme) => theme.palette.primary.light,
                        },
                    },
                },
            }}
            {...rest}
        >
            {children}
        </MuiTooltip>
    );
}

export default Tooltip;
