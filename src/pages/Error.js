import React from 'react';

import { useLocation } from 'react-router-dom';

import Link from '../components/Link';

import { Typography } from '@mui/material';

function Error() {
    const location = useLocation();

    return !/\/(anmeldung|registrierung)/.test(location.pathname) ? (
        <Typography color="text.primary" variant="body2">
            Oops, die angeforderte Seite existiert nicht (mehr). Zurück zur{' '}
            <Link to="/">Startseite</Link>.
        </Typography>
    ) : null;
}

export default Error;
