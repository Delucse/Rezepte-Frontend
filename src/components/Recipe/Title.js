import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import AddImage from './AddImage';

import { Box } from '@mui/material';

function Title() {
    const title = useSelector((state) => state.recipe.title);
    const note = useSelector((state) => state.recipe.note);
    const picturesLength = useSelector((state) => state.recipe.pictures.length);
    const formular = useLocation().pathname.includes('/formular');

    return (
        <Box
            sx={{
                fontWeight: 700,
                fontFamily: 'Lobster Two',
                fontSize: '26px',
                lineHeight: '24px',
                marginBottom: '24px',
                color: (theme) => theme.palette.text.primary,
                display: 'flex',
                width:
                    !formular && note && note.length > 0
                        ? {
                              xs: 'calc(100% - 100px)',
                              sm: 'calc(100% - 130px)',
                              md: 'calc(100% - 160px)',
                          }
                        : '100%',
            }}
        >
            {title}
            {!formular && picturesLength === 0 ? (
                <Box sx={{ height: '24px', marginTop: '-8px' }}>
                    <AddImage />
                </Box>
            ) : null}
        </Box>
    );
}

export default Title;
