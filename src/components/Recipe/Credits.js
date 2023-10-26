import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import Link from '../Link';
import SpiralBindingPaper from '../SpiralBindingPaper';
import Tape from '../Tape';

import { Box, Typography } from '@mui/material';

import Icon from '@mdi/react';
import { mdiBookOpenVariant, mdiLinkVariant } from '@mdi/js';

function Credits() {
    const credits = useSelector(
        (state) => state.recipe.credits && state.recipe.credits
    );
    const user = useSelector((state) => state.auth.user);
    const check = useSelector((state) => state.recipe.favorite);

    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            document.body.style.setProperty(
                '--credits',
                `${ref.current.offsetHeight}px`
            );
        } else {
            document.body.style.setProperty('--credits', `2px`);
        }
    }, [ref]);

    return credits ? (
        <Box
            sx={{
                zIndex: (theme) => theme.zIndex.notes,
                position: 'relative',
                marginTop: {
                    xs: '20px',
                    sm: '-5px',
                },
                marginBottom: 'calc(var(--credits) * -1 - 20px)',
            }}
        >
            <SpiralBindingPaper
                style={{
                    transform: `rotate(${
                        Math.floor(Math.random() * (5 - -5 + 1)) + -5
                    }deg)`,
                    position: 'relative',
                }}
            >
                <Tape
                    rotate={Math.floor(Math.random() * (93 - 87 + 1)) + 87}
                    width={Math.floor(Math.random() * (80 - 60 + 1)) + 60}
                    heart={user}
                    check={check}
                    transparency
                    style={{
                        top: '-50px',
                        position: 'absolute',
                        left: 'calc(100%/2)',
                    }}
                />
                <Typography
                    ref={ref}
                    variant="body2"
                    sx={{
                        fontStyle: 'italic',
                        color: 'black',
                        lineHeight: '24px',
                    }}
                >
                    <Icon
                        path={
                            credits.includes('https')
                                ? mdiLinkVariant
                                : mdiBookOpenVariant
                        }
                        size={1}
                        style={{ marginRight: '5px', marginBottom: '-4px' }}
                    />
                    {credits.split(' ').map((credit) => {
                        if (credit.startsWith('https://')) {
                            return (
                                <>
                                    <Link
                                        to={credit}
                                        target="_blank"
                                        style={{
                                            wordBreak: 'break-all',
                                            color: 'inherit',
                                        }}
                                    >
                                        {credit}
                                    </Link>{' '}
                                </>
                            );
                        } else {
                            return <>{credit} </>;
                        }
                    })}
                </Typography>
            </SpiralBindingPaper>
        </Box>
    ) : null;
}

export default Credits;
