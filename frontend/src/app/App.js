import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import './App.css';
import * as PATH from '../constants/routeConstants';
import Header from '../ui/containers/Header';
import SideBar from '../ui/containers/SideBar';
import ProjectContainer from '../ui/containers/ProjectPage/ProjectPage';
import TeamContainer from '../ui/containers/TeamPage/TeamPageRoutes';
import UsersContainer from '../ui/containers/ListUserPage/ListUserPage';
import SubmitFormContainer from '../ui/containers/SubmitForm/SubmitForm';



class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <SideBar/>
            <div className="content-wrapper">
                <section className="content-header">
                    
                        <Switch>
                            <Route path={PATH.TEAM_ADD_URL} extact render={ () => 
                                <h1 className = "cursor-pointer link-back" onClick = {() => this.props.history.goBack()}> <i className="fa fa-angle-double-left"></i> Back</h1>
                            } />
                            <Route path={PATH.PROJECT_URL} extact render={ () => <h1>Project</h1>} />
                            <Route path={PATH.USERS_URL} extact render={ () => <h1>Users</h1>} />
                            <Route path={PATH.TEAM_URL} extact render={ () => <h1>Team</h1>} />
                        </Switch>
                    
                </section>
                { /**/}
                <Switch>
                    <Route path={PATH.PROJECT_URL} extact component={ProjectContainer} />
                    <Route path={PATH.USERS_URL} extact component={UsersContainer} />
                    <Route path={PATH.TEAM_URL} extact component={TeamContainer} />
                    <Route path={PATH.FORM_SUBMIT_URL} extact component={SubmitFormContainer} />
                    <Route path={PATH.HOME_URL} extact render={() => <Redirect to={PATH.PROJECT_URL}/>} />
                </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
