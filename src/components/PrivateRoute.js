import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute(props) {
    const location = useLocation();

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = user !== null;

    return isAuthenticated ? (
        props.children
    ) : (
        <Navigate
            to={'/anmeldung'}
            state={{ background: location, auth: true }}
        />
    );
}

export default PrivateRoute;
