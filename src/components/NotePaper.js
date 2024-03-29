import React from 'react';

import { Box } from '@mui/material';

function NotePaper(props) {
    const { children, ...rest } = props;

    return (
        <Box sx={{ paddingTop: '2px' }}>
            <Box
                sx={{
                    margin: '2px 0',
                    background: (theme) => theme.palette.action.hover,
                    boxShadow: (theme) =>
                        `0 1px 4px ${theme.palette.action.disabled}`, // original: hsla(0,0%,0%,.25),
                    position: 'relative',
                    backgroundImage: (theme) =>
                        `radial-gradient(${
                            theme.palette.background.default
                        } 21%, transparent 21%), radial-gradient(transparent 10%, transparent 12%), linear-gradient(to top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,0) 95%, ${`${theme.palette.primary.light}33`} 95%, ${`${theme.palette.primary.light}33`} 100%)`,
                    backgroundPosition: '0px 6px, 6px 5px, 50% 18px',
                    backgroundRepeat: 'repeat-y, repeat-y, repeat',
                    backgroundSize: '48px 48px, 48px 48px, 24px 24px',
                    padding: '18px 24px 24px 67px',

                    '&::after': {
                        borderLeft: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        borderRight: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        bottom: 0,
                        content: '""',
                        left: '43px',
                        position: 'absolute',
                        top: 0,
                        width: '2px',
                    },
                }}
                {...rest}
            >
                {children}
            </Box>
        </Box>
    );
}

export default NotePaper;
