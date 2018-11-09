import React from 'react';

const Header = props => {
    return (
        <header className="main-header bg-steelblue">
            <a href="#" className="logo color-white">
                {props.type === 'admin' ?
                    <span>
                        <span className="logo-mini"><b>Admin</b></span>
                        <span className="logo-lg"><b>Admin</b> Management</span>
                    </span>
                    :
                    <span className="logo-lg"><b>Giám sát</b></span>
                }
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown messages-menu">
                            <a className="dropdown-toggle cursor-pointer" data-toggle="dropdown"
                                onClick={() => props.logout()}
                            >
                                <span style={{ color: 'white' }} >Đăng xuất</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;