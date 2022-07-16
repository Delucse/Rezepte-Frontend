import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { IconButton, useTheme } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

function CloseButton({ close }) {
    return (
        <IconButton onClick={close} disableRipple sx={{ color: 'white' }}>
            <Icon path={mdiClose} size={0.7} />
        </IconButton>
    );
}

function Toast() {
    const art = useSelector((state) => state.message.art);
    const message = useSelector((state) => state.message.message);

    const theme = useTheme();

    useEffect(() => {
        if (art === 'snackbar') {
            toast(message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [art, message]);

    return (
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            limit={4}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={CloseButton}
            style={{
                '--toastify-z-index': 1199,
                '--toastify-color-light': theme.palette.primary.main,
                '--toastify-text-color-light':
                    theme.palette.primary.contrastText,
                '--toastify-color-progress-light': theme.palette.primary.light,
            }}
        />
    );
}

export default Toast;
