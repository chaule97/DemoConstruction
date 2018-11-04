import React from 'react';

const  SideBar = props => {
    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <div className="user-panel">
                    <div className="pull-left image">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
                    </div>
                    <div className="pull-left info">
                    <p>Tea Time Team</p>
                        <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
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
                <ul className="sidebar-menu" data-widget="tree">
                    <li className="header">MAIN NAVIGATION</li>
                    <li className="treeview">
                        <a href="#">
                            <span>PROJECT</span>
                            <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"></i>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li className="active"><a ><i className="fa fa-circle-o"></i> Project 1</a></li>
                            <li><a ><i className="fa fa-circle-o"></i> Project 2</a></li>
                        </ul>
                    </li>
                    <li className="treeview">
                        <a href="#">
                            <span>TEAM</span>
                            <span className="pull-right-container">
                            <span className="label label-primary pull-right">4</span>
                            </span>
                        </a>
                        <ul className="treeview-menu">
                            <li><a ><i className="fa fa-circle-o"></i> Team 1</a></li>
                            <li><a ><i className="fa fa-circle-o"></i> Team 2</a></li>
                            <li><a ><i className="fa fa-circle-o"></i> Team 3</a></li>
                            <li><a ><i className="fa fa-circle-o"></i> Team 4</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <span>USER</span>
                            <span className="pull-right-container">
                            <small className="label pull-right bg-green">new</small>
                            </span>
                        </a>
                    </li>
                </ul>
            </section>
        </aside>
    );
}

export default SideBar;