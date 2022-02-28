import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const SiderItem = (props) => {

    const history = useHistory();
    const { icon, route, label } = props;

    const isActiveLink = (route) => {
        return `${history.location.pathname}` === route.split("?")[0];
    }

    return (
        <li className="child-item">
            <Link to={route} className={`nav-link ${isActiveLink(route) && "active-item"}`}>
                <span className={icon}></span> {label} &nbsp;
            </Link>
        </li>
    );
}