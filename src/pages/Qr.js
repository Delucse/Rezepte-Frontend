import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import QrReader from 'react-qr-reader';
import Alert from '../components/Alert';
import {
    FormControl,
    Select,
    MenuItem,
    InputAdornment,
    Box,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiCamera } from '@mdi/js';

function Qr() {
    const navigate = useNavigate();

    // const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(true);
    const [camera, setCamera] = useState(false);
    const [devices, setDevices] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        initial();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            if (window.localstream) {
                const tracks = window.localstream.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
                window.localstream = null;
            }
        };
    });

    const initial = async () => {
        if (
            'mediaDevices' in navigator &&
            'getUserMedia' in navigator.mediaDevices
        ) {
            const deviceList = await getCameraSelection();
            setDevices(deviceList);
            if (deviceList && deviceList.length > 0) {
                setId(deviceList[0].deviceId);
                startStream({
                    video: {
                        deviceId: {
                            exact: deviceList[0].deviceId,
                        },
                    },
                });
            } else {
                setCamera(false);
                setProgress(false);
            }
        }
    };

    const startStream = async (constraints) => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                // window.localstream = stream;
                var video = document.querySelector('video');
                if (video.srcObject) {
                    video.srcObject.getTracks().forEach((track) => {
                        track.stop();
                    });
                }
                video.srcObject = stream;
                video.onloadeddata = function (e) {
                    video.play();
                    setCamera(true);
                    setProgress(false);
                };
            })
            .catch((err) => {
                setCamera(false);
                setProgress(false);
                console.info(err);
            });
    };

    const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
        );
        return videoDevices;
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleScan = (data) => {
        if (data) {
            const url = window.location.origin;
            const pattern = new RegExp(url, 'g');
            if (pattern.test(data)) {
                // setUrl(url);
                navigate(data.replace(url, ''));
            } else {
                // setUrl(
                //     'Es ist nur eine URL gültig, die auf diese Webseite verweist.'
                // );
            }
        } else {
            // setUrl('Es muss ein gültiger QR-Code vorgezeigt werden.');
        }
    };

    const handleChange = (event) => {
        setProgress(true);
        setId(event.target.value);
        startStream({
            video: {
                deviceId: {
                    exact: event.target.value,
                },
            },
        });
    };

    return 'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices ? (
        <div>
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
            {!progress ? (
                camera ? (
                    devices.length > 1 ? (
                        <div
                            style={{
                                maxWidth: '500px',
                                width: '100%',
                                margin: 'auto',
                            }}
                        >
                            <FormControl fullWidth>
                                <Select
                                    value={id}
                                    onChange={(e) => handleChange(e)}
                                    sx={{ borderRadius: 0, height: '56px' }}
                                    startAdornment={
                                        <InputAdornment
                                            sx={{
                                                maxHeight: '56px',
                                                height: '56px',
                                            }}
                                            position="start"
                                        >
                                            <Icon path={mdiCamera} size={1} />
                                        </InputAdornment>
                                    }
                                >
                                    {devices.map((device, index) => (
                                        <MenuItem
                                            value={device.deviceId}
                                            key={index}
                                        >
                                            {device.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    ) : null
                ) : (
                    <Alert
                        error
                        message="Der QR-Scanner wird leider nicht auf deinem Endgerät unterstützt. Benutze ein anderes Gerät, das eine Kamera besitzt."
                    />
                )
            ) : null}
        </div>
    ) : (
        <Alert
            error
            message="Der QR-Scanner wird leider nicht in deinem Browser unterstützt."
        />
    );
}

export default Qr;
