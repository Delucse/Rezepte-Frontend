import React from 'react';

import { useSelector } from 'react-redux';

import moment from 'moment';

import { Typography } from '@mui/material';

function Date() {
    const date = useSelector((state) => state.recipe.date);

    return (
        <Typography
            variant="body2"
            sx={{
                fontStyle: 'italic',
                color: (theme) => theme.palette.text.primary,
                lineHeight: '24px',
            }}
        >
            {`erstellt am ${moment(date).format('DD.MM.YYYY, HH:mm')} Uhr`}
        </Typography>
    );
}

export default Date;
