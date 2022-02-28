import React from 'react';
import { LoginPage, CompanyPage, ContactPage, Dashboard } from 'components/pages';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import jwtWorker from "utils/jwt-worker";
import { PrivateRoute } from 'components/navigation/private-route';

export const Routes = () => {
    return (
        <Router basename={process.env.PUBLIC_URL} history={useHistory}>
            <Switch>
                <Route exact path={ROUTES_PATH.LOGIN} component={LoginPage}>
                    {jwtWorker.isAuthenticated() && <Redirect to={ROUTES_PATH.HOME} />}
                </Route>
                <PrivateRoute path={ROUTES_PATH.HOME} component={Dashboard} />
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
    HOME: "/dashboard",
    CONTACT: "/contact",
    COMPANY: "/company",
}