import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    alertErrorMessage,
    alertMessage,
    resetMessage,
} from '../actions/messageActions';
import {
    setProgress,
    setProgressError,
    setProgressSuccess,
} from '../actions/progressActions';

import api from '../axiosInstance';

import Button from '../components/Button';
import Textfield from '../components/Textfield';
import Alert from '../components/Alert';
import Link from '../components/Link';

import { Box, CircularProgress, Grid } from '@mui/material';

function Contact() {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.message.error);
    const art = useSelector((state) => state.message.art);
    const type = useSelector((state) => state.message.type);
    const progress = useSelector(
        (state) => state.progress.loading && state.progress.type === 'contact'
    );

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const confirmEmailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();

    useEffect(() => {
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (art === 'alert' && type === 'contact') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, confirmEmail, subject, message]);

    const send = () => {
        dispatch(setProgress('contact'));
        if (email.trim().length === 0) {
            dispatch(
                alertErrorMessage('Gib deine E-Mail-Adresse an.', 'contact')
            );
            dispatch(setProgressError('contact'));
        } else if (subject.trim().length === 0) {
            dispatch(alertErrorMessage('Gib einen Betreff an.', 'contact'));
            dispatch(setProgressError('contact'));
        } else if (message.trim().length === 0) {
            dispatch(alertErrorMessage('Gib eine Nachricht an.', 'contact'));
            dispatch(setProgressError('contact'));
        } else if (confirmEmail.trim() === '') {
            dispatch(
                alertErrorMessage(
                    'Bestätige deine E-Mail-Adresse durch wiederholte Eingabe.',
                    'contact'
                )
            );
            dispatch(setProgressError('contact'));
        } else if (confirmEmail !== email) {
            dispatch(
                alertErrorMessage(
                    'Die E-Mail-Adressen stimmen nicht überein.',
                    'contact'
                )
            );
            dispatch(setProgressError('contact'));
        } else {
            const config = {
                method: 'POST',
                url: '/mail/contact',
                data: {
                    email: email,
                    subject: subject,
                    message: message.replace(/\n/g, '<br/>'),
                },
                success: (res) => {
                    setEmail('');
                    setConfirmEmail('');
                    setSubject('');
                    setMessage('');
                    dispatch(
                        alertMessage(
                            'Deine Anfrage wurde erfolgreich versendet.',
                            'contact'
                        )
                    );
                    dispatch(setProgressSuccess('contact'));
                },
                error: (err) => {
                    if (err.response.data.message === 'invalid email address') {
                        dispatch(
                            alertErrorMessage(
                                'E-Mail-Adresse ist nicht gültig.',
                                'contact'
                            )
                        );
                    } else {
                        dispatch(
                            alertErrorMessage(
                                <div>
                                    Anfrage versenden ist fehlgeschlagen:
                                    Interner Server-Fehler. Probiere es bitte zu
                                    einem späteren Zeitpunkt erneut oder
                                    kontaktiere direkt{' '}
                                    <Link
                                        to={`mailto:${process.env.REACT_APP_LEGALNOTICE_MAIL}`}
                                    >
                                        {process.env.REACT_APP_LEGALNOTICE_MAIL}
                                    </Link>
                                    .
                                </div>,
                                'contact'
                            )
                        );
                    }
                    dispatch(setProgressError('contact'));
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
                marginTop: '-10px',
                zIndex: (theme) => theme.zIndex.content,
                position: 'relative',
            }}
        >
            <Alert
                type={'contact'}
                style={{ marginTop: '10px', marginBottom: '20px' }}
            />
            <Grid container spacing={0} sx={{ marginTop: '10px' }}>
                <Grid item xs={12} sm={6}>
                    <Textfield
                        type="email"
                        label="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                confirmEmailRef.current.focus();
                            }
                        }}
                        style={{
                            marginRight: { xs: 0, sm: '8px' },
                        }}
                        fullWidth
                        margin
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Textfield
                        inputRef={confirmEmailRef}
                        type="email"
                        label="E-Mail bestätigen"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                subjectRef.current.focus();
                            }
                        }}
                        fullWidth
                        margin
                        style={{ marginLeft: { xs: 0, sm: '8px' } }}
                        labelStyle={{ marginLeft: { xs: 0, sm: '8px' } }}
                    />
                </Grid>
            </Grid>
            <Textfield
                inputRef={subjectRef}
                label="Betreff"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !progress) {
                        messageRef.current.focus();
                    }
                }}
                fullWidth
                margin
            />
            <Textfield
                inputRef={messageRef}
                label="Nachricht"
                multiline
                minRows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                margin
            />
            <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => send()}
                disabled={progress}
            >
                {!progress ? 'Senden' : <CircularProgress size={24.5} />}
            </Button>
        </Box>
    );
}

export default Contact;
