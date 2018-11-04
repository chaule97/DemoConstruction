import React from 'react';

const Header = props => {
    return (
        <header className="main-header bg-steelblue">
            <a href="#" className="logo color-white">
                <span className="logo-mini"><b>Admin</b></span>
                <span className="logo-lg"><b>Admin</b> Management</span>
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
            </nav>
        </header>
    );
}

export default Header;