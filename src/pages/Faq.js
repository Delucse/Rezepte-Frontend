import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiSilverwareVariant } from '@mdi/js';

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
                        `1px solid ${theme.palette.divider}`,
                },
                '&:before': {
                    display: 'none',
                },
            }}
        >
            <AccordionSummary
                expandIcon={<Icon path={mdiSilverwareVariant} size={1} />}
                sx={{
                    flexDirection: 'row-reverse',
                    '& .MuiAccordionSummary-content': {
                        marginLeft: (theme) => theme.spacing(1),
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        color: (theme) => theme.palette.action.disabled,
                        transform: 'rotate(-45deg)',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(0deg)',
                    },
                    '&:hover': {
                        color: (theme) => theme.palette.primary.light,
                    },
                }}
            >
                <Typography>{props.question}</Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{ marginBottom: '10px', fontStyle: 'italic' }}
            >
                <Typography>{props.answer}</Typography>
            </AccordionDetails>
        </MuiAccordion>
    );
}

const themes = [
    {
        title: 'Allgemein',
        hash: '#allgemein',
        questions: [
            {
                hash: '#delucse',
                question: 'Was bedeutet "delucse"?',
                answer: 'Antwort auf Frage 1',
            },
        ],
    },
    {
        title: 'Rezepte',
        hash: '#rezepte',
        questions: [
            {
                hash: '#favorit',
                question: 'Wie kann ich ein Rezept meinem Kochbuch hinzufügen?',
                answer: 'Antwort auf Frage 2',
            },
            {
                hash: '#portion',
                question: 'Wie kann ich die Portionsangaben verändern?',
                answer: 'Antwort auf Frage 3',
            },
            {
                hash: '#erstellen',
                question: 'Wie kann ich ein neues Rezept erstellen?',
                answer: 'Antwort auf Frage 4',
            },
        ],
    },
    {
        title: 'Konto',
        hash: '#konto',
        questions: [
            {
                hash: '#registrierung',
                question: 'Was muss ich alles bei der Registrierung angeben?',
                answer: 'Antwort auf Frage 5',
            },
            {
                hash: '#abmeldung',
                question: 'Warum werde ich immer automatisch abgemeldet?',
                answer: 'Antwort auf Frage 6',
            },
        ],
    },
];

function Faq() {
    const navigate = useNavigate();
    const location = useLocation();
    const hash = location.hash;

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
        <div>
            {themes.map((theme, index) => (
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
                            question={q.question}
                            answer={q.answer}
                            onChange={(event, newExpanded) =>
                                handleChange(newExpanded, q.hash)
                            }
                        />
                    ))}
                </Box>
            ))}
        </div>
    );
}

export default Faq;
