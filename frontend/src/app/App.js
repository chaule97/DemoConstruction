import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import * as PATH from '../constants/routeConstants';
import Header from '../ui/containers/Header';
import SideBar from '../ui/containers/SideBar';
import ProjectComponent from '../ui/containers/ProjectPage/ProjectPage';
import TeamComponent from '../ui/containers/TeamPage/TeamPage';
import UsersComponent from '../ui/containers/ListUserPage/ListUserPage';



class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <SideBar/>
            <div className="content-wrapper">
                <section className="content-header">
                    
                        <Switch>
                            <Route path={PATH.PROJECT_URL} extact render={ () => <h1>Project</h1>} />
                            <Route path={PATH.USERS_URL} extact render={ () => <h1>Users</h1>} />
                            <Route path={PATH.TEAM_URL} extact render={ () => <h1>Team</h1>} />
                        </Switch>
                    
                </section>
                { /**/}
                <Switch>
                    <Route path={PATH.PROJECT_URL} extact component={ProjectComponent} />
                    <Route path={PATH.USERS_URL} extact component={UsersComponent} />
                    <Route path={PATH.TEAM_URL} extact component={TeamComponent} />
                    <Route path={PATH.HOME_URL} extact render={() => <Redirect to={PATH.PROJECT_URL}/>} />
                </Switch>
            </div>
        </div>
    );
  }
}

export default App;
