import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import moment from 'moment';

import Tape from '../Tape';
import ImageCarousel from '../ImageCarousel';
import AddImage from './AddImage';
import IconButton from '../IconButton';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const CircularSwipeableViews = virtualize(SwipeableViews);

function Images({ pictures, title, add }) {
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = pictures.length;
    const authors = pictures.map((pic) =>
        !pic._id
            ? `von ${user} am ${moment().format(
                  'DD.MM.YYYY [um] HH:mm'
              )} Uhr hochgeladen`
            : `von ${pic.user} am ${moment(pic.date).format(
                  'DD.MM.YYYY [um] HH:mm'
              )} Uhr hochgeladen`
    );
    pictures = pictures.map((pic) =>
        !pic._id ? pic.file : `${process.env.REACT_APP_IMAGE_URL}/${pic.file}`
    );

    useEffect(() => {
        if (open) {
            setOpen(false);
        }
    }, [open]);

    const handleOpen = (i) => {
        setActiveStep(i);
        setOpen(true);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const slideRenderer = ({ index, key }) => {
        index = mod(index, maxSteps);
        return (
            <Box
                key={key}
                sx={{
                    height: 240,
                    width: '100%',
                    backgroundImage: `url(${pictures[index]})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    cursor: 'pointer',
                }}
                onClick={() => handleOpen(index)}
            />
        );
    };

    return maxSteps > 0 ? (
        <Box id="slider" sx={{ position: 'relative' }}>
            {maxSteps > 1 ? (
                <Box>
                    <IconButton
                        id="sliderBack"
                        sx={{
                            visibility: 'hidden',
                            borderRadius: '50%',
                            border: `1px solid`,
                            color: (theme) => theme.palette.primary.main,
                            borderColor: (theme) => theme.palette.primary.main,
                            background: (theme) => theme.palette.action.hover,
                            position: 'absolute',
                            top: 'calc(50% - 12px)',
                            left: '8px',
                            zIndex: 1,
                            '&:hover': {
                                color: (theme) => theme.palette.action.hover,
                                borderColor: (theme) =>
                                    theme.palette.action.hover,
                                background: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                        onClick={handleBack}
                    >
                        <Icon path={mdiChevronLeft} size={1} />
                    </IconButton>
                    <CircularSwipeableViews
                        axis={'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        slideRenderer={slideRenderer}
                        enableMouseEvents
                        overscanSlideAfter={1}
                        overscanSlideBefore={1}
                    />

                    <IconButton
                        id="sliderNext"
                        sx={{
                            visibility: 'hidden',
                            borderRadius: '50%',
                            border: `1px solid`,
                            color: (theme) => theme.palette.primary.main,
                            borderColor: (theme) => theme.palette.primary.main,
                            background: (theme) => theme.palette.action.hover,
                            position: 'absolute',
                            top: 'calc(50% - 12px)',
                            right: '8px',
                            zIndex: 1,
                            '&:hover': {
                                color: (theme) => theme.palette.action.hover,
                                borderColor: (theme) =>
                                    theme.palette.action.hover,
                                background: (theme) =>
                                    theme.palette.primary.main,
                            },
                        }}
                        onClick={handleNext}
                    >
                        <Icon path={mdiChevronRight} size={1} />
                    </IconButton>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '8px',
                            height: '7px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {pictures.map((picture, idx) => {
                            const modStep = mod(activeStep, maxSteps);
                            return (
                                <Box
                                    key={idx}
                                    sx={{
                                        backgroundColor:
                                            modStep === idx
                                                ? (theme) =>
                                                      theme.palette.primary.main
                                                : 'none',
                                        borderColor: (theme) =>
                                            theme.palette.primary.main,
                                        width: '7px',
                                        height: '7px',
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderRadius: '50%',
                                        marginLeft: idx === 0 ? 0 : '6px',
                                        cursor:
                                            activeStep !== idx
                                                ? 'pointer'
                                                : 'default',
                                    }}
                                    onClick={
                                        modStep !== idx
                                            ? () => setActiveStep(idx)
                                            : null
                                    }
                                />
                            );
                        })}
                    </Box>
                </Box>
            ) : (
                slideRenderer({ index: 0, key: 0 })
            )}
            {add ? (
                <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <AddImage />
                </Box>
            ) : null}
            {/* Tapes */}
            <Box sx={{ position: 'absolute', right: 30, top: -10 }}>
                <Tape rotate={50} width={100} />
            </Box>
            <Box sx={{ position: 'absolute', left: 40, top: 190 }}>
                <Tape rotate={40} width={142} />
            </Box>
            <ImageCarousel
                images={pictures}
                authors={authors}
                title={title}
                open={open}
                index={activeStep}
            />
        </Box>
    ) : null;
}

export default Images;
