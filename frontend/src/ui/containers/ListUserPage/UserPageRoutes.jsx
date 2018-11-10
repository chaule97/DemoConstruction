import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import * as PATH from '../../../constants/routeConstants';
import ListUserPage from './ListUserPage';
import AddUserPage from './AddUserPage';
import EditUserPage from './EditUserPage';
class UserPageRoutes extends Component {
    render() {
        return (
            <Switch>
                    <Route path={PATH.USER_EDIT_URL}  component={EditUserPage} />
                    <Route path={PATH.USER_ADD_URL}  component={AddUserPage} />
                    <Route path={PATH.USER_URL}  component={ListUserPage} />
            </Switch>
        );
    }
}

export default UserPageRoutes;