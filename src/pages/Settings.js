import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setColors } from '../actions/settingsActions';

import { ChromePicker } from 'react-color';

import Button from '../components/Button';

import {
    Popover,
    ButtonGroup,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';

function rgbaToRgb(rgb, alpha) {
    return `rgb(${(1 - alpha) * 255 + alpha * rgb.r}, ${
        (1 - alpha) * 255 + alpha * rgb.g
    }, ${(1 - alpha) * 255 + alpha * rgb.b})`;
}

function Settings() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const systemModeIsDark = useMediaQuery('(prefers-color-scheme: dark)');

    const [mainColor, setMainColor] = useState(theme.palette.primary.main);
    const [lightColor, setLightColor] = useState(theme.palette.primary.light);
    const themeMode = useSelector((state) => state.settings.color.mode);
    const [mode, setMode] = useState(themeMode);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeColor = (color) => {
        setMainColor(color.hex);
        setLightColor(rgbaToRgb(color.rgb, 0.5));
    };

    const submit = () => {
        dispatch(setColors({ main: mainColor, light: lightColor, mode }));
    };

    return (
        <div>
            <Box
                sx={{
                    marginBottom: '10px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                Modus
            </Box>
            <ButtonGroup variant="outlined" sx={{ marginBottom: '20px' }}>
                <Button
                    onClick={() => setMode('light')}
                    sx={{
                        background: (theme) =>
                            mode === 'light'
                                ? theme.palette.primary.main
                                : 'inherit',
                        color: (theme) =>
                            mode === 'light'
                                ? theme.palette.primary.contrastText
                                : theme.palette.primary.main,
                        '&:hover': {
                            background: (theme) => theme.palette.primary.main,
                            color: (theme) =>
                                theme.palette.primary.contrastText,
                        },
                    }}
                >
                    Light
                </Button>
                <Button
                    onClick={() => setMode('system')}
                    sx={{
                        background: (theme) =>
                            mode === 'system'
                                ? theme.palette.primary.main
                                : 'inherit',
                        color: (theme) =>
                            mode === 'system'
                                ? theme.palette.primary.contrastText
                                : theme.palette.primary.main,
                        '&:hover': {
                            background: (theme) => theme.palette.primary.main,
                            color: (theme) =>
                                theme.palette.primary.contrastText,
                        },
                    }}
                >
                    System
                </Button>
                <Button
                    onClick={() => setMode('dark')}
                    sx={{
                        background: (theme) =>
                            mode === 'dark'
                                ? theme.palette.primary.main
                                : 'inherit',
                        color: (theme) =>
                            mode === 'dark'
                                ? theme.palette.primary.contrastText
                                : theme.palette.primary.main,
                        '&:hover': {
                            background: (theme) => theme.palette.primary.main,
                            color: (theme) =>
                                theme.palette.primary.contrastText,
                        },
                    }}
                >
                    Dark
                </Button>
            </ButtonGroup>
            <Box
                sx={{
                    marginBottom: '10px',
                    color: (theme) => theme.palette.text.primary,
                }}
            >
                Farbschema
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    borderBottom: (theme) =>
                        `10px solid ${theme.palette.background.default}`,
                    width: 'max-content',
                }}
                onClick={handleClick}
            >
                <div
                    style={{
                        display: 'flex',
                        padding: '15px',
                        background:
                            mode === 'light'
                                ? '#fff'
                                : mode === 'dark'
                                ? '#121212'
                                : systemModeIsDark
                                ? '#121212'
                                : '#fff',
                        border: `1px solid ${
                            mode === 'dark'
                                ? '#fff'
                                : mode === 'light'
                                ? '#121212'
                                : systemModeIsDark
                                ? '#fff'
                                : '#121212'
                        }`,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: mainColor,
                            color: theme.palette.getContrastText(mainColor),
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                            lineHeight: '50px',
                        }}
                    >
                        {mainColor !== theme.palette.primary.main ||
                        mode !== theme.palette.mode
                            ? 'neu'
                            : ''}
                    </div>
                    <div
                        style={{
                            marginLeft: '2px',
                            backgroundColor: lightColor,
                            color: theme.palette.getContrastText(lightColor),
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                            lineHeight: '50px',
                        }}
                    />
                </div>
                {mainColor !== theme.palette.primary.main ||
                mode !== theme.palette.mode ? (
                    <div
                        style={{
                            display: 'flex',
                            padding: '15px',
                            marginLeft: '21px',
                            background:
                                themeMode === 'light'
                                    ? '#fff'
                                    : themeMode === 'dark'
                                    ? '#121212'
                                    : systemModeIsDark
                                    ? '#121212'
                                    : '#fff',
                            border: `1px solid ${
                                themeMode === 'dark'
                                    ? '#fff'
                                    : themeMode === 'light'
                                    ? '#121212'
                                    : systemModeIsDark
                                    ? '#fff'
                                    : '#121212'
                            }`,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                width: '50px',
                                height: '50px',
                                textAlign: 'center',
                                lineHeight: '50px',
                            }}
                        >
                            {mainColor !== theme.palette.primary.main ||
                            mode !== theme.palette.mode
                                ? 'alt'
                                : ''}
                        </div>
                        <div
                            style={{
                                marginLeft: '2px',
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText,
                                width: '50px',
                                height: '50px',
                                textAlign: 'center',
                                lineHeight: '50px',
                            }}
                        />
                    </div>
                ) : null}
            </Box>

            <Button
                variant="contained"
                sx={{ marginTop: '20px' }}
                onClick={submit}
                disabled={
                    mainColor === theme.palette.primary.main &&
                    mode === theme.palette.mode
                }
            >
                Einstellungen übernehmen
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: { borderRadius: 0 },
                }}
            >
                <ChromePicker
                    disableAlpha={true}
                    color={mainColor}
                    onChange={onChangeColor}
                />
            </Popover>
        </div>
    );
}

export default Settings;
