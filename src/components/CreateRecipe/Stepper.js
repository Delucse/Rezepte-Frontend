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
            <Box sx={{paddingBottom: '10px', position: 'sticky', top: theme => `calc(55px + 50px + ${theme.spacing(3)})`, background: 'white'}}>
                {props.steps[activeStep].title}
            </Box>
            {activeStep === 0 ? 
                <Box sx={{float: 'left', width: '48px'}}></Box>
            :
                <IconButton 
                    sx={{padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'left', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleBack} 
                >
                    <Icon path={mdiChevronLeft} size={2}/>
                </IconButton>
            }
            {activeStep === props.steps.length-1 ?
                <Box sx={{float: 'right', width: '48px'}}></Box> 
            :
                <IconButton
                    sx={{padding: 0, position: 'sticky', top: `calc((100vh - 55px - 40px + 60px) / 2)`, float: 'right', zIndex: 1, color: theme => theme.palette.primary.light, '&:hover': {color: theme => theme.palette.primary.main}}} 
                    onClick={handleNext} 
                >
                    <Icon path={mdiChevronRight} size={2}/>
                </IconButton>
            }
            <div style={{margin: '0 48px 10px 48px', width: 'calc(100% - 2 * 48px)', height: '1000px'}}>
                    {props.steps[activeStep].content}
            </div>
            <Box sx={{ position: 'sticky', bottom: theme => theme.spacing(3), width: '100%', background: 'white', height: '60px' }}>
                <MuiStepper nonLinear  activeStep={activeStep} alternativeLabel>
                    {props.steps.map((label, index) => (
                        <Step key={index}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                <StepLabel StepIconProps={{icon: ''}}>{label.title}</StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </MuiStepper>
            </Box>
        </div>
        
    );
}

export default Stepper;
