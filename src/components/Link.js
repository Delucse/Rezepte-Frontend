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

const Link = ({ children, to, target, alt }) => {
    return (
        <StyledLink to={to} target={target} alt={alt}>
            {children}
        </StyledLink>
    );
};

export default Link;
