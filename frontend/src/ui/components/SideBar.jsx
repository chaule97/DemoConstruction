import React from 'react';
import * as PATH from "../../constants/routeConstants";
import { HashRouter as Router, Link} from 'react-router-dom';

const  SideBar = props => {
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle"/>
                    </div>
                    <div className="pull-left info">
                    <p className = "color-white">Tea Time Team</p>
                        <a className = "color-white" ><i className="fa fa-circle text-success"></i> Online</a>
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
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className = "treeview">
                            <a >
                                <i className="fa fa-codepen"></i> PROJECT
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li>
                                <Link to = {PATH.PROJECT_VIEW_URL}>
                                   <i className="fa fa-circle-o"></i> View
                                </Link>
                                </li>
                                <li>
                                <Link to = {PATH.PROJECT_DASHBOARD_URL}>
                                <i className="fa fa-circle-o"></i> Dashboard
                                </Link>
                                </li>
                                <li>
                                <Link to = {PATH.PROJECT_DETAIL_URL}>
                                <i className="fa fa-circle-o"></i> Detail
                                </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to = {PATH.TEAM_URL}>
                            <i className="fa fa-users"></i> TEAM
                            </Link>
                        </li>
                        <li>
                            <Link to = {PATH.USER_URL}>
                            <i className="fa fa-user"></i> SUPERVISOR
                            </Link>
                        </li>
                        <li>
                            <Link to = {PATH.FORM_SUBMIT_URL}>
                            <i className="fa fa-edit"></i> SUBMIT FORM
                            </Link>
                        </li>
                    </ul>
                </Router>
            </section>
        </aside>
    );
}

export default SideBar;