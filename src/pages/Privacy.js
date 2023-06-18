import React from 'react';

import Questions from '../components/Questions';

import { Box, Typography } from '@mui/material';
import { mdiFormatSection } from '@mdi/js';

const themes = () => {
    return [];
};

function Privacy() {
    return (
        <Box>
            <Typography
                component="div"
                variant="body1"
                sx={{
                    marginBottom: '15px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                <div>
                    Mit der folgenden Datenschutzerklärung möchten wir Sie
                    darüber aufklären, welche Arten Ihrer personenbezogenen
                    Daten (nachfolgend auch kurz als "Daten“ bezeichnet) wir zu
                    welchen Zwecken und in welchem Umfang im Rahmen der
                    Bereitstellung unserer Applikation verarbeiten.
                </div>
                <div>
                    Die verwendeten Begriffe sind nicht geschlechtsspezifisch.
                </div>
            </Typography>
            <Questions themes={themes} icon={mdiFormatSection} />
        </Box>
    );
}

export default Privacy;
