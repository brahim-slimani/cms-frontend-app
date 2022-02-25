import React from 'react';
import logoLight from "assets/image/logo-light.svg";
import { ROUTES_PATH } from "components/navigation/routes";
import { SiderItem } from 'components/layout';

export const Sidebar = () => {
    const items = [
        {
            key: 0,
            route: ROUTES_PATH.CONTACT,
            icon: "bi bi-people-fill",
            label: "Contact"
        },
        {
            key: 1,
            route: ROUTES_PATH.COMPANY,
            icon: "bi bi-building",
            label: "Company"
        }
    ]
    return (
        <nav id="sidebar" className="active$">
            {/* HEADER */}
            <div className="mx-2 my-3">
                <a href="index">
                    <img src={logoLight} height="40" alt="img" className='mb-2' />
                </a>
                <br />
                <small className='text-center m-3'>Contact Management System</small>
            </div>
            {/* SIDER CONTENT */}
            <ul class="list-unstyled components mb-5 ">
                {items.map(item => <SiderItem {...item} />)}
            </ul>
        </nav>
    );
}