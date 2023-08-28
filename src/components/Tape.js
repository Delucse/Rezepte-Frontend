import React from 'react';

import { Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiHeart } from '@mdi/js';

// https://codepen.io/hunab/pen/DoNVPa

function GridBox(props) {
    return (
        <Box
            sx={{
                height: 'calc(1em - 2px)',
                gridTemplateColumns: `${
                    props.displace ? `${props.displace}px ` : ''
                }repeat(auto-fit, 16px)`,
                gridGap: '4px',
                display: 'grid',
                overflow: 'hidden',
            }}
        >
            {props.children}
        </Box>
    );
}

function Hearts({ transparency }) {
    return Array(10)
        .fill(0)
        .map((item, index) => {
            return (
                <Box
                    key={index}
                    sx={{
                        color: (theme) =>
                            `${theme.palette.primary.light}${
                                transparency ? 'cc' : ''
                            }`,
                        justifySelf: 'end',
                        marginTop: '-2px',
                    }}
                >
                    <Icon path={mdiHeart} size={0.6} />
                </Box>
            );
        });
}

function Tape({ rotate, top, width, heart, check, onClick, transparency }) {
    rotate = rotate ? rotate : 0;

    return (
        <Box
            sx={{
                paddingBottom: top ? 'calc(3em / 2)' : 0,
                paddingTop: top ? `${Math.abs(rotate)}px` : 0,
                justifyContent: 'center',
                display: 'flex',
            }}
        >
            <Box
                id="tape"
                onClick={onClick}
                sx={{
                    backgroundColor: 'hsla(0,0%,100%,.2)',
                    boxShadow: 'inset 0 0 1em .5em hsla(0,0%,100%,.1)',
                    height: '3em',
                    position: 'absolute',
                    transform: `rotate(${rotate}deg)`,
                    width: width ? `${width}px` : '9em',
                    filter: 'drop-shadow(0 1px 1px hsla(0,0%,0%,.3))',
                    zIndex: 1,
                    cursor: heart && onClick ? 'pointer' : 'default',

                    '&::after, &::before': {
                        backgroundSize: '.4em .4em',
                        bottom: 0,
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        width: '.2em',
                    },

                    '&::after': {
                        backgroundImage:
                            'linear-gradient(45deg, transparent 50%, hsla(0,0%,100%,.3) 50%), linear-gradient(-45deg, transparent 50%, hsla(0,0%,100%,.3) 50%)',
                        backgroundPosition: '0 100%',
                        left: '-.2em',
                    },

                    '&::before': {
                        backgroundImage:
                            'linear-gradient(135deg, transparent 50%, hsla(0,0%,100%,.3) 50%), linear-gradient(-135deg, transparent 50%, hsla(0,0%,100%,.3) 50%)',
                        backgroundPosition: '100% 100%',
                        right: '-.2em',
                    },
                }}
            >
                {heart ? (
                    <Box
                        id={`tapeStyle${check ? 'Check' : ''}${
                            onClick ? 'Hover' : ''
                        }`}
                        sx={{
                            margin: '3px 0',
                            visibility: check ? 'visible' : 'hidden',
                        }}
                    >
                        <GridBox>
                            <Hearts transparency={transparency} />
                        </GridBox>
                        <GridBox displace={24}>
                            <Hearts transparency={transparency} />
                        </GridBox>
                        <GridBox>
                            <Hearts transparency={transparency} />
                        </GridBox>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
}

export default Tape;
