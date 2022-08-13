import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute(props) {
    const location = useLocation();

    const loading = useSelector(
        (state) => state.progress.loading && state.progress.type === 'user'
    );

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = user !== null;

    return !loading ? (
        isAuthenticated ? (
            props.children
        ) : (
            <Navigate
                to={'/anmeldung'}
                state={{ background: location, auth: true }}
            />
        )
    ) : null;
}

export default PrivateRoute;
