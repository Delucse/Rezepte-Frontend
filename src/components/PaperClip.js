import React from 'react';

import { Box } from '@mui/material';

const PaperClip = ({ style }) => {
    return (
        <Box
            sx={{
                background: 'transparent',
                height: '40px',
                width: '15px',
                borderRadius: '10px',
                border: (theme) => `2px solid ${theme.palette.primary.main}`,
                display: 'inline-block',
                position: 'absolute',
                ...style,

                '&:after': {
                    width: '11px',
                    height: '20px',
                    content: '" "',
                    background: 'transparent',
                    display: 'block',
                    position: 'absolute',
                    right: '2px',
                    top: '5px',
                    borderRadius: '10px',
                    border: (theme) =>
                        `2px solid ${theme.palette.primary.main}`,
                    borderBottom: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            }}
        />
    );
};
export default PaperClip;
