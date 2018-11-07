import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import './App.css';
import * as PATH from '../constants/routeConstants';
import Header from '../ui/containers/Header';
import SideBar from '../ui/containers/SideBar';
import ProjectContainer from '../ui/containers/ProjectPage/ProjectPageRoutes';
import TeamContainer from '../ui/containers/TeamPage/TeamPageRoutes';
import UserContainer from '../ui/containers/ListUserPage/UserPageRoutes';
import SubmitFormContainer from '../ui/containers/SubmitForm/SubmitForm';



class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <SideBar />
                <div className="content-wrapper">
                    <section className="content-header">

                        <Switch>
                            <Route path={PATH.TEAM_ADD_URL} extact render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.USER_ADD_URL} extact render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_CREATE_URL} extact render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_DETAIL_URL} extact render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_URL} extact render={() => <h1>Dự án</h1>} />
                            <Route path={PATH.PROJECT_DETAIL_URL } render={() => <h1>Chi tiết</h1>} />
                            <Route path={PATH.USER_URL} extact render={() => <h1>Giám sát</h1>} />
                            <Route path={PATH.TEAM_URL} extact render={() => <h1>Đội</h1>} />
                            <Route path={PATH.FORM_SUBMIT_URL} extact render={() => <h1>Báo cáo</h1>} />
                        </Switch>

                    </section>
                    { /**/}
                    <Switch>
                        <Route path={PATH.PROJECT_URL} extact component={ProjectContainer} />
                        <Route path={PATH.USER_URL} extact component={UserContainer} />
                        <Route path={PATH.TEAM_URL} extact component={TeamContainer} />
                        <Route path={PATH.FORM_SUBMIT_URL} extact component={SubmitFormContainer} />
                        <Route path={PATH.HOME_URL} extact render={() => <Redirect to={PATH.PROJECT_URL} />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
