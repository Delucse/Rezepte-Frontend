import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
    alertErrorMessage,
    alertMessage,
    resetMessage,
} from '../actions/messageActions';

import axios from 'axios';

import { useNavigate, useParams, Link } from 'react-router-dom';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';
import Alert from '../components/Alert';

import { Divider, CircularProgress } from '@mui/material';

function Verification() {
    const navigate = useNavigate();

    const { token } = useParams();

    const dispatch = useDispatch();
    const error = useSelector((state) => state.message.error);

    useEffect(() => {
        verify();
        return () => {
            if (error) {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const verify = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Request Body
        const body = { token: token };
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/auth/verification`,
                body,
                config
            )
            .then((res) => {
                dispatch(
                    alertMessage(
                        'Du hast dein Konto erfolgreich verifiziert.',
                        'user'
                    )
                );
                navigate('/anmeldung', {
                    replace: true,
                });
            })
            .catch((err) => {
                if (err.response.status === 500) {
                    dispatch(
                        alertErrorMessage(
                            'Verifizierung ist fehlgeschlagen: Interner Server-Fehler. Probiere es bitte zu einem späteren Zeitpunkt erneut.',
                            'verification'
                        )
                    );
                } else {
                    dispatch(
                        alertErrorMessage(
                            'Dein Bestätigungs-Link ist bereits abgelaufen. Registriere dich bitte erneut.',
                            'verification'
                        )
                    );
                    navigate('/registrierung', {
                        replace: true,
                    });
                }
            });
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
                <div style={{ width: '100%' }}>
                    <Divider variant="fullWidth" />
                    <div
                        style={{
                            justifyItems: 'center',
                            display: 'grid',
                            marginTop: '20px',
                        }}
                    >
                        {!error ? (
                            <>
                                <div
                                    style={{
                                        marginBottom: '20px',
                                        lineHeight: '40px',
                                    }}
                                >
                                    Verifizierung wird ausgeführt ...
                                </div>
                                <CircularProgress />
                            </>
                        ) : (
                            <Alert type={'verification'} error />
                        )}
                    </div>
                </div>
            }
        />
    );
}

export default Verification;
