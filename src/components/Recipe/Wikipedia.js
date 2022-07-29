import React, { useState, useEffect } from 'react';

import moment from 'moment';

import Dialog from '../Dialog';

import { Box, IconButton, Link } from '@mui/material';

import Icon from '@mdi/react';
import { mdiWikipedia } from '@mdi/js';

function Wikipedia(props) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({
        text: '',
        image: null,
        date: null,
        url: null,
        loading: true,
    });

    useEffect(() => {
        if (open) {
            fetch(
                `https://de.wikipedia.org/api/rest_v1/page/summary/${props.info}`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.extract) {
                        setContent({
                            text: data.extract,
                            image: data.thumbnail && data.thumbnail.source,
                            date: data.timestamp,
                            url: data.content_urls.desktop.page,
                            loading: false,
                        });
                    } else {
                        setContent({
                            text: 'Es konnten keine passenden eindeutigen Informationen gefunden werden.',
                            loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setContent({
                        text: 'Fehler. Probiere es später erneut.',
                        loading: false,
                    });
                });
        } else {
            setContent({
                text: '',
                image: null,
                date: null,
                url: null,
                loading: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <div
            id="wikipedia"
            style={{
                marginLeft: '4px',
                height: '24px',
                alignItems: 'center',
                display: 'flex',
                visibility: 'hidden',
            }}
        >
            <IconButton
                sx={{
                    padding: '2px',
                    width: '22px',
                    height: '22px',
                    background: (theme) => theme.palette.action.hover,
                    border: (theme) =>
                        `1px solid ${theme.palette.primary.light}`,
                    color: (theme) => theme.palette.primary.light,
                    '&:hover': {
                        border: (theme) =>
                            `1px solid ${theme.palette.primary.main}`,
                        color: (theme) => theme.palette.primary.main,
                    },
                }}
                onClick={() => setOpen(true)}
                disableRipple
            >
                <Icon path={mdiWikipedia} size={0.7} />
            </IconButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                closeIcon
                title={props.info}
                maxWidth={'md'}
                fullWidth
                content={
                    content.loading ? (
                        'Informationen werden geladen ...'
                    ) : (
                        <Box>
                            {content.image ? (
                                <Box
                                    component={'img'}
                                    src={content.image}
                                    alt={props.info}
                                    sx={{
                                        float: 'left',
                                        marginRight: '16px',
                                        marginBottom: '10px',
                                        width: { xs: '100%', sm: 'auto' },
                                        maxWidth: { xs: '100%', sm: '50%' },
                                        maxHeight: {
                                            xs: '250px',
                                            sm: 'auto',
                                        },
                                        objectFit: 'cover',
                                    }}
                                />
                            ) : null}
                            <Box sx={{ textAlign: 'justify' }}>
                                {content.text}
                            </Box>
                            {content.url && content.date ? (
                                <Box
                                    sx={{
                                        marginTop: '10px',
                                        fontSize: '14px',
                                        fontStyle: 'italic',
                                        float: 'left',
                                        clear: 'both',
                                    }}
                                >
                                    <Link
                                        href={content.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        underline="hover"
                                        sx={{
                                            color: (theme) =>
                                                theme.palette.primary.light,
                                            '&:hover': {
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                            },
                                        }}
                                    >
                                        © Wikipedia
                                    </Link>
                                    , Stand:{' '}
                                    {moment(content.date).format(
                                        'DD.MM.YYYY, HH:mm'
                                    )}{' '}
                                    Uhr
                                </Box>
                            ) : null}
                        </Box>
                    )
                }
            />
        </div>
    );
}

export default Wikipedia;
