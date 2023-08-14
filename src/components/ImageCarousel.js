import React, { useState, useEffect } from 'react';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import IconButton from './IconButton';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
} from '@mui/material';

import Icon from '@mdi/react';
import { mdiClose, mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const CircularSwipeableViews = virtualize(SwipeableViews);

function ImageCarousel(props) {
    const [open, setOpen] = useState(props.open);
    const [index, setIndex] = useState(props.index);

    const handleClose = () => {
        setOpen(false);
    };

    const next = () => {
        setIndex(index + 1);
    };

    const back = () => {
        setIndex(index - 1);
    };

    const handleIndexChange = (idx) => {
        setIndex(idx);
    };

    useEffect(() => {
        if (props.open) {
            setIndex(props.index);
            setOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const slideRenderer = (object) => {
        const idx = mod(object.index, props.images.length);
        return (
            <Box
                key={object.key}
                sx={{
                    height: '100%',
                    transition: 'all .5s ease',
                    transform:
                        index === object.index ? 'scale(1)' : 'scale(0.8)',
                    backgroundImage: `url(${props.images[idx]})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}
            />
        );
    };

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const modIndex = mod(index, props.images.length);

    return (
        <Dialog
            sx={{ zIndex: 1500 }}
            PaperProps={{
                sx: { borderRadius: 0, background: 'rgba(0, 0, 0, 0.85)' },
            }}
            fullScreen={true}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                sx={{
                    padding: '7.5px 16px 7.5px 24px',
                    minHeight: '40px',
                    display: 'flex',
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        color: 'white',
                        width: 'calc(100% - 45px)',
                    }}
                >
                    <Typography
                        sx={{
                            lineHeight: 'inherit',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '13px',
                            color: 'white',
                            fontStyle: 'italic',
                        }}
                    >
                        {props.authors[modIndex]}
                    </Typography>
                </Box>
                <Box>
                    <IconButton
                        style={{ color: 'white' }}
                        onClick={handleClose}
                    >
                        <Icon path={mdiClose} size={1.7} />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ padding: '0px' }}>
                <Box sx={{ display: 'flex', height: 'calc(100% - 50px)' }}>
                    {props.images.length > 1 ? (
                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    float: 'left',
                                    width: { xs: '24px', sm: '55px' },
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        display: { xs: 'none', sm: 'inherit' },
                                        marginLeft: '7px',
                                    }}
                                    onClick={back}
                                >
                                    <Icon path={mdiChevronLeft} size={2} />
                                </IconButton>
                            </Box>
                            <CircularSwipeableViews
                                axis={'x'}
                                index={index}
                                onChangeIndex={handleIndexChange}
                                slideRenderer={slideRenderer}
                                overscanSlideAfter={1}
                                overscanSlideBefore={1}
                                containerStyle={{ height: '100%' }}
                                style={{
                                    maxWidth: `calc(100% - 2 * ${
                                        sm ? '55px' : '24px'
                                    })`,
                                    width: 'calc(100% + 2 * 24px)',
                                }}
                            />
                            <Box
                                sx={{
                                    height: '100%',
                                    float: 'right',
                                    width: { xs: '24px', sm: '55px' },
                                    alignItems: 'center',
                                    display: 'flex',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        display: { xs: 'none', sm: 'inherit' },
                                        marginRight: '7px',
                                    }}
                                    onClick={next}
                                >
                                    <Icon path={mdiChevronRight} size={2} />
                                </IconButton>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    width: `calc(100% - 2 * ${
                                        sm ? '55px' : '24px'
                                    })`,
                                    height: '100%',
                                    backgroundImage: `url(${props.images[index]})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    margin: 'auto',
                                }}
                            />
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {props.images.map((image, idx) => {
                        return (
                            <Box
                                key={idx}
                                sx={{
                                    backgroundColor:
                                        modIndex === idx ? 'white' : 'none',
                                    borderColor: 'white',
                                    width: '12px',
                                    height: '12px',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    borderRadius: '50%',
                                    marginLeft: idx === 0 ? 0 : '6px',
                                    cursor:
                                        index !== idx ? 'pointer' : 'default',
                                }}
                                onClick={
                                    modIndex !== idx
                                        ? () => setIndex(idx)
                                        : null
                                }
                            />
                        );
                    })}
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default ImageCarousel;
