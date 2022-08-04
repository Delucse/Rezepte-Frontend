import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import { resetMessage } from '../actions/messageActions';

import { useNavigate, useLocation, Link } from 'react-router-dom';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';
import Textfield from '../components/Textfield';
import Button from '../components/Button';
import IconButton from '../components/IconButton';

import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

function SignUp() {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.message.error);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
        if (user === '') {
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
    }, [user, navigate, location.state]);

    useEffect(() => {
        dispatch(resetMessage());
        return () => {
            if (error) {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password, email]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Dialog
            open={true}
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
                        <Textfield
                            label="Nutzername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin
                            autoFocus
                        />
                        <Textfield
                            type="email"
                            label="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin
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
                                sx={{ width: '100%' }}
                                onClick={() =>
                                    dispatch(
                                        register(username, password, email)
                                    )
                                }
                            >
                                Registrieren
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
                        <StyledLink
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
                        </StyledLink>
                    </p>
                </div>
            }
        />
    );
}

export default SignUp;
