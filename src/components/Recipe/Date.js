import React from 'react';

import { useSelector } from 'react-redux';

import Link from '../Link';

import moment from 'moment';

import { Typography } from '@mui/material';

function Date() {
    const date = useSelector((state) => state.recipe.date);
    const user = useSelector((state) => state.recipe.user);

    return (
        <Typography
            variant="body2"
            sx={{
                fontStyle: 'italic',
                color: (theme) => theme.palette.text.primary,
                lineHeight: '24px',
            }}
        >
            <div>
                von <Link to={`/rezepte?autor=${user}`}>{user}</Link> am{' '}
                {moment(date).format('DD.MM.YYYY [um] HH:mm')} Uhr erstellt
            </div>
        </Typography>
    );
}

export default Date;
