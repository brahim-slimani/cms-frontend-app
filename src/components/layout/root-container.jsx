import React from 'react';

export const RootContainer = (props) => {
    return (
        <div className="root-content">
            <div className="wrapper d-flex align-items-stretch">
                {props.children}
            </div>
        </div>
    );
}