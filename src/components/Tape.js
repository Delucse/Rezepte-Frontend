import React from "react";

import { Box } from '@mui/material';

// https://codepen.io/hunab/pen/DoNVPa

function Tape({rotate}){
    rotate = rotate ? rotate : 0;

    return(
        <Box sx={{
                paddingBottom: 'calc(3em / 2)', 
                paddingTop: `${Math.abs(rotate)}px`,
                justifyContent: 'center', 
                display: 'flex'
            }}
        >
        <Box sx={{
                backgroundColor: 'hsla(0,0%,100%,.2)',
                boxShadow: 'inset 0 0 1em .5em hsla(0,0%,100%,.1)',
                height: '3em',
                position: 'absolute',
                transform: `rotate(${rotate}deg)`,
                width: '9em',
                filter: 'drop-shadow(0 1px 1px hsla(0,0%,0%,.3))',
                zIndex: 1,

                '&::after, &::before': {
                    backgroundSize: '.4em .4em',
                    bottom: 0,
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    width: '.2em',
                },

                '&::after': {
                    backgroundImage: 'linear-gradient(45deg, transparent 50%, hsla(0,0%,100%,.3) 50%), linear-gradient(-45deg, transparent 50%, hsla(0,0%,100%,.3) 50%)',
                    backgroundPosition: '0 100%',
                    left: '-.2em'
                },

                '&::before': {
                    backgroundImage: 'linear-gradient(135deg, transparent 50%, hsla(0,0%,100%,.3) 50%), linear-gradient(-135deg, transparent 50%, hsla(0,0%,100%,.3) 50%)',
                    backgroundPosition: '100% 100%',
                    right: '-.2em'
                },
            }}
        />
        </Box>
    );
}

export default Tape;