import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setColors, setCookiesOpen } from '../actions/settingsActions';

import { ChromePicker } from 'react-color';

import Button from '../components/Button';
import Help from '../components/Help';

import {
    Popover,
    ButtonGroup,
    Box,
    useTheme,
    useMediaQuery,
    Typography,
    Backdrop,
    Divider,
} from '@mui/material';

function rgbaToRgb(rgb, alpha) {
    return {
        r: parseInt((1 - alpha) * 255 + alpha * rgb.r),
        g: parseInt((1 - alpha) * 255 + alpha * rgb.g),
        b: parseInt((1 - alpha) * 255 + alpha * rgb.b),
    };
}

function rgbToHex({ r, g, b }) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    return '#' + r.padStart(2, '0') + g.padStart(2, '0') + b.padStart(2, '0');
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

    const cookie = useSelector((state) => state.settings.cookies.preferences);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeColor = (color) => {
        setMainColor(color.hex);
        setLightColor(rgbToHex(rgbaToRgb(color.rgb, 0.5)));
    };

    const submit = () => {
        dispatch(setColors({ main: mainColor, light: lightColor, mode }));
    };

    return (
        <>
            {!cookie ? (
                <Box sx={{ color: (theme) => theme.palette.text.primary }}>
                    Du kannst die nachfolgenden Einstellungen ausschließlich
                    vornehmen, wenn Du in der Vergangenheit das Setzen von{' '}
                    <Box
                        onClick={() => dispatch(setCookiesOpen(true))}
                        sx={{
                            display: 'inline',
                            color: (theme) => theme.palette.primary.main,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Präferenz-Cookies
                    </Box>{' '}
                    erlaubt hast.
                    <Divider sx={{ margin: '15px 0' }} />
                </Box>
            ) : null}
            <Box sx={{ position: 'relative' }}>
                <Backdrop
                    open={!cookie}
                    sx={{
                        zIndex: 2,
                        position: 'absolute',
                        opacity: '0 !important',
                        cursor: 'not-allowed',
                    }}
                />
                <div>
                    <Typography
                        component="div"
                        variant="body1"
                        sx={{
                            display: 'flex',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: (theme) => theme.palette.text.primary,
                        }}
                    >
                        Modus
                        <Help
                            explanation={
                                <div>
                                    "Light" beschreibt ein helles Thema mit
                                    weißem Hintergrund.
                                    <br />
                                    "Dark" meint ein dunkles Thema mit
                                    dunkelgrauem Hintergrund.
                                    <br />
                                    "System" bezieht sich auf die Einstellung
                                    des gerade genutzen Gerätes und kann daher
                                    sowohl "Light" als auch "Dark" sein.
                                </div>
                            }
                        />
                    </Typography>
                    <ButtonGroup
                        variant="outlined"
                        sx={{ marginBottom: '20px' }}
                    >
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
                                    background: (theme) =>
                                        theme.palette.primary.main,
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
                                    background: (theme) =>
                                        theme.palette.primary.main,
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
                                    background: (theme) =>
                                        theme.palette.primary.main,
                                    color: (theme) =>
                                        theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            Dark
                        </Button>
                    </ButtonGroup>
                    <Typography
                        component="div"
                        variant="body1"
                        sx={{
                            display: 'flex',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: (theme) => theme.palette.text.primary,
                        }}
                    >
                        Farbschema
                        <Help explanation="Mit einem Klick auf die unteren Farbkachel lässt sich die Hauptfarbe der Anwendung anpassen. Auf Grundlage der gewählten Hauptfarbe wird automatisch eine stimmige hellere Farbe berechnet." />
                    </Typography>
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
                                    color: theme.palette.getContrastText(
                                        mainColor
                                    ),
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
                                    color: theme.palette.getContrastText(
                                        lightColor
                                    ),
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
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
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
                                        backgroundColor:
                                            theme.palette.primary.light,
                                        color: theme.palette.primary
                                            .contrastText,
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
            </Box>
        </>
    );
}

export default Settings;
