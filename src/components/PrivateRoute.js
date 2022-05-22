import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate } from "react-router-dom";

function PrivateRoute(props){

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = user !== null

    return(
        isAuthenticated ? props.children : <Navigate to={'/anmeldung'} />    
    );
}

export default PrivateRoute;