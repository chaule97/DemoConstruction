import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import * as PATH from '../../../constants/routeConstants';
import ProjectPageComponent from './View';
import DashboardComponent from '../../components/ProjectPage/Dashboard';
// import DetailContainer from '../../components/ProjectPage/Dashboard';
import CreateProjectContainer from './CreateProjectContainer';
class ProjectPage extends Component {
    render() {
        return (
            <Switch>
                    <Route path={PATH.PROJECT_DETAIL_URL}  component={DashboardComponent} />
                    <Route path={PATH.PROJECT_CREATE_URL}  component={CreateProjectContainer} />
                    {/* <Route path={PATH.PROJECT_DASHBOARD_URL}  component={DashboardComponent} /> */}
                    <Route path={PATH.PROJECT_VIEW_URL}  component={ProjectPageComponent} />
                    <Route path={PATH.PROJECT_URL} extact render={() => <Redirect to = {PATH.PROJECT_VIEW_URL} />} />
            </Switch>
        );
    }
}

export default ProjectPage;