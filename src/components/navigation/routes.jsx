import React from 'react';
import { LoginPage } from 'components/pages';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import jwtWorker from "utils/jwt-worker";
import { PrivateRoute } from 'components/navigation/private-route';

export const Routes = () => {
    return (
        <Router history={useHistory}>
            <Switch>
                <Route exact path={"/login"} component={LoginPage}>
                    {jwtWorker.isAuthenticated() && <Redirect to="/home" />}
                </Route>
                <PrivateRoute path="/home" component={() => "Salam from home page"} />
                <Route path="*">
                    <Redirect to={"/home"} />
                </Route>
            </Switch>
        </Router>
    );
}