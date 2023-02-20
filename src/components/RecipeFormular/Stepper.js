import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { checkRecipeError } from '../../actions/recipeFormularActions';
import { resetMessage } from '../../actions/messageActions';

import { useParams } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import IconButton from '../IconButton';
import Help from '../Help';

import Box from '@mui/material/Box';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import { CircularProgress, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

function Content(props) {
    return (
        <Box
            sx={{
                margin: '0 24px',
                paddingBottom: '10px',
                minHeight: {
                    xs: `calc(100vh - 55px - 78px - 24px - 36px - 10px)`,
                    md: `calc(100vh - 55px - 78px - 24px - 70px - 10px)`,
                },
            }}
        >
            <Typography
                component="div"
                variant="body1"
                sx={{
                    display: 'flex',
                    fontWeight: 'bold',
                    paddingBottom: '10px',
                    position: 'sticky',
                    top: 'calc(55px + 78px)',
                    background: (theme) => theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                    zIndex: 2,
                }}
            >
                {props.title}
                <Help explanation={props.help} />
            </Typography>
            {props.step}
        </Box>
    );
}

function Stepper(props) {
    const dispatch = useDispatch();
    const portion = useSelector(
        (state) => state.recipeFormular.portion.count > 0
    );
    const keywordsLength = useSelector(
        (state) => state.recipeFormular.keywords.length
    );
    const ingredientsLength = useSelector((state) =>
        state.recipeFormular.ingredients
            .map((ingredient) => ingredient.food.length)
            .reduce((accumulator, curr) => accumulator + curr)
    );
    const stepsLength = useSelector(
        (state) => state.recipeFormular.steps.length
    );
    const picturesLength = useSelector(
        (state) => state.recipeFormular.pictures.order.length
    );
    const errorTitle = useSelector((state) => state.recipeFormular.error.title);
    const errorPortion = useSelector(
        (state) => state.recipeFormular.error.portion
    );
    const errorTime = useSelector((state) => state.recipeFormular.error.time);
    const errorCategories = useSelector(
        (state) => state.recipeFormular.error.categories
    );
    const errorIngredients = useSelector((state) =>
        state.recipeFormular.error.ingredients.includes(true)
    );
    const errorSteps = useSelector((state) => state.recipeFormular.error.steps);
    const errorPictures = useSelector(
        (state) => state.recipeFormular.error.pictures
    );
    const recipe = useSelector((state) => state.recipe);
    const error = useSelector((state) => state.message.error);
    const art = useSelector((state) => state.message.art);

    const { id } = useParams();
    const loading = useSelector(
        (state) =>
            state.progress.loading && state.progress.type === 'recipeFormular'
    );

    const [actions, setActions] = useState();

    useEffect(() => {
        if (actions) {
            actions.updateHeight();
        }
        if (error) {
            dispatch(resetMessage());
        }
        return () => {
            if (art === 'alert') {
                dispatch(resetMessage());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        portion,
        keywordsLength,
        ingredientsLength,
        stepsLength,
        picturesLength,
        errorTitle,
        errorPortion,
        errorTime,
        errorCategories,
        errorIngredients,
        errorSteps,
        errorPictures,
        recipe,
        actions,
    ]);

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.steps.length - 1;

    useEffect(() => {
        if (activeStep === maxSteps) {
            dispatch(checkRecipeError());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStep, maxSteps]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeStep]);

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
            {loading ? (
                <Box
                    id="load"
                    sx={{
                        position: 'fixed',
                        left: '-24px',
                        marginLeft: '24px',
                        width: 'calc(100% + 24px)',
                        height: '100%',
                        display: 'grid',
                        alignItems: 'center',
                        justifyItems: 'center',

                        background: (theme) => theme.palette.background.default,
                        opacity: 0.8,
                        zIndex: 10,
                    }}
                >
                    <Box
                        sx={{
                            justifyItems: 'center',
                            display: 'grid',
                            transform: 'translateY(-57px)',
                            height: '104px',
                            width: '200px',
                        }}
                    >
                        <CircularProgress size={70} />
                        <Typography
                            variant="body1"
                            sx={{
                                marginTop: '10px',
                                color: (theme) => theme.palette.text.primary,
                            }}
                        >
                            Rezept wird {id ? 'aktualisiert' : 'veröffentlicht'}
                        </Typography>
                    </Box>
                </Box>
            ) : null}
            {/* back */}
            <Box
                sx={{
                    position: 'fixed',
                    left: 0,
                    alignContent: 'center',
                    display: 'flex',
                    width: { xs: '24px', md: 'calc(48px + 15px)' },
                    background: (theme) => theme.palette.background.default,
                    height: {
                        xs: 'calc(100vh - 55px - 78px - 26px)',
                        md: 'calc(100vh - 55px - 78px - 60px)',
                    },
                    zIndex: 3,
                }}
            >
                {activeStep === 0 ? null : (
                    <IconButton
                        sx={{
                            display: { xs: 'none', md: 'inherit' },
                            padding: '0 5px 0 10px',
                            color: (theme) => theme.palette.primary.light,
                            '&:hover': {
                                color: (theme) => theme.palette.primary.main,
                            },
                        }}
                        onClick={handleBack}
                    >
                        <Icon path={mdiChevronLeft} size={2} />
                    </IconButton>
                )}
            </Box>
            {/* next */}
            <Box
                sx={{
                    position: 'fixed',
                    right: 0,
                    alignContent: 'center',
                    display: 'flex',
                    width: { xs: '24px', md: 'calc(48px + 15px)' },
                    background: (theme) => theme.palette.background.default,
                    height: {
                        xs: 'calc(100vh - 55px - 78px - 26px)',
                        md: 'calc(100vh - 55px - 78px - 60px)',
                    },
                    zIndex: 3,
                }}
            >
                {activeStep === maxSteps ? null : (
                    <IconButton
                        sx={{
                            display: { xs: 'none', md: 'inherit' },
                            padding: '0 10px 0 5px',
                            color: (theme) => theme.palette.primary.light,
                            '&:hover': {
                                color: (theme) => theme.palette.primary.main,
                            },
                        }}
                        onClick={handleNext}
                    >
                        <Icon path={mdiChevronRight} size={2} />
                    </IconButton>
                )}
            </Box>
            {/* content to swipe */}
            <Box
                sx={{
                    width: {
                        xs: 'calc(100% + 2 * 24px)',
                        md: 'calc(100% - 2 * 15px - 1px)',
                    },
                    marginLeft: { xs: '-24px', md: '15px' },
                    marginRight: { xs: 0, md: '1px' },
                }}
            >
                <SwipeableViews
                    resistance
                    axis={'x'}
                    index={activeStep}
                    onChangeIndex={(index) => handleStep(index)}
                    enableMouseEvents
                    animateHeight
                    action={(hook) => setActions(hook)}
                    style={{ overflow: 'clip' }}
                    slideClassName="slideOverflow"
                >
                    {props.steps.map((step, index) => (
                        <Content
                            step={step.content}
                            title={step.title}
                            help={step.help}
                            key={index}
                        />
                    ))}
                </SwipeableViews>
            </Box>
            {/* stepper */}
            <Box
                sx={{
                    position: 'sticky',
                    width: 'calc(100% + 2 * 24px)',
                    marginLeft: '-24px',
                    background: (theme) => theme.palette.background.default,
                    height: { xs: '26px', md: '60px' },
                    bottom: (theme) => theme.spacing(3),
                    paddingTop: '10px',
                    zIndex: 2,
                }}
            >
                <MuiStepper
                    nonLinear
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ margin: '0 24px' }}
                >
                    {props.steps.map((label, index) => (
                        <Step
                            key={index}
                            sx={{
                                height: {
                                    xs: '24px',
                                    md: 'inherit',
                                    paddingLeft: `${index === 0 ? '0' : '8px'}`,
                                    paddingRight: `${
                                        index === maxSteps ? '0' : '8px'
                                    }`,
                                },
                            }}
                        >
                            <StepButton
                                color="inherit"
                                onClick={() => handleStep(index)}
                                sx={{
                                    padding: '0px 16px',
                                    margin: '0px -16px',
                                }}
                            >
                                <StepLabel
                                    StepIconProps={{ icon: '' }}
                                    sx={{
                                        height: { xs: '24px', md: 'inherit' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'inherit',
                                            },
                                        }}
                                    >
                                        {label.title}
                                    </Box>
                                </StepLabel>
                            </StepButton>
                        </Step>
                    ))}
                </MuiStepper>
            </Box>
        </div>
    );
}

export default Stepper;
