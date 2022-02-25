import React from 'react';
import { LoginPage, CompanyPage, ContactPage  } from 'components/pages';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import jwtWorker from "utils/jwt-worker";
import { PrivateRoute } from 'components/navigation/private-route';

export const Routes = () => {
    return (
        <Router history={useHistory}>
            <Switch>
                <Route exact path={ROUTES_PATH.LOGIN} component={LoginPage}>
                        {jwtWorker.isAuthenticated() && <Redirect to={ROUTES_PATH.HOME} />}
                </Route>
                <PrivateRoute path={ROUTES_PATH.CONTACT} component={ContactPage} />
                <PrivateRoute path={ROUTES_PATH.COMPANY} component={CompanyPage} />
                <Route path="*">
                    <Redirect to={ROUTES_PATH.HOME} />
                </Route>
            </Switch>
        </Router>
    );
}

export const ROUTES_PATH = {
    LOGIN: "/login",
    CONTACT: "/contact",
    COMPANY: "/company",
    HOME: "/contact",
}