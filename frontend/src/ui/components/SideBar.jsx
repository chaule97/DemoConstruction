import React from "react";
import * as PATH from "../../constants/routeConstants";
import { HashRouter as Router, Link } from "react-router-dom";

const SideBar = props => {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img
              src="dist/img/user2-160x160.jpg"
              alt="user"
              className="img-circle"
            />
          </div>
          <div className="pull-left info">
            <p style={{ fontSize: '1.5em' }} className="color-white">Tea Time Team</p>
            <Link to="#" className="color-white">
              <i className="fa fa-circle text-success" /> Online
            </Link>
          </div>
        </div>
        <form action="#" method="get" className="sidebar-form">
          <div className="input-group">
            <input
              type="text"
              name="q"
              className="form-control"
              placeholder="Search..."
            />
            <span className="input-group-btn">
              <button
                type="submit"
                name="search"
                id="search-btn"
                className="btn btn-flat"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </div>
        </form>
        <Router>
          <ul className="sidebar-menu" data-widget="tree">
            <li>
              <Link to={PATH.PROJECT_VIEW_URL}>
                <i className="fab fa-codepen" /> &nbsp;&nbsp;DỰ ÁN
              </Link>
            </li>
            {/* <ul className="treeview-menu">
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
                            </ul> */}
            <li>
              <Link to={PATH.TEAM_URL}>
                <i className="fa fa-users" /> NHÓM
              </Link>
            </li>
            <li>
              <Link to={PATH.USER_URL}>
                <i className="fa fa-user" /> GIÁM SÁT
              </Link>
            </li>
          </ul>
        </Router>
      </section>
    </aside>
  );
};

export default SideBar;
