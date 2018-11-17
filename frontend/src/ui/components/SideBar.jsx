import React from "react";
import * as PATH from "../../constants/routeConstants";
import { HashRouter as Router, Link } from "react-router-dom";
import cx from "classnames";
import ReactExport from "react-data-export";
const SideBar = props => {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <div className="user-panel">
          <div className="pull-left image">
            <img src="dist/img/avatar6.png" alt="user" className="img-circle" />
          </div>
          <div className="pull-left info">
            <p style={{ fontSize: "1.5em" }} className="color-white">
              Tea Time Team
            </p>
          </div>
        </div>
        <Router>
          <ul className="sidebar-menu" data-widget="tree">
            <li
              className={cx({
                active: window.location.hash.indexOf("project") != -1
              })}
            >
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
            <li
              className={cx({
                active: window.location.hash.indexOf("team") != -1
              })}
            >
              <Link to={PATH.TEAM_URL}>
                <i className="fa fa-users" /> NHÓM
              </Link>
            </li>
            <li
              className={cx({
                active: window.location.hash.indexOf("user") != -1
              })}
            >
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
