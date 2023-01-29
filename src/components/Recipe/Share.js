import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { snackbarMessage, resetMessage } from '../../actions/messageActions';

import { useLocation } from 'react-router-dom';

import IconButton from '../IconButton';
import Tooltip from '../Tooltip';

import { SpeedDial, SpeedDialAction, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Icon from '@mdi/react';
import {
    mdiContentCopy,
    mdiEmailOutline,
    mdiShareVariant,
    mdiWhatsapp,
} from '@mdi/js';

const useStyles = makeStyles({
    tooltip: {
        fontSize: '12px',
        border: (theme) => `1px solid ${theme.palette.primary.light}`,
        borderRadius: 0,
        boxShadow: (theme) => theme.shadows[1],
        background: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
    },
});

const actions = [
    {
        icon: <Icon path={mdiWhatsapp} size={0.6} />,
        name: 'WhatsApp',
        href: (title, url) => {
            return `WhatsApp://send?text=${url}`;
        },
    },
    {
        icon: <Icon path={mdiEmailOutline} size={0.6} />,
        name: 'E-Mail',
        href: (title, url) => `mailto:?subject=${title}&body=${title}: ${url}.`,
    },
    {
        icon: <Icon path={mdiContentCopy} size={0.6} />,
        name: 'Kopieren',
        onClick: async (title, url, cb) => {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(url);
                cb('URL wurde erfolgreich in Zwischenablage gespeichert.');
            } else {
                var textArea = document.createElement('textarea');
                textArea.value = url;

                // Avoid scrolling to bottom
                textArea.style.top = '0';
                textArea.style.left = '0';
                textArea.style.width = '0';
                textArea.style.position = 'fixed';

                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                document.execCommand('copy');

                document.body.removeChild(textArea);
                cb('URL wurde erfolgreich in Zwischenablage gespeichert.');
            }
        },
    },
];

function Share() {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.recipe.id);
    const title = useSelector((state) => state.recipe.title);

    const url = `${process.env.REACT_APP_SHARE_URL}/${id}${
        useLocation().search
    }`;
    const type = useSelector((state) => state.message.type);

    const classes = useStyles(useTheme());

    useEffect(() => {
        if (type === 'share') {
            dispatch(resetMessage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return navigator.share ? (
        <IconButton
            tooltipProps={{ title: 'Teilen', placement: 'right' }}
            sx={{
                marginBottom: '25px',
                width: '24.8px',
                height: '23px',
                background: (theme) => theme.palette.action.hover,
                color: (theme) => theme.palette.primary.light,
                '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                },
            }}
            onClick={() =>
                navigator.share({
                    title: title,
                    url,
                })
            }
        >
            <Icon path={mdiShareVariant} size={1} />
        </IconButton>
    ) : (
        <Tooltip title="Teilen" placement="right">
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                direction="down"
                sx={{
                    marginBottom: '25px',
                    height: '23px',
                    background: (theme) => theme.palette.action.hover,
                }}
                FabProps={{
                    disableRipple: true,
                    sx: {
                        marginBottom: '9px',
                        padding: '0px',
                        width: '23px',
                        height: '23px',
                        minHeight: '23px',
                        boxShadow: 'none',
                        background: 'transparent',
                        color: (theme) => theme.palette.primary.light,
                        '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                            background: 'transparent',
                        },
                        '&:active': {
                            color: (theme) => theme.palette.primary.main,
                            background: 'transparent',
                            boxShadow: 'none',
                        },
                    },
                }}
                icon={<Icon path={mdiShareVariant} size={1} />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        component={action.href ? 'a' : 'button'}
                        FabProps={{
                            sx: {
                                margin: '0 0 25px 0',
                                padding: '0px',
                                width: '23px',
                                height: '23px',
                                minHeight: '23px',
                                boxShadow: 'none',
                                background: (theme) =>
                                    theme.palette.primary.light,
                                color: (theme) =>
                                    theme.palette.primary.contrastText,
                                '&:hover': {
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                },
                            },
                        }}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        TooltipClasses={classes}
                        href={action.href ? action.href(title, url) : null}
                        onClick={
                            action.onClick
                                ? () =>
                                      action.onClick(title, url, (text) => {
                                          dispatch(
                                              snackbarMessage(text, 'share')
                                          );
                                      })
                                : null
                        }
                    />
                ))}
            </SpeedDial>
        </Tooltip>
    );
}

export default Share;
