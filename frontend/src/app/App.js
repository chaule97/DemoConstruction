import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import * as PATH from '../constants/routeConstants';
import Header from '../ui/containers/Header';
import SideBar from '../ui/containers/SideBar';
import SubmitFormContainer from '../ui/containers/SubmitForm/SubmitForm';
import { withRouter } from "react-router";
import Loader from '../ui/components/Loader/Loader';

const ProjectContainer = React.lazy(() => import('../ui/containers/ProjectPage/ProjectPageRoutes'));
const TeamContainer = React.lazy(() => import('../ui/containers/TeamPage/TeamPageRoutes'));
const UserContainer = React.lazy(() => import('../ui/containers/ListUserPage/UserPageRoutes'));


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentWillMount() {
        this.getLoginStatus()
    }

    getLoginStatus = () => {
        const status = localStorage.getItem('login');
        // console.log(status)
        if (status) {
            const type = localStorage.getItem('type');
            this.setState({ type })
            return;
        } else {
            this.props.history.push(PATH.LOGIN_URL);
        }
    }

    renderForSupervisor() {
        return (
            <div>
                <Header />
                <div className="content-container">
                    <section className="content-header">
                        <Switch>
                            <Route path={PATH.PROJECT_SUBMIT_URL} render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_URL} render={() => <h1>Dự án</h1>} />
                        </Switch>
                    </section>
                    <Switch>
                        <Route path={PATH.PROJECT_SUBMIT_URL} component={SubmitFormContainer} />
                        <Route path={PATH.PROJECT_URL} component={ProjectContainer} />
                        <Route path={PATH.HOME_URL} render={() => <Redirect to={PATH.PROJECT_URL} />} />
                    </Switch>
                </div>
            </div>
        )
    }
    renderForAdmin() {
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
                            <Route path={PATH.TEAM_DETAIL_URL} render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.FORM_SUBMIT_URL} extact render={() =>
                                <h1 className="cursor-pointer link-back" onClick={() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_URL} extact render={() => <h1>Dự án</h1>} />
                            <Route path={PATH.PROJECT_DETAIL_URL} render={() => <h1>Chi tiết</h1>} />
                            <Route path={PATH.USER_URL} extact render={() => <h1>Giám sát</h1>} />
                            <Route path={PATH.TEAM_URL} extact render={() => <h1>Nhóm</h1>} />
                            <Route path={PATH.TEAM_DETAIL_URL} render={() => <h1>Chi tiết</h1>} />
                            <Route path={PATH.FORM_SUBMIT_URL} render={() => <h1>Báo cáo</h1>} />
                        </Switch>

                    </section>
                    { /**/}
                    <React.Suspense fallback={<Loader />}>
                        <Switch>
                            <Route path={PATH.PROJECT_URL} extact component={ProjectContainer} />
                            <Route path={PATH.USER_URL} extact component={UserContainer} />
                            <Route path={PATH.TEAM_URL} extact component={TeamContainer} />
                            <Route path={PATH.FORM_SUBMIT_URL} component={SubmitFormContainer} />
                            <Route path={PATH.HOME_URL} extact render={() => <Redirect to={PATH.PROJECT_URL} />} />
                        </Switch>
                    </React.Suspense>
                </div>
            </div>
        );
    }

    render() {
        const { type } = this.state;
        return (
            <div>
                {type === 'admin' ?
                    this.renderForAdmin()
                    :
                    this.renderForSupervisor()
                }
            </div>
        )
    }
}

export default withRouter(App);
