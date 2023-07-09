import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { resetSignout } from '../actions/authActions';

import { Link, useLocation } from 'react-router-dom';

import Dialog from '../components/Dialog';
import DelucseLogo from '../components/DelucseLogo';

import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

function SignOut() {
    const location = useLocation();

    const dispatch = useDispatch();
    const { user, last } = useSelector((state) => state.auth);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (
            !user &&
            last &&
            last +
                (Number(process.env.REACT_APP_API_TOKEN_EXPIRATION) - 10) *
                    1000 <
                Date.now()
        ) {
            setOpen(true);
        }
    }, [user, last]);

    const onClose = () => {
        setOpen(false);
        dispatch(resetSignout());
    };

    return (
        <Dialog
            open={open}
            closeIcon
            onClose={onClose}
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
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '16px',
                            }}
                        >
                            Deine Sitzung ist abgelaufen. Du wurdest automatisch
                            ausgeloggt.
                        </div>
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
                        Melde dich{' '}
                        <StyledLink
                            to="/anmeldung"
                            onClick={onClose}
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
                            hier
                        </StyledLink>{' '}
                        wieder an.
                    </p>
                </div>
            }
        />
    );
}

export default SignOut;
