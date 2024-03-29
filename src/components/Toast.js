import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import IconButton from './IconButton';

import { useTheme } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

function CloseButton({ close }) {
    return (
        <IconButton
            onClick={close}
            sx={{ paddingRight: '6px', color: 'white' }}
        >
            <Icon path={mdiClose} size={0.7} />
        </IconButton>
    );
}

function Toast() {
    const art = useSelector((state) => state.message.art);
    const message = useSelector((state) => state.message.message);
    const type = useSelector((state) => state.message.type);

    const theme = useTheme();

    useEffect(() => {
        if (art === 'snackbar') {
            toast(message);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [art, message, type]);

    return (
        <ToastContainer
            position="bottom-left"
            autoClose={type === 'updateApp' ? false : 3000}
            limit={4}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={type !== 'updateApp'}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={type !== 'updateApp' ? CloseButton : <></>}
            style={{
                '--toastify-z-index': 1299,
                '--toastify-color-light': theme.palette.primary.main,
                '--toastify-text-color-light':
                    theme.palette.primary.contrastText,
                '--toastify-color-progress-light': theme.palette.primary.light,
            }}
        />
    );
}

export default Toast;
