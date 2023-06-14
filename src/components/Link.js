import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { styled } from '@mui/system';

const StyledLink = styled(RouterLink)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const Link = ({ children, to, target, alt, state, replace, style }) => {
    return (
        <StyledLink
            to={to}
            target={target}
            alt={alt}
            state={state}
            replace={replace}
            style={style}
        >
            {children}
        </StyledLink>
    );
};

export default Link;
