import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

function WakeLock() {
    const [wake, setWake] = useState(null);

    useEffect(() => {
        window.document.addEventListener(
            'visibilitychange',
            handleVisibilityChange
        );
        return () => {
            window.document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wake]);

    useEffect(() => {
        return () => {
            wake && releaseWakeLock();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const requestWakeLock = async () => {
        try {
            const wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', (e) => {
                // console.info('Wake Lock was released');
            });
            setWake(wakeLock);
            // console.info('Wake Lock is active');
        } catch (e) {
            setWake(null);
            console.error(`${e.name}, ${e.message}`);
        }
    };

    const releaseWakeLock = () => {
        wake.release().then(() => {
            setWake(null);
        });
    };

    const handleVisibilityChange = () => {
        if (wake !== null && document.visibilityState === 'visible') {
            requestWakeLock();
        }
    };

    return 'wakeLock' in navigator && 'request' in navigator.wakeLock ? (
        <IconButton
            id="wakeLock"
            sx={{
                padding: '0px',
                width: '24.8px',
                height: '23px',
                background: (theme) => theme.palette.action.hover,
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={wake ? releaseWakeLock : requestWakeLock}
            disableRipple
        >
            <Box id="eye" sx={{ display: 'flex' }}>
                <Icon path={wake ? mdiEye : mdiEyeOff} size={1} />
            </Box>
            <Box id="eyeHover" sx={{ display: 'none' }}>
                <Icon path={wake ? mdiEyeOff : mdiEye} size={1} />
            </Box>
        </IconButton>
    ) : null;
}

export default WakeLock;
