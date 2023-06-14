import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import Icon from '@mdi/react';

function Accordion(props) {
    return (
        <MuiAccordion
            id={props.id}
            expanded={props.expanded}
            onChange={props.onChange}
            disableGutters
            elevation={0}
            square
            sx={{
                '&:not(:last-child)': {
                    borderBottom: (theme) =>
                        props.divider
                            ? `1px solid ${theme.palette.divider}`
                            : 'none',
                },
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<Icon path={props.icon} size={1} />}
                sx={{
                    paddingRight: props.divider ? '16px' : 0,
                    paddingLeft: props.divider ? '16px' : 0,
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                        marginLeft: (theme) => theme.spacing(1),
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        color: (theme) => theme.palette.action.disabled,
                        transform: props.rotation ? 'rotate(-45deg)' : 'none',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(0deg)',
                    },
                    '&:hover': {
                        color: (theme) => theme.palette.primary.light,
                    },
                }}
            >
                <Typography
                    sx={{ fontWeight: props.divider ? 'normal' : 'bold' }}
                >
                    {props.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    marginBottom: '10px',
                    fontStyle: props.divider ? 'italic' : 'normal',
                    paddingRight: props.divider ? '16px' : 0,
                    paddingLeft: props.divider ? '16px' : 0,
                }}
            >
                <Typography>{props.answer}</Typography>
            </AccordionDetails>
        </MuiAccordion>
    );
}

function Questions({ themes, icon, rotation, style }) {
    const navigate = useNavigate();
    const location = useLocation();
    const hash = location.hash;

    const state = useSelector((state) => state);

    useEffect(() => {
        if (hash !== '') {
            const div = document.getElementById(hash);
            if (div) {
                setExpanded(hash);
                window.scrollTo({
                    top: div.offsetTop,
                    behavior: 'smooth',
                });
            }
            navigate(location.pathname, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [expanded, setExpanded] = useState(null);

    const handleChange = (newExpanded, panel) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={style}>
            {themes(state).map((theme, index) =>
                theme.title ? (
                    <Box
                        key={theme.hash}
                        sx={{ marginTop: index === 0 ? 0 : '20px' }}
                    >
                        <Typography
                            id={theme.hash}
                            color="text.primary"
                            sx={{ fontWeight: 'bold', marginBottom: '10px' }}
                        >
                            {theme.title}
                        </Typography>
                        {theme.questions.map((q) => (
                            <Accordion
                                id={q.hash}
                                key={q.hash}
                                expanded={expanded === q.hash}
                                icon={icon}
                                rotation={rotation}
                                question={q.question}
                                answer={q.answer}
                                divider
                                onChange={(event, newExpanded) =>
                                    handleChange(newExpanded, q.hash)
                                }
                            />
                        ))}
                    </Box>
                ) : (
                    <Accordion
                        id={theme.hash}
                        key={theme.hash}
                        expanded={expanded === theme.hash}
                        icon={icon}
                        rotation={rotation}
                        question={theme.question}
                        answer={theme.answer}
                        onChange={(event, newExpanded) =>
                            handleChange(newExpanded, theme.hash)
                        }
                    />
                )
            )}
        </Box>
    );
}

export default Questions;
