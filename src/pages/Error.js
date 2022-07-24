import React from 'react';

import { useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';

function Error() {
    const location = useLocation();

    return !/\/(anmeldung|registrierung)/.test(location.pathname) ? (
        <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
            Error
        </Typography>
    ) : null;
}

export default Error;
