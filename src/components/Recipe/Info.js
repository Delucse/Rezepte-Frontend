import React from 'react';

import { useSelector } from 'react-redux';

import PaperClip from '../PaperClip';

import { Box } from '@mui/material';

function Info() {
    const portion = useSelector((state) => state.recipe.portion);
    const settings = useSelector((state) => state.recipe.settings);
    const time = useSelector(
        (state) =>
            state.recipe.time.preparation +
            state.recipe.time.resting +
            state.recipe.time.baking
    );

    return time > 0 &&
        (settings.count !== portion.count ||
            JSON.stringify(settings.form) !== JSON.stringify(portion.form)) ? (
        <Box
            sx={{
                marginTop: '24px',
                transform: 'rotate(1deg)',
            }}
        >
            <Box
                sx={{
                    padding: '12px',
                    position: 'relative',
                    marginRight: '-14px',
                    marginLeft: '16px',
                    lineHeight: '24px',
                    borderRadius: '2px',
                    background: (theme) => theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,

                    '&:before': {
                        content: '""',
                        position: 'absolute',
                        width: 'min(40%, 230px)',
                        height: '10px',
                        boxShadow: (theme) =>
                            `0 5px 14px ${theme.palette.text.secondary}`, // original:  rgba(0,0,0,.7)
                        zIndex: '-1',
                        transition: 'all .3s ease-in-out',
                        left: '15px',
                        transform: 'skew(-5deg) rotate(-5deg)',
                        bottom: '10px',
                    },

                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        width: 'min(40%, 230px)',
                        height: '10px',
                        boxShadow: (theme) =>
                            `0 5px 14px ${theme.palette.text.secondary}`, // original:  rgba(0,0,0,.7)
                        zIndex: '-1',
                        transition: 'all .3s ease-in-out',
                        top: '10px',
                        left: '15px',
                        transform: 'skew(-5deg) rotate(-175deg)',
                    },

                    '&:hover:before': {
                        boxShadow: (theme) =>
                            `0 2px 14px ${theme.palette.text.disabled}`, // original: rgba(0,0,0,.4)
                        left: '5px',
                    },

                    '&:hover:after': {
                        boxShadow: (theme) =>
                            `0 2px 14px ${theme.palette.text.disabled}`, // original: rgba(0,0,0,.4)
                        left: '5px',
                    },
                }}
            >
                Beachte, dass die angegebenen Zeiten je nach verwendeter
                Portionsgröße variieren können.
                <PaperClip
                    style={{
                        top: 0,
                        right: '-7px',
                        transform: 'rotate(79deg)',
                        borderColor: (theme) => theme.palette.primary.light,
                    }}
                />
            </Box>
        </Box>
    ) : null;
}

export default Info;
