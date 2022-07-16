import React from 'react';

import RecipeLogo from './RecipeLogo';

import Backdrop from '@mui/material/Backdrop';

function Loader(props) {
    return (
        <Backdrop
            sx={{
                backgroundColor: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: props.top ? `${props.top}px` : 0,
            }}
            open={true}
        >
            <RecipeLogo loader style={{ width: 'max(20vh, 20vw)' }} />
        </Backdrop>
    );
}

export default Loader;
