import React from 'react';

import { useSelector } from 'react-redux';

import Tooltip from '../Tooltip';

import { Box, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiClockOutline, mdiStove, mdiTimerPauseOutline } from '@mdi/js';

const msToReadableTime = (time) => {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const days = parseInt(time / day);
    const hours = parseInt((time - days * day) / hour);
    const minutes = parseInt((time - days * day - hours * hour) / minute);
    var title = '';
    if (days > 0) {
        title += `${days} ${days > 1 ? 'Tage' : 'Tag'}`;
    }
    if (hours > 0) {
        title += `${title !== '' ? ' ' : ''}${hours} ${
            hours > 1 ? 'Stunden' : 'Stunde'
        }`;
    }
    if (minutes > 0) {
        title += `${title !== '' ? ' ' : ''}${minutes} ${
            minutes > 1 ? 'Minuten' : 'Minute'
        }`;
    }
    return title;
};

function Time({ time, title, icon }) {
    return time > 0 ? (
        <Tooltip title={title}>
            <Box
                sx={{
                    '&:hover': {
                        color: (theme) => theme.palette.primary.light,
                    },
                    color: (theme) => theme.palette.primary.main,
                    display: 'flex',
                }}
            >
                <Icon
                    path={icon}
                    size={'18px'}
                    style={{
                        color: 'inherit',
                        minWidth: '18px',
                        margin: '3px 10px 3px 0',
                    }}
                />
                <Typography variant="body1" sx={{ width: 'max-content' }}>
                    {msToReadableTime(time)}
                </Typography>
            </Box>
        </Tooltip>
    ) : null;
}

function Times() {
    const time = useSelector((state) => state.recipe.time);

    return (
        <Box
            sx={{
                display: { xs: 'inherit', md: 'flex' },
                flexFlow: 'wrap',
            }}
        >
            <Time
                time={time.preparation}
                title="Zubereitungszeit"
                icon={mdiClockOutline}
            />
            {time.preparation > 0 && time.resting > 0 ? (
                <Box
                    sx={{
                        display: { xs: 'none', md: 'unset' },
                        margin: '0 8px',
                    }}
                >
                    |
                </Box>
            ) : null}
            <Time
                time={time.resting}
                title="Ruhezeit"
                icon={mdiTimerPauseOutline}
            />
            {time.resting > 0 && time.baking > 0 ? (
                <Box
                    sx={{
                        display: { xs: 'none', md: 'unset' },
                        margin: '0 8px',
                    }}
                >
                    |
                </Box>
            ) : null}
            <Time time={time.baking} title="Backzeit" icon={mdiStove} />
        </Box>
    );
}

export default Times;
