
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import jwtWorker from 'utils/jwt-worker';
import { MasterPage } from 'components/pages';
import { ROUTES_PATH } from 'components/navigation/routes';

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={props => jwtWorker.isAuthenticated() ?
            <MasterPage>
                <Component {...props} />
            </MasterPage>
            : <Redirect to={{ pathname: ROUTES_PATH.LOGIN }} />
        } />
    );
}