import React from 'react';

import Box from '@mui/material/Box';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'; 

function Stepper(props) {
    const [activeStep, setActiveStep] = React.useState(0);

    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(null);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    }
    
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }
    
    const handleTouchEnd = () => {
        if(touchEnd){
            if (touchStart - touchEnd > 150) {
                if(activeStep > 0){
                    handleBack();
                }
            }
            else if (touchStart - touchEnd < -150) {
                if(activeStep < props.steps.length-1){
                    handleNext();
                }
            }
        }
        setTouchEnd(null)
    }
  
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
      };
  
    return (
        <div
            // onPointerDown={(e) => console.log(e.pointerType )}
            // onClick={(e) => e.preventDefault()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Box sx={{height: '20px', paddingBottom: '10px', position: 'sticky', top: theme => `calc(55px + 30px + 2 * ${theme.spacing(3)})`, background: 'white', zIndex: 2}}>
                {props.steps[activeStep].title}
            </Box>
            {activeStep === 0 ? 
                <Box sx={{float: 'left', width: {xs: '0px', md: '48px'}}}></Box>
            :
                <IconButton 
                    sx={{display: {xs: 'none', md: 'inherit'}, marginLeft: '-11px', padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'left', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleBack}
                >
                    <Icon path={mdiChevronLeft} size={2} />
                </IconButton>
            }
            {activeStep === props.steps.length-1 ?
                <Box sx={{float: 'right', width: {xs: '0px', md: '48px'}}}></Box> 
            :
                <IconButton
                    sx={{display: {xs: 'none', md: 'inherit'}, marginRight: '-11px' /*calc(- (48px / 2) + 14.8333px)*/, padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'right', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleNext} 
                >
                    <Icon path={mdiChevronRight} size={2}/>
                </IconButton>
            }
            <Box sx={{margin: {xs: '10px 0px', md: '10px 48px 10px 48px'}, width: {xs: '100%', md: 'calc(100% - 2 * 48px)'}, paddingBottom: {xs: '24px', md: '60px'}, minHeight: {xs: `calc(100vh - 55px - ${'24px'} - 78px - 34px - 20px - 24px - 30px)`, md: `calc(100vh - 55px - ${'24px'} - 78px - 70px - 20px - 60px - 30px)`}}}>
                    {props.steps[activeStep].content}
            </Box>
            <Box sx={{ position: 'sticky', width: '100%', background: 'white', height: {xs: '24px', md: '60px'}, bottom: theme => theme.spacing(3), paddingTop: '10px', zIndex: 2 }}>
                <MuiStepper nonLinear activeStep={activeStep} alternativeLabel>
                    {props.steps.map((label, index) => (
                        <Step key={index} sx={{height: {xs: '24px', md: 'inherit'}}}>
                            <StepButton color="inherit" onClick={handleStep(index)} sx={{padding: '0px 16px', margin: '0px -16px'}}>
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
