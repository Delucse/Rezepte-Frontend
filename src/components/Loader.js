import React from 'react';

import RecipeLogo from './RecipeLogo';

import { Backdrop, Box } from '@mui/material';

import Icon from '@mdi/react';
import { mdiInformation } from '@mdi/js';

function Loader(props) {
    return (
        <Backdrop
            id="Loader"
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0,
                ...props.style,
            }}
            open={true}
        >
            <div>
                <RecipeLogo loader style={{ width: 'max(20vh, 20vw)' }} />
                {props.info ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 10,
                            left: 0,
                            display: 'flex',
                            padding: '0 10px',
                            color: (theme) => theme.palette.primary.light,
                        }}
                    >
                        <div>
                            <Icon path={mdiInformation} size={'18px'} />
                        </div>
                        <Box
                            sx={{
                                marginLeft: '5px',
                                fontSize: '15px',
                                lineHeight: '15px',
                            }}
                        >
                            {props.info}
                        </Box>
                    </Box>
                ) : null}
            </div>
        </Backdrop>
    );
}

export default Loader;
