import React from 'react';

import MuiDialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { mdiArrowLeft, mdiClose } from '@mdi/js';

const DialogTitle = (props) => {
    return (
        <MuiDialogTitle
            sx={{
                margin: 0,
                padding: 2,
                paddingBottom: props.noPadding ? 0 : 2,
                display: 'flex',
            }}
        >
            {props.backIcon ? (
                <IconButton
                    onClick={props.onBack}
                    sx={{
                        float: 'left',
                        height: '40px',
                        marginTop: -0.5,
                        color: (theme) => theme.palette.primary.light,
                        '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                        },
                    }}
                    disableRipple
                >
                    <Icon path={mdiArrowLeft} size={1} />
                </IconButton>
            ) : null}
            <div style={{ flexGrow: 1 }}>{props.children}</div>
            {props.closeIcon ? (
                <IconButton
                    onClick={props.onClose}
                    sx={{
                        height: '40px',
                        marginTop: -0.5,
                        color: (theme) => theme.palette.primary.light,
                        '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                        },
                    }}
                    disableRipple
                >
                    <Icon path={mdiClose} size={1} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
};

function Dialog(props) {
    return (
        <MuiDialog
            open={props.open}
            PaperProps={{ sx: { borderRadius: 0 } }}
            fullScreen={props.fullScreen}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            onClose={props.onClose}
            sx={
                !props.closeIcon
                    ? { zIndex: (theme) => theme.zIndex.modal + 2 }
                    : {}
            }
        >
            <DialogTitle
                onClose={props.onClose}
                closeIcon={props.closeIcon}
                onBack={props.onBack}
                backIcon={props.backIcon}
                noPadding={props.noPadding}
            >
                {props.title}
            </DialogTitle>
            {props.content ? (
                <DialogContent sx={{ margin: 0, padding: 2 }}>
                    {props.content}
                </DialogContent>
            ) : null}
            {props.actions ? (
                <DialogActions sx={{ margin: 0, padding: 2, paddingTop: 0 }}>
                    {props.actions}
                </DialogActions>
            ) : null}
        </MuiDialog>
    );
}

export default Dialog;
