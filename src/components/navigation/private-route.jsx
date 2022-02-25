
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import jwtWorker from 'utils/jwt-worker';

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={props => jwtWorker.isAuthenticated() ?
            <div className='container'>
                <Component {...props} />
            </div>
            : <Redirect to={{ pathname: "/login" }} />
        } />
    );
}