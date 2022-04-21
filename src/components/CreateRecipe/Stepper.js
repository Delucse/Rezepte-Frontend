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
        <div>
            <Box sx={{height: '20px', paddingBottom: '10px', position: 'sticky', top: theme => `calc(55px + 50px + ${theme.spacing(3)})`, background: 'white', zIndex: 2}}>
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
            <Box sx={{margin: {xs: '10px 0px', md: '10px 48px 10px 48px'}, width: {xs: '100%', md: 'calc(100% - 2 * 48px)'}, paddingBottom: '60px', minHeight: theme =>`calc(100vh - 55px - ${theme.spacing(3)} - 74px - 70px - 20px - 60px - 30px)`}}>
                    {props.steps[activeStep].content}
            </Box>
            <Box sx={{ position: 'sticky', width: '100%', background: 'white', height: '60px', bottom: theme => theme.spacing(3), paddingTop: '10px', zIndex: 2 }}>
                <MuiStepper nonLinear activeStep={activeStep} alternativeLabel>
                    {props.steps.map((label, index) => (
                        <Step key={index}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                <StepLabel StepIconProps={{icon: ''}}><Box sx={{display: {xs: 'none', sm: 'inherit'}}}>{label.title}</Box></StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </MuiStepper>
            </Box>
        </div>
        
    );
}

export default Stepper;
