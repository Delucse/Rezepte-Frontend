import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetMessage,
    alertMessage,
    alertErrorMessage,
} from '../actions/messageActions';

import { useLocation, Link } from 'react-router-dom';

import api from '../axiosInstance';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';
import Textfield from '../components/Textfield';
import Button from '../components/Button';

import { styled } from '@mui/material/styles';
import { Divider, CircularProgress } from '@mui/material';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from '../actions/progressActions';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

function ResetPassword() {
    const location = useLocation();

    const dispatch = useDispatch();
    const message = useSelector((state) => state.message);
    const progress = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'resetPassword'
    );

    const [username, setUsername] = useState('');

    useEffect(() => {
        if (message.error && message.type !== 'setPassword') {
            dispatch(resetMessage());
        }
        return () => {
            if (message.art === 'alert') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const sendUsername = () => {
        dispatch(setProgress('resetPassword'));
        if (username.trim() === '') {
            dispatch(
                alertErrorMessage(
                    'Gib Deinen Nutzernamen oder Deine E-Mail an.',
                    'password'
                )
            );
            dispatch(setProgressError('resetPasswort'));
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            // Request Body
            const body = {
                username: username,
            };
            api.post('/user/password', body, config)
                .then((res) => {
                    dispatch(
                        alertMessage(
                            'Sofern der Benutzername oder die E-Mail existiert, wurde dir eine E-Mail mit weiteren Instruktionen zugesendet.',
                            'password'
                        )
                    );
                    dispatch(setProgressSuccess('resetPasswort'));
                })
                .catch((err) => {
                    dispatch(
                        alertErrorMessage(
                            'Anfrage zum Passwort zurücksetzen ist fehlgeschlagen: Interner Server-Fehler. Probiere es bitte zu einem späteren Zeitpunkt erneut.',
                            'password'
                        )
                    );
                    dispatch(setProgressError('resetPasswort'));
                });
        }
    };

    return (
        <Dialog
            maxWidth={'sm'}
            fullWidth
            open
            title={
                <div style={{ justifyItems: 'center', display: 'grid' }}>
                    <Link to="/">
                        <DelucseLogo
                            color="primary"
                            style={{ height: '40px', verticalAlign: 'bottom' }}
                        />
                    </Link>
                </div>
            }
            content={
                !(
                    message.art === 'alert' &&
                    message.type === 'password' &&
                    !message.error
                ) ? (
                    <div>
                        <div
                            style={{
                                paddingRight: '34px',
                                paddingLeft: '34px',
                                marginTop: '20px',
                            }}
                        >
                            <Alert
                                type={'password'}
                                style={{ marginBottom: '20px' }}
                            />
                            <Alert
                                type={'setPassword'}
                                style={{ marginBottom: '20px' }}
                            />
                            <Textfield
                                autoFocus
                                label="Nutzername oder E-Mail"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' && !progress) {
                                        sendUsername();
                                    }
                                }}
                                fullWidth
                            />
                            <p style={{ marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                    onClick={() => sendUsername()}
                                    disabled={progress}
                                >
                                    {!progress ? (
                                        'Passwort zurücksetzen'
                                    ) : (
                                        <CircularProgress size={24.5} />
                                    )}
                                </Button>
                            </p>
                        </div>
                        <Divider variant="fullWidth" />
                        <p
                            style={{
                                textAlign: 'center',
                                paddingRight: '34px',
                                paddingLeft: '34px',
                                marginBottom: 0,
                            }}
                        >
                            Du kannst dich wieder an dein Passwort erinnern?{' '}
                            <StyledLink
                                to="/anmeldung"
                                state={
                                    location.state
                                        ? {
                                              background:
                                                  location.state.background,
                                              auth: location.state.auth,
                                          }
                                        : {}
                                }
                                replace
                                style={{ fontWeight: 'bold' }}
                            >
                                Anmelden
                            </StyledLink>
                        </p>
                    </div>
                ) : (
                    <div
                        style={{
                            paddingRight: '34px',
                            paddingLeft: '34px',
                            marginTop: '20px',
                        }}
                    >
                        <Alert
                            type={'password'}
                            style={{ marginBottom: '20px' }}
                        />
                    </div>
                )
            }
        />
    );
}

export default ResetPassword;
