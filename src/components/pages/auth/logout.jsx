import React, { useState } from 'react';
import UsersService from "service/user-service";
import jwtWorker from 'utils/jwt-worker';
import utils from "utils";
import { CustomButton } from "components/shared";

export const Logout = (props) => {

    const [loading, setLoading] = useState();

    /**
     * logout submission
     */
    const logout = () => {
        setLoading(true);
        UsersService.logout(jwtWorker.getTokenFromStorage()).then(() => {
            Promise.resolve(jwtWorker.removeTokenFromStorage()).finally(() => {
                utils.redirectToLoginRoute();
            });
        });
    }

    return (
        <div className='mt-3'>
            <CustomButton
                type="submit"
                label={utils.labelTemplate(utils.labelIcon("bi bi-check-circle", "confirm"), loading, "Logging out...")}
                onClick={logout}
                className="my-2" />
            <CustomButton
                label={utils.labelIcon("bi bi-x-circle", "Cancel")}
                onClick={() => props.cancelCallback()}
                variant="outlined"
                color="error" />
        </div >
    );
}