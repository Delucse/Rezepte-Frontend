import React from 'react';

import moment from 'moment';

import Link from './Link';
import RecipeLogo from './RecipeLogo';

import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';

function Footer() {
    const theme = useTheme();
    const color = theme.palette.getContrastText(theme.palette.primary.light);

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                width: 'calc(100% - 2 * 24px)',
                background: (theme) => theme.palette.primary.light,
                color: color,
                display: { xs: 'inherit', sm: 'flex' },
                padding: 3,
            }}
        >
            <Box
                sx={{
                    display: { xxs: 'inherit', xs: 'flex' },
                    flexGrow: 1,
                }}
            >
                <Box sx={{ minWidth: '138px' }}>
                    <Link
                        to="/impressum"
                        style={{ display: 'block', color: color }}
                    >
                        Impressum
                    </Link>
                    <Link
                        to="/datenschutz"
                        style={{ display: 'block', color: color }}
                    >
                        Datenschutz
                    </Link>
                    <Link
                        to="/kontakt"
                        style={{ display: 'block', color: color }}
                    >
                        Kontakt
                    </Link>
                </Box>
                <Box
                    sx={{
                        maxWidth: 'max-content',
                        marginTop: { xxs: '20px', xs: 0 },
                    }}
                >
                    <Link
                        to="/statistiken"
                        style={{ display: 'block', color: color }}
                    >
                        Statistiken
                    </Link>
                    <Link to="/faq" style={{ display: 'block', color: color }}>
                        FAQ
                    </Link>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: { xxs: '20px', xs: 0 } }}>
                <Box sx={{ flexGrow: 1 }} />
                <Link
                    to="/"
                    style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        display: 'flex',
                    }}
                >
                    <div style={{ marginTop: 'auto', marginRight: '20px' }}>
                        &copy; Delucse {moment().format('YYYY')}
                        <br />
                        <div style={{ fontFamily: 'Lobster Two' }}>
                            mit Hunger erstellt
                        </div>
                    </div>
                    <RecipeLogo
                        style={{
                            height: '65px',
                            width: '65px',
                            float: 'right',
                        }}
                        plainColor
                    />
                </Link>
            </Box>
        </Box>
    );
}

export default Footer;
