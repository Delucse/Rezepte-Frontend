import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { resetMessage } from '../actions/messageActions';

import { useNavigate, useLocation, Link } from 'react-router-dom';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';
import Textfield from '../components/Textfield';

import { styled } from '@mui/material/styles';
import { Button, IconButton, Divider } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

function SignIn() {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const last = useSelector((state) => state.auth.last);
    const error = useSelector((state) => state.message.error);
    const art = useSelector((state) => state.message.art);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const pathname =
        location.state && location.state.background
            ? location.state.background.state &&
              location.state.background.state.background
                ? location.state.background.state.background.pathname
                : location.state.background.pathname
            : '/';

    useEffect(() => {
        if (user) {
            navigate(pathname, { replace: true });
        }
    }, [user, navigate, pathname]);

    useEffect(() => {
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (art === 'alert') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Dialog
            open={!last}
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
                                Melde dich bitte hier an.
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
                        <Alert type={'user'} style={{ marginBottom: '20px' }} />
                        <Textfield
                            label="Nutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin
                            autoFocus
                        />
                        <Textfield
                            type={showPassword ? 'text' : 'password'}
                            label="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            end={
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    disableRipple
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
                        />
                        <p style={{ marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 0, width: '100%' }}
                                onClick={() =>
                                    dispatch(login(username, password))
                                }
                            >
                                Anmelden
                            </Button>
                        </p>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                            <StyledLink
                                to=""
                                replace
                                state={
                                    location.state
                                        ? {
                                              background:
                                                  location.state.background,
                                              auth: location.state.auth,
                                          }
                                        : {}
                                }
                            >
                                Passwort vergessen?
                            </StyledLink>
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
                        Du hast noch kein Konto?{' '}
                        <StyledLink
                            to="/registrierung"
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
                            Registrieren
                        </StyledLink>
                    </p>
                </div>
            }
        />
    );
}

export default SignIn;
