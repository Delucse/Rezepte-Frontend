import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

function PrivateRoute(props) {
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
                state={{ background: props.location, auth: true }}
                replace
            />
        )
    ) : null;
}

export default PrivateRoute;
