import React, { useState, useEffect } from 'react';

import Tape from '../Tape';
import ImageCarousel from "../ImageCarousel";
import AddImage from './AddImage';

import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const CircularSwipeableViews = virtualize(SwipeableViews);

function Images({pictures, title}){

    const [open, setOpen] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = pictures.length;
    pictures = pictures.map(pic => !pic._id ? pic.file : `${process.env.REACT_APP_API_URL}/media/${pic.file}`);

    useEffect(() => {
        if(open){
            setOpen(false);
        }
    }, [open])

    const handleOpen = (i) => {
        setActiveStep(i);
        setOpen(true)
    }
    
    const handleNext = () => {
        setActiveStep((prevActiveStep) => mod(prevActiveStep + 1, maxSteps));
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => mod(prevActiveStep - 1, maxSteps));
    };

    const handleStepChange = (step) => {
        setActiveStep(mod(step, maxSteps));
    };

    const slideRenderer = ({ index, key }) => {
        index = mod(index, maxSteps);
        return(
            <Box
                key={key}
                component="img"
                sx={{
                    height: 240,
                    width: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer'
                }}
                src={pictures[index]}
                alt={title}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `${process.env.PUBLIC_URL}/logo512.png`;
                    currentTarget.style = "height: 240px; width: 100%; object-fit: cover; filter: grayscale(1);";
                }}
                onClick={() => handleOpen(index)}
            />
        );
    };

    return(
        <Box sx={{position: 'relative'}}>
            {maxSteps > 1 ?
                <Box
                    id="recipeImages"
                    sx={{
                        position: 'relative', 
                        color: 'transparent',
                        borderColor: 'transparent',
                        '&:hover': {
                            color: theme => theme.palette.primary.main,
                            borderColor: theme => theme.palette.primary.main,
                        },
                    }}
                >
                    <CircularSwipeableViews
                        axis={'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        slideRenderer={slideRenderer}
                        enableMouseEvents
                        overscanSlideAfter={1}
                        overscanSlideBefore={1}
                    />
                    <Box sx={{position: 'absolute', top: 0, width: '100%'}}>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                    <Icon path={mdiChevronRight} size={1} onClick={handleNext} style={{cursor: 'pointer', padding: '1px', borderRadius: '50%', border: `1px solid`, borderColor: 'inherit', position: 'absolute', top: '108px', right: '8px'}}/>
                            }
                            backButton={
                                    <Icon path={mdiChevronLeft} size={1} onClick={handleBack} style={{cursor: 'pointer', padding: '1px', borderRadius: '50%', border: `1px solid`, borderColor: 'inherit', position: 'absolute', top: '108px'}}/>
                            }
                            sx={{
                                position: 'relative',
                                height: 0,
                                color: 'inherit',
                                borderColor: 'inherit',
                                background: 'transparent',
                                '.MuiMobileStepper-dots': {
                                    position: 'absolute',
                                    bottom: -216,
                                    width: 'calc(100% - 2 * 8px)',
                                    justifyContent: 'center',
                                }
                            }}
                        />
                    </Box>
                </Box>
            :   slideRenderer({index: 0, key: 0})}
            <Box sx={{position: 'absolute', bottom: 0, right: 0}}>
                <AddImage />
            </Box>
            {/* Tapes */}
            <Box sx={{position: 'absolute', right: 30, top: -10}}>
                <Tape rotate={50} width={100}/>
            </Box>
            <Box sx={{position: 'absolute', left: 40, top: 190}}>
                <Tape rotate={40} width={142}/>
            </Box>
            <ImageCarousel images={pictures} title={title} open={open} index={activeStep} />
        </Box>
    );
}

export default Images;