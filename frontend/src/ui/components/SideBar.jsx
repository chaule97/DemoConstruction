import React from 'react';
import * as PATH from "../../constants/routeConstants";
import{HashRouter as Router ,Link} from 'react-router-dom';

const  SideBar = props => {
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    </div>
                    <div className="pull-left info">
                        <p className="color-white">Tea Time Team</p>
                        <a href="#" className="color-white"><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>
                <form action="#" method="get" className="sidebar-form">
                    <div className="input-group">
                    <input type="text" name="q" className="form-control" placeholder="Search..."/>
                    <span className="input-group-btn">
                            <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
                <Router>
                    <ul className="sidebar-menu color-white" data-widget="tree">
                        <li>
                            <Link to = {PATH.PROJECT_URL}>
                               <i className="fa fa-codepen"></i> PROJECT
                            </Link>
                        </li>
                        <li>
                            <Link to = {PATH.TEAM_URL}>
                            <i className="fa fa-user"></i> TEAM
                            </Link>
                        </li>
                        <li>
                            <Link to = {PATH.USERS_URL}>
                            <i className="fa fa-book"></i> SUPERVISOR
                            </Link>
                        </li>
                    </ul>
                </Router>
            </section>
        </aside>
    );
}

export default SideBar;