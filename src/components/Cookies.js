import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCookies, setCookiesOpen } from '../actions/settingsActions';

import Dialog from './Dialog';
import Button from './Button';
import Help from './Help';

import { Box, Divider, FormControlLabel, Switch } from '@mui/material';

import { mdiCookie } from '@mdi/js';
import Icon from '@mdi/react';

const Cookies = () => {
    const dispatch = useDispatch();

    const open = useSelector((state) => state.settings.cookies.open);
    const necessary = useSelector((state) => state.settings.cookies.necessary);
    const reduxPreferences = useSelector(
        (state) => state.settings.cookies.preferences
    );

    const [preferences, setPreferences] = useState(reduxPreferences);

    useEffect(() => {
        if (preferences !== reduxPreferences) {
            setPreferences(reduxPreferences);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reduxPreferences]);

    const deny = () => {
        dispatch(setCookies({ necessary: true, preferences: false }));
        close();
    };

    const confirm = () => {
        dispatch(setCookies({ necessary: true, preferences: preferences }));
        close();
    };

    const allow = () => {
        dispatch(setCookies({ necessary: true, preferences: true }));
        close();
    };

    const close = () => {
        if (open) {
            dispatch(setCookiesOpen(false));
        }
    };

    return (
        <Dialog
            open={open || !necessary}
            onClose={open ? () => close() : null}
            closeIcon={open}
            maxWidth={'xs'}
            fullWidth
            position={'bottomleft'}
            title={
                <div style={{ display: 'flex' }}>
                    <Icon
                        path={mdiCookie}
                        size={1}
                        style={{ marginTop: '3px', marginRight: '5px' }}
                    />
                    <div>Cookie-Einstellungen</div>
                </div>
            }
            content={
                <div>
                    <Box sx={{ fontWeight: 'bold' }}>
                        Diese Website verwendet Cookies.
                    </Box>
                    <Box>
                        Wir verwenden Cookies, um einerseits sicherzustellen,
                        dass die Grundfunktionen der Website ordnungsgemäß
                        funktionieren und um andererseits die Möglichkeit
                        anbieten zu können, die Anzeige zu personalisieren.
                    </Box>
                    <Divider style={{ margin: '15px 0' }} />
                    <FormControlLabel
                        sx={{ marginLeft: 0 }}
                        control={
                            <Switch color="primary" checked={true} disabled />
                        }
                        label={
                            <div style={{ display: 'flex' }}>
                                Notwendig
                                <Help
                                    explanation={
                                        <Box>
                                            Notwendige Cookies helfen dabei,
                                            eine Website nutzbar zu machen,
                                            indem sie Grundfunktionen wie
                                            Zugriff auf sichere Bereiche der
                                            Website ermöglichen. Die Website
                                            kann ohne diese Cookies nicht
                                            ordnungsgemäß funktionieren.
                                        </Box>
                                    }
                                />
                            </div>
                        }
                        labelPlacement="start"
                        componentsProps={{
                            typography: {
                                sx: {
                                    width: '150px',
                                    color: (theme) =>
                                        theme.palette.text.primary +
                                        '!important',
                                },
                            },
                        }}
                    />
                    <br />
                    <FormControlLabel
                        sx={{ marginLeft: 0 }}
                        value="preferences"
                        control={
                            <Switch
                                color="primary"
                                checked={preferences}
                                onChange={(e) =>
                                    setPreferences(e.target.checked)
                                }
                            />
                        }
                        label={
                            <div style={{ display: 'flex' }}>
                                Präferenzen
                                <Help
                                    explanation={
                                        <Box>
                                            Präferenz-Cookies ermöglichen einer
                                            Website sich an Informationen zu
                                            erinnern, die die Art beeinflussen,
                                            wie sich eine Website verhält oder
                                            aussieht, wie z. B. Dein bevorzugtes
                                            Farbschema.
                                        </Box>
                                    }
                                />
                            </div>
                        }
                        labelPlacement="start"
                        componentsProps={{
                            typography: {
                                sx: { width: '150px' },
                            },
                        }}
                    />
                </div>
            }
            actions={
                <Box>
                    <Button
                        variant="outlined"
                        sx={{ mr: 1, mt: 1 }}
                        onClick={deny}
                    >
                        Ablehnen
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mr: 1, mt: 1 }}
                        onClick={confirm}
                    >
                        Bestätigen
                    </Button>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={allow}>
                        alle zulassen
                    </Button>
                </Box>
            }
        />
    );
};

export default Cookies;
