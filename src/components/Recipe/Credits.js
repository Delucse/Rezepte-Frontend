import React from 'react';

import { useSelector } from 'react-redux';

import Link from '../Link';

import { Typography } from '@mui/material';

function Credits() {
    const credits = useSelector(
        (state) => state.recipe.credits && state.recipe.credits.split(' ')
    );

    return credits ? (
        <Typography
            variant="body2"
            sx={{
                fontStyle: 'italic',
                color: (theme) => theme.palette.text.primary,
                lineHeight: '24px',
                display: 'contents',
            }}
        >
            auf Grundlage von "
            {credits.map((credit, index) => {
                if (credit.startsWith('https://')) {
                    return (
                        <>
                            <Link
                                to={credit}
                                target="_blank"
                                style={{ wordBreak: 'break-all' }}
                            >
                                {credit}
                            </Link>
                            {index < credits.length - 1 ? ' ' : ''}
                        </>
                    );
                } else {
                    return (
                        <>
                            {credit}
                            {index < credits.length - 1 ? ' ' : ''}
                        </>
                    );
                }
            })}
            "{' '}
        </Typography>
    ) : null;
}

export default Credits;
