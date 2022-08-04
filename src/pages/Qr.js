import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { snackbarMessage } from '../actions/messageActions';

import { useNavigate } from 'react-router-dom';

import QrReader from 'react-qr-reader';

import Dialog from '../components/Dialog';
import Alert from '../components/Alert';
import Button from '../components/Button';

import { Box } from '@mui/material';

function Qr() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(true);
    const [stream, setStream] = useState(null);

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
    }, [stream]);

    useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const startStream = async (constraints) => {
        if (
            'mediaDevices' in navigator &&
            'getUserMedia' in navigator.mediaDevices
        ) {
            const constraints = {
                video: {
                    facingMode: 'environment',
                },
            };
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((str) => {
                    setStream(str);
                    var video = document.querySelector('video');
                    video.srcObject = str;
                    video.onloadedmetadata = () => {
                        video.play();
                    };
                    setProgress(false);
                })
                .catch((err) => {
                    setStream(null);
                    setProgress(false);
                });
        }
    };

    const stopStream = () => {
        setProgress(true);
        var video = document.querySelector('video');
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach((track) => {
                track.stop();
            });
        }
        setStream(null);
    };

    const handleVisibilityChange = () => {
        if (!stream && document.visibilityState === 'visible') {
            startStream();
        } else {
            stopStream();
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleScan = (data) => {
        if (data) {
            const url = window.location.origin;
            const pattern = new RegExp(url, 'g');
            if (pattern.test(data)) {
                navigate(data.replace(url, ''));
            } else {
                stopStream();
                setUrl(data);
                setOpen(true);
            }
        }
    };

    const cancel = () => {
        startStream();
        setOpen(false);
    };

    const copy = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
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
        }
        dispatch(
            snackbarMessage(
                'QR-Code-Inhalt wurde erfolgreich in Zwischenablage gespeichert.',
                `qr${Date.now()}`
            )
        );
        cancel();
    };

    return 'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices ? (
        <div>
            {!progress && !stream ? (
                <Alert
                    error
                    message="Der QR-Scanner wird leider nicht auf deinem Endgerät unterstützt oder du hast die Berechtigung zur Nutzung der Kamera untersagt."
                />
            ) : null}
            <Box
                sx={{
                    justifyContent: 'center',
                    display: 'flex',
                    '.qrImageWrapper section div': {
                        boxShadow: (theme) =>
                            `${theme.palette.primary.light} 0px 0px 0px 5px inset !important`,
                    },
                }}
            >
                <QrReader
                    delay={500}
                    onError={handleError}
                    onScan={handleScan}
                    style={{
                        maxWidth: '500px',
                        width: '100%',
                    }}
                    className="qrImageWrapper"
                />
            </Box>
            <Dialog
                open={open}
                onClose={cancel}
                maxWidth="sm"
                fullWidth
                closeIcon
                title={
                    url && url.includes('http')
                        ? 'Link öffnen'
                        : 'Text kopieren'
                }
                content={<div>{url}</div>}
                actions={
                    <div>
                        <Button
                            onClick={cancel}
                            variant="outlined"
                            sx={{ mr: 1 }}
                        >
                            Abbrechen
                        </Button>
                        {url && url.includes('http') ? (
                            <Button
                                component="a"
                                onClick={() => setOpen(false)}
                                href={url}
                                target="_blank"
                                variant="contained"
                            >
                                Bestätigen
                            </Button>
                        ) : (
                            <Button onClick={copy} variant="contained">
                                Bestätigen
                            </Button>
                        )}
                    </div>
                }
            />
        </div>
    ) : (
        <Alert
            error
            message="Der QR-Scanner wird leider nicht in deinem Browser unterstützt."
        />
    );
}

export default Qr;
