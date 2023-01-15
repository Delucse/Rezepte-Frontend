import React from 'react';

import { useSelector } from 'react-redux';

import { Outlet } from 'react-router-dom';

import Loader from './Loader';
import Navbar from './Navbar';
import BreadCrumbs from './BreadCrumbs';
import Toast from './Toast';
import SignOut from '../pages/SignOut';

import Box from '@mui/material/Box';

function Layout() {
    const loading = useSelector(
        (state) => state.progress.loading && state.progress.type === 'user'
    );

    return loading ? (
        <Loader
            info={
                'Es kann ggf. zu einer kurzen Verzögerung kommen, bis alle Daten geladen sind.'
            }
        />
    ) : (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) => theme.palette.background.default,
            }}
        >
            <SignOut />
            <Navbar />
            <BreadCrumbs />
            <Box
                sx={{
                    zIndex: 'unset',
                    position: 'relative',
                    padding: (theme) =>
                        `0 ${theme.spacing(3)} ${theme.spacing(
                            0
                        )} ${theme.spacing(3)}`,
                    minHeight: (theme) =>
                        `calc(100vh - 55px - ${theme.spacing(3)} - 78px)`,
                    background: (theme) => theme.palette.background.default,
                }}
            >
                <Outlet />
            </Box>
            <Toast />
            <Box
                sx={{
                    zIndex: 1,
                    padding: (theme) =>
                        `${theme.spacing(3)} ${theme.spacing(
                            3
                        )} 0px ${theme.spacing(3)}`,
                    position: 'sticky',
                    bottom: 0,
                    background: (theme) =>
                        theme.palette.background
                            .default /*'linear-gradient(transparent 0%, white 40%)'*/,
                }}
            />
            {/* Impressum */}
            {/* <div style={{height: '30px', background: 'lightgrey'}}>Impressum</div> */}
        </Box>
    );
}

export default Layout;
