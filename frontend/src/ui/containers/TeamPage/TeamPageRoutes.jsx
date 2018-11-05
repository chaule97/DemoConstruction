import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as PATH from '../../../constants/routeConstants';
import TeamPage from './TeamPage';
import AddTeamPage from './AddTeamPage';
class TeamPageRoutes extends Component {
    render() {
        return (
            <Switch>
                    <Route path={PATH.TEAM_ADD_URL}  component={AddTeamPage} />
                    <Route path={PATH.TEAM_URL}  component={TeamPage} />
            </Switch>
        );
    }
}

export default TeamPageRoutes;