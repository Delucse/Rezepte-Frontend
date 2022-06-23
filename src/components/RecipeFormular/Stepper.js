import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { checkRecipeError } from "../../actions/recipeFormularActions";

import SwipeableViews from 'react-swipeable-views';

import Box from '@mui/material/Box';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'; 

function Content(props){
    return (
        <Box
            id='content'
            sx={{
                margin: '0 24px', 
                paddingBottom: '10px', 
                minHeight: {
                    xs: `calc(100vh - 55px - 78px - 24px - 36px - 10px)`, 
                    md: `calc(100vh - 55px - 78px - 24px - 70px - 10px)`
                },
            }}
        >
                <Typography 
                    variant='body1' 
                    sx={{
                        fontWeight: 'bold', 
                        paddingBottom: '10px', 
                        position: 'sticky', 
                        top: 'calc(55px + 78px)', 
                        background: 'white',
                        zIndex: 2
                    }}
                >
                    {props.title}
                </Typography>
                {props.step}
        </Box>
    );
}

function Stepper(props) {

    const dispatch = useDispatch();
    const formular = useSelector((state) => state.recipeFormular);

    const [actions, setActions] = useState();
    
    useEffect(() => {
        if(actions){            
            actions.updateHeight();
        }
    }, [formular, actions]);

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.steps.length - 1;

    useEffect(() => {
        if(activeStep === maxSteps){
            dispatch(checkRecipeError());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStep, maxSteps]);
  
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => {
        setActiveStep(step);
    };
  
    return (
        <div>
            {activeStep === 0 ? 
                <Box sx={{float: 'left', width: {xs: '0px', md: '48px'}, height: '1px', marginLeft: '-11px'}}></Box>
            :
                <IconButton 
                    sx={{display: {xs: 'none', md: 'inherit'}, marginLeft: '-11px', padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'left', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleBack}
                >
                    <Icon path={mdiChevronLeft} size={2} />
                </IconButton>
            }
            {activeStep === maxSteps ?
                <Box sx={{float: 'right', width: {xs: '0px', md: '48px'}, height: '1px', marginRight: '-11px'}}></Box> 
            :
                <IconButton
                    sx={{display: {xs: 'none', md: 'inherit'}, marginRight: '-11px', padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'right', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleNext} 
                >
                    <Icon path={mdiChevronRight} size={2}/>
                </IconButton>
            }
            <Box sx={{width: 'calc(100% + 2 * 24px)', marginLeft: '-24px'}}>
                <SwipeableViews
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={(index) => handleStep(index)}
                    enableMouseEvents
                    animateHeight
                    action={(hook) => setActions(hook)}
                    style={{overflow: 'clip'}}
                    slideClassName='slideOverflow'
                >
                    {props.steps.map((step, index) => <Content step={step.content} title={step.title} key={index}/>)}
                </SwipeableViews>
            </Box>
            <Box sx={{ position: 'sticky', width: 'calc(100% + 2 * 24px)', marginLeft: '-24px', background: 'white', height: {xs: '26px', md: '60px'}, bottom: theme => theme.spacing(3), paddingTop: '10px', zIndex: 2 }}>
                <MuiStepper nonLinear activeStep={activeStep} alternativeLabel sx={{margin: '0 24px'}}>
                    {props.steps.map((label, index) => (
                        <Step key={index} sx={{height: {xs: '24px', md: 'inherit', paddingLeft: `${index === 0 ? '0' : '8px'}`, paddingRight: `${index === maxSteps ? '0' : '8px'}`}}}>
                            <StepButton color="inherit" onClick={() => handleStep(index)} sx={{padding: '0px 16px', margin: '0px -16px'}}>
                                <StepLabel StepIconProps={{icon: ''}} sx={{height: {xs: '24px', md: 'inherit'}}}><Box sx={{display: {xs: 'none', md: 'inherit'}}}>{label.title}</Box></StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </MuiStepper>
            </Box>
        </div>
        
    );
}

export default Stepper;
