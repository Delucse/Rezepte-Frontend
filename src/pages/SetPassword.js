import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetMessage,
    alertMessage,
    alertErrorMessage,
} from '../actions/messageActions';

import { useNavigate, Link, useParams } from 'react-router-dom';

import api from '../axiosInstance';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';
import Textfield from '../components/Textfield';
import Button from '../components/Button';
import IconButton from '../components/IconButton';

import { CircularProgress } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from '../actions/progressActions';

function SetPassword() {
    const navigate = useNavigate();
    const { id, token } = useParams();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.message.error);
    const progress = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'setPassword'
    );

    const passwordRef = useRef();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (error) {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmPassword, password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const resetPassword = () => {
        dispatch(setProgress('setPassword'));
        if (password.trim().length < 8) {
            dispatch(
                alertErrorMessage(
                    'Es muss ein Passwort angegeben sein (mindestens 8 Zeichen).',
                    'password'
                )
            );
            dispatch(setProgressError('setPassword'));
        } else if (confirmPassword.trim() === '') {
            dispatch(
                alertErrorMessage(
                    'Bestätige dein Passwort durch wiederholte Eingabe.',
                    'password'
                )
            );
            dispatch(setProgressError('setPassword'));
        } else if (confirmPassword !== password) {
            dispatch(
                alertErrorMessage(
                    'Die Passwörter stimmen nicht überein.',
                    'password'
                )
            );
            dispatch(setProgressError('setPassword'));
        } else {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            // Request Body
            const body = {
                token: token,
                password: password,
                confirmPassword: confirmPassword,
            };
            api.put(`/user/password/${id}`, body, config)
                .then((res) => {
                    dispatch(
                        alertMessage(
                            'Du hast dein Passwort erfolgreich zurückgesetzt.',
                            'user'
                        )
                    );
                    dispatch(setProgressSuccess('setPassword'));
                    navigate('/anmeldung', {
                        replace: true,
                    });
                })
                .catch((err) => {
                    if (err.response.status === 500) {
                        dispatch(
                            alertErrorMessage(
                                'Passwort zurücksetzen ist fehlgeschlagen: Interner Server-Fehler. Probiere es bitte zu einem späteren Zeitpunkt erneut.',
                                'password'
                            )
                        );
                    } else {
                        dispatch(
                            alertErrorMessage(
                                'Dein Zurücksetzungslink ist bereits abgelaufen. Gib bitte erneut deine E-Mail an.',
                                'setPassword'
                            )
                        );
                        navigate('/passwort', {
                            replace: true,
                        });
                    }
                    dispatch(setProgressError('setPassword'));
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
                        <Textfield
                            type={showPassword ? 'text' : 'password'}
                            label="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    passwordRef.current.focus();
                                }
                            }}
                            end={
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    sx={{
                                        '&:hover': {
                                            color: (theme) =>
                                                theme.palette.primary.main,
                                        },
                                    }}
                                >
                                    <Icon
                                        path={showPassword ? mdiEyeOff : mdiEye}
                                        size={1}
                                    />
                                </IconButton>
                            }
                            fullWidth
                            margin
                        />
                        <Textfield
                            inputRef={passwordRef}
                            label="Passwort bestätigen"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !progress) {
                                    resetPassword();
                                }
                            }}
                            fullWidth
                        />
                        <p style={{ marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{ width: '100%' }}
                                onClick={() => resetPassword()}
                                disabled={progress}
                            >
                                {!progress ? (
                                    'Passwort neu vergeben'
                                ) : (
                                    <CircularProgress size={24.5} />
                                )}
                            </Button>
                        </p>
                    </div>
                </div>
            }
        />
    );
}

export default SetPassword;
