import React from 'react';
import logoLight from "assets/svg/logo.svg";
import { ROUTES_PATH } from "components/navigation/routes";
import { SiderItem } from 'components/layout';
import { Avatar } from '@mui/material';
import jwtWorker from 'utils/jwt-worker';

export const Sidebar = () => {
    const items = [
        {
            key: 0,
            route: ROUTES_PATH.HOME,
            icon: "bi bi-speedometer2",
            label: "Dashboard"
        },
        {
            key: 1,
            route: ROUTES_PATH.CONTACT,
            icon: "bi bi-people-fill",
            label: "Contact"
        },
        {
            key: 2,
            route: ROUTES_PATH.COMPANY,
            icon: "bi bi-building",
            label: "Company"
        },

    ]

    return (
        <nav id="sidebar">
            {/* HEADER */}
            <div className="px-2 pt-2 sidebar-header">
                <a href="index">
                    <img id="sider-logo" src={logoLight} height="33" alt="img" className='mb-2' />
                </a>
            </div>
            <div className='my-2 px-3 d-flex' >
                <Avatar id="profile-avatar" icon={<i className='bi bi-person-fill' />} className="my-auto" />
                <div id="profile-detail" className='ms-2'>
                    <span>{`${jwtWorker.getRolesFromToken()[0]} ${jwtWorker.getSubFromToken()}`}</span><br />
                    <small>My Profile</small>
                </div>
            </div>
            {/* SIDER CONTENT */}
            <div id="sider-head" className='text-center my-3'>
                <small>Contact Management System</small>
            </div>
            <ul class="list-unstyled components mb-5 ">
                {items.map(item => <SiderItem {...item} />)}
            </ul>
        </nav>
    );
}