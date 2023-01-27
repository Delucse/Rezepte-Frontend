import React from 'react';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

import Notes from './Notes';

import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';

function Steps() {
    const user = useSelector((state) => state.auth.user);
    const steps = useSelector((state) => state.recipe.steps);
    const note = useSelector((state) => state.recipe.note);
    const formular = useLocation().pathname.includes('/formular');

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 700,
                        fontFamily: 'Lobster Two',
                        fontSize: 'calc(1rem + 2px)',
                        lineHeight: '24px',
                        textDecoration: 'underline',
                        textDecorationColor: (theme) =>
                            theme.palette.primary.main,
                        color: (theme) => theme.palette.text.primary,
                    }}
                >
                    Arbeitsschritte{' '}
                </Typography>
                {!formular && user && (note || note === '') ? <Notes /> : null}
            </Box>
            <List
                sx={{
                    padding: 0,
                    marginBottom: '24px',
                }}
            >
                {steps.map((step, index) => {
                    return (
                        <ListItem
                            disablePadding
                            key={index}
                            sx={{ alignItems: 'baseline' }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: '25px',
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                {`${index + 1}.`}
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    margin: 0,
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                                primary={step}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
}

export default Steps;
