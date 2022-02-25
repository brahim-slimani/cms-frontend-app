import React from 'react';
import { useHistory } from 'react-router';

export const Header = () => {
    const history = useHistory();
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm" >
            <div class="container-fluid">

                <ul class="left-nav navbar-nav ml-auto nav">
                   {`${history.location.pathname.split("/")[1].toLocaleUpperCase()}`}
                </ul>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="nav navbar-nav ml-auto">
                    </ul>
                </div>
            </div>
        </nav>
    );
}