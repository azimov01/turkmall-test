import React from 'react';
import {NavLink} from 'react-router-dom';
import {ADD_BRANDS, ADMIN_PRODUCTS, ADMIN_USERS} from 'constants/routes';

const SideNavigation = () => {
    return (
        <aside className="sidenavigation">
            <div className="sidenavigation-wrapper">
                <div className="sidenavigation-item">
                    <NavLink
                        activeClassName="sidenavigation-menu-active"
                        className="sidenavigation-menu"
                        to={ADMIN_PRODUCTS}
                    >
                        Products
                    </NavLink>
                </div>
                <div className="sidenavigation-item">
                    <NavLink
                        className="sidenavigation-menu"
                        to={ADMIN_USERS}
                    >
                        Users
                    </NavLink>
                </div>
                <div className="sidenavigation-item">
                    <NavLink
                        className="sidenavigation-menu"
                        to={ADD_BRANDS}
                    >
                        Add Brands
                    </NavLink>
                </div>
            </div>
        </aside>
    );
};

export default SideNavigation;
