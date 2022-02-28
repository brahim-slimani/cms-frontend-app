import React from 'react';
import utils from "utils";

export const RootContainer = (props) => {
    return (
        <>
            <div className="root-content">
                <div className="wrapper d-flex align-items-stretch">
                    {props.children}
                </div>
            </div>
            {utils.NoMobileViewPortTemplate()}
        </>
    );
}