import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { alertErrorMessage, resetMessage } from '../actions/messageActions';
import { setProgress, setProgressError } from '../actions/progressActions';

import { useNavigate, useLocation } from 'react-router-dom';

import Link from '../components/Link';
import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';
import Textfield from '../components/Textfield';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Checkbox from '../components/Checkbox';

import { Divider, CircularProgress } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const error = useSelector((state) => state.message.error);
    const type = useSelector((state) => state.message.type);
    const progress = useSelector(
        (state) => state.progress.loading && state.progress.type === 'signup'
    );

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const relationRef = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [relation, setRelation] = useState('');
    const [privacy, setPrivacy] = useState(false);

    const pathname =
        location.state && location.state.background
            ? location.state.background.state &&
              location.state.background.state.background
                ? location.state.background.state.background.pathname +
                  location.state.background.state.background.search
                : location.state.background.pathname +
                  location.state.background.search
            : '/';

    useEffect(() => {
        if (error && type !== 'verification') {
            dispatch(resetMessage());
        }
        return () => {
            if (error && type !== 'verification') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, confirmPassword, password, email, relation, privacy]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const registerCheck = () => {
        dispatch(setProgress('signup'));
        if (username.trim().length < 3) {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Es muss ein Nutzername angegeben sein (mindestens 3 Zeichen).',
                    'user'
                )
            );
        } else if (email.trim() === '') {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage('Es muss eine E-Mail angegeben sein.', 'user')
            );
        } else if (password.trim().length < 8) {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Es muss ein Passwort angegeben sein (mindestens 8 Zeichen).',
                    'user'
                )
            );
        } else if (confirmPassword.trim() === '') {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Bestätige dein Passwort durch wiederholte Eingabe.',
                    'user'
                )
            );
        } else if (confirmPassword !== password) {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Die Passwörter stimmen nicht überein.',
                    'user'
                )
            );
        } else if (relation.trim().length < 3) {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Es muss eine Beziehung zum Admin oder zu einem bereits registrierten Nutzer angegeben sein (mindestens 3 Zeichen).',
                    'user'
                )
            );
        } else if (!privacy) {
            dispatch(setProgressError('signup'));
            dispatch(
                alertErrorMessage(
                    'Akzeptiere die Datenschutzbestimmungen.',
                    'user'
                )
            );
        } else {
            dispatch(
                register(
                    username,
                    email,
                    password,
                    confirmPassword,
                    relation,
                    () => {
                        navigate('/anmeldung', {
                            state: location.state
                                ? {
                                      background: location.state.background,
                                      auth: location.state.auth,
                                  }
                                : {},
                            replace: true,
                        });
                    }
                )
            );
        }
    };

    return (
        <Dialog
            open={true}
            maxWidth={'sm'}
            fullWidth
            backIcon={location.state && location.state.auth}
            onBack={() => navigate('/', { replace: true })}
            closeIcon={location.state && !location.state.auth}
            onClose={() => navigate(pathname, { replace: true })}
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
                    {location.state && location.state.auth ? (
                        <div
                            style={{
                                marginBottom: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                style={{
                                    textAlign: 'center',
                                    paddingRight: '34px',
                                    paddingLeft: '34px',
                                    marginTop: '10px',
                                }}
                            >
                                Die aufgerufene Seite ist passwortgeschützt.
                                Registriere dich bitte hier.
                            </p>
                            <Divider variant="fullWidth" />
                        </div>
                    ) : null}
                    <div
                        style={{
                            paddingRight: '34px',
                            paddingLeft: '34px',
                            marginTop: '20px',
                        }}
                    >
                        <Alert
                            type={'user'}
                            style={{ marginBottom: '20px' }}
                            error
                        />
                        <Alert
                            type={'verification'}
                            style={{ marginBottom: '20px' }}
                            error
                        />
                        <Textfield
                            label="Nutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    emailRef.current.focus();
                                }
                            }}
                            fullWidth
                            margin
                            autoFocus
                        />
                        <Textfield
                            inputRef={emailRef}
                            type="email"
                            label="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    passwordRef.current.focus();
                                }
                            }}
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
                            inputRef={confirmPasswordRef}
                            label="Passwort bestätigen"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    relationRef.current.focus();
                                }
                            }}
                            fullWidth
                            margin
                        />
                        <Textfield
                            inputRef={relationRef}
                            label="Beziehung zum Admin oder anderen registrierten Nutzer"
                            value={relation}
                            onChange={(e) => setRelation(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !progress) {
                                    registerCheck();
                                }
                            }}
                            fullWidth
                            multiline
                            minRows={1}
                        />
                        <Checkbox
                            label={
                                <div style={{ fontSize: '14px' }}>
                                    Ich habe die{' '}
                                    <Link to="/datenschutz">
                                        Datenschutzbestimmungen
                                    </Link>{' '}
                                    gelesen und akzeptiere diese.
                                </div>
                            }
                            size={'small'}
                            checked={privacy}
                            onChecked={setPrivacy}
                            onUnchecked={setPrivacy}
                            style={{ marginTop: '10px' }}
                        />
                        <p style={{ marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{ width: '100%' }}
                                onClick={registerCheck}
                                disabled={progress}
                            >
                                {!progress ? (
                                    'Registrieren'
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
                        Du hast bereits ein Konto?{' '}
                        <Link
                            to="/anmeldung"
                            state={
                                location.state
                                    ? {
                                          background: location.state.background,
                                          auth: location.state.auth,
                                      }
                                    : {}
                            }
                            replace
                            style={{ fontWeight: 'bold' }}
                        >
                            Anmelden
                        </Link>
                    </p>
                </div>
            }
        />
    );
}

export default SignUp;
