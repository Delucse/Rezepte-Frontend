import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Dialog from '../components/Dialog';
import Textfield from '../components/Textfield';
import Alert from '../components/Alert';
import IconButton from '../components/IconButton';

import { Box, CircularProgress, Divider, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff, mdiLoading } from '@mdi/js';
import {
    alertErrorMessage,
    alertMessage,
    resetMessage,
    snackbarMessage,
} from '../actions/messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from '../actions/progressActions';
import { resetSignout, signoutIntern } from '../actions/authActions';

import api from '../axiosInstance';

function Account() {
    return (
        <Box>
            <NewPassword />
            <Divider variant="fullWidth" />
            <DeleteAccount />
        </Box>
    );
}

function NewPassword() {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.message.error);
    const art = useSelector((state) => state.message.art);
    const type = useSelector((state) => state.message.type);
    const progress = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'newPassword'
    );

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [oldPassword, setOldPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (art === 'alert' && type === 'newPassword') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmPassword, password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const resetPassword = () => {
        dispatch(setProgress('newPassword'));
        if (oldPassword.trim().length === 0) {
            dispatch(
                alertErrorMessage(
                    'Gib dein aktuelles Passwort an.',
                    'newPassword'
                )
            );
            dispatch(setProgressError('newPassword'));
        } else if (password.trim().length < 8) {
            dispatch(
                alertErrorMessage(
                    'Es muss ein Passwort angegeben sein (mindestens 8 Zeichen).',
                    'newPassword'
                )
            );
            dispatch(setProgressError('newPassword'));
        } else if (confirmPassword.trim() === '') {
            dispatch(
                alertErrorMessage(
                    'Bestätige dein Passwort durch wiederholte Eingabe.',
                    'newPassword'
                )
            );
            dispatch(setProgressError('newPassword'));
        } else if (confirmPassword !== password) {
            dispatch(
                alertErrorMessage(
                    'Die Passwörter stimmen nicht überein.',
                    'newPassword'
                )
            );
            dispatch(setProgressError('newPassword'));
        } else {
            const config = {
                method: 'PUT',
                url: '/user/password',
                data: {
                    oldPassword: oldPassword,
                    password: password,
                    confirmPassword: confirmPassword,
                },
                success: (res) => {
                    setOldPassword('');
                    setPassword('');
                    setConfirmPassword('');
                    dispatch(
                        alertMessage(
                            'Du hast dein Passwort erfolgreich geändert.',
                            'newPassword'
                        )
                    );
                    dispatch(setProgressSuccess('newPassword'));
                },
                error: (err) => {
                    if (err.response.status !== 401) {
                        switch (err.response.status) {
                            case 500:
                                dispatch(
                                    alertErrorMessage(
                                        'Passwort verändern ist fehlgeschlagen: Interner Server-Fehler. Probiere es bitte zu einem späteren Zeitpunkt erneut.',
                                        'newPassword'
                                    )
                                );
                                break;
                            default:
                                dispatch(
                                    alertErrorMessage(
                                        'Du bist dazu nicht authorisiert.',
                                        'newPassword'
                                    )
                                );
                                break;
                        }
                        dispatch(setProgressError('newPassword'));
                    }
                },
            };
            api(config)
                .then((res) => {
                    res.config.success(res);
                })
                .catch((err) => {
                    err.config.error(err);
                });
        }
    };

    return (
        <Box
            sx={{
                zIndex: (theme) => theme.zIndex.appBar - 40,
                position: 'relative',
            }}
        >
            <Alert
                type={'newPassword'}
                style={{ marginTop: '10px', marginBottom: '20px' }}
            />
            <Textfield
                type={showOldPassword ? 'text' : 'password'}
                label="aktuelles Passwort"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        passwordRef.current.focus();
                    }
                }}
                sx={{ marginTop: '10px' }}
                end={
                    <IconButton
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{
                            '&:hover': {
                                color: (theme) => theme.palette.primary.main,
                            },
                        }}
                    >
                        <Icon
                            path={showOldPassword ? mdiEyeOff : mdiEye}
                            size={1}
                        />
                    </IconButton>
                }
                fullWidth
                margin
            />
            <Textfield
                inputRef={passwordRef}
                type={showPassword ? 'text' : 'password'}
                label="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        confirmPasswordRef.current.focus();
                    }
                }}
                end={
                    <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{
                            '&:hover': {
                                color: (theme) => theme.palette.primary.main,
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
                inputRef={confirmPasswordRef}
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
        </Box>
    );
}

function DeleteAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector((state) => state.message.error);
    const art = useSelector((state) => state.message.art);
    const type = useSelector((state) => state.message.type);
    const progress = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'deleteUser'
    );
    const username = useSelector((state) => state.auth.user);

    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (art === 'alert' && type === 'deleteUser') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const cancel = () => {
        setPassword('');
        setOpen(false);
    };

    const deleteMe = () => {
        dispatch(setProgress('deleteUser'));
        const config = {
            method: 'DELETE',
            url: '/user',
            data: { password: password },
            success: (res) => {
                dispatch(signoutIntern());
                dispatch(
                    snackbarMessage(
                        `Nutzer wurde erfolgreich gelöscht.`,
                        'user'
                    )
                );
                dispatch(resetSignout());
                navigate('/');
                dispatch(setProgressSuccess('deleteUser'));
            },
            error: (err) => {
                if (err.response.status !== 401) {
                    switch (err.response.status) {
                        case 500:
                            dispatch(
                                alertErrorMessage(
                                    'Nutzerkonto löschen ist fehlgeschlagen: Interner Server-Fehler. Probiere es bitte zu einem späteren Zeitpunkt erneut.',
                                    'deleteUser'
                                )
                            );
                            break;
                        default:
                            dispatch(
                                alertErrorMessage(
                                    'Du bist dazu nicht authorisiert.',
                                    'deleteUser'
                                )
                            );
                            break;
                    }
                    dispatch(setProgressError('deleteUser'));
                }
            },
        };
        api(config)
            .then((res) => {
                res.config.success(res);
            })
            .catch((err) => {
                err.config.error(err);
            });
    };

    return (
        <p style={{ marginTop: '20px' }}>
            <Button
                variant="contained"
                sx={{
                    width: '100%',
                    background: (theme) => theme.palette.error.main,
                    '&:hover': {
                        background: (theme) => theme.palette.error.light,
                    },
                }}
                onClick={() => setOpen(true)}
                disabled={progress}
            >
                Nutzerkonto löschen
            </Button>
            <Dialog
                open={open}
                onClose={cancel}
                closeIcon
                fullWidth
                title={`Nutzerkonto löschen`}
                noPadding
                content={
                    <Box>
                        <Alert
                            type={'deleteUser'}
                            style={{ marginBottom: '20px' }}
                        />
                        <Typography sx={{ marginBottom: '10px' }}>
                            Mit Löschung deines Nutzerkontos werden ebenfalls
                            alle deine erstellten Rezepte und sämtliche
                            hochgeladenden Fotos gelöscht.
                            <Divider
                                variant="fullWidth"
                                sx={{ margin: '10px 0' }}
                            />
                            Gib als Bestätigung dein Passwort zum zugehörigen
                            Nutzernamen{' '}
                            <div
                                style={{ fontWeight: 700, display: 'contents' }}
                            >
                                {username}
                            </div>{' '}
                            an, um dein Nutzerkonto endgültig zu löschen.
                        </Typography>
                        <Textfield
                            type={showPassword ? 'text' : 'password'}
                            label="aktuelles Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </Box>
                }
                actions={
                    !progress ? (
                        <div>
                            <Button
                                variant="outlined"
                                onClick={cancel}
                                sx={{ mr: 1 }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                variant="contained"
                                onClick={deleteMe}
                                disabled={password.length === 0}
                            >
                                {!progress ? (
                                    'Bestätigen'
                                ) : (
                                    <CircularProgress size={24.5} />
                                )}
                            </Button>
                        </div>
                    ) : (
                        <Box
                            sx={{
                                height: '36.5px',
                                color: (theme) => theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Icon
                                path={mdiLoading}
                                size={1}
                                spin={0.9}
                                style={{ marginRight: '10px' }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: (theme) =>
                                        theme.palette.text.primary,
                                }}
                            >
                                Nutzer wird gelöscht
                            </Typography>
                        </Box>
                    )
                }
            />
        </p>
    );
}

export default Account;
