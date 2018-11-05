import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import UserPageComponent from '../../components/ListUserPage/ListUserPage';

class ListUserPage extends Component {

  constructor(props) {
    super(props)
  }

  addUser = () => {
    this.props.history.push('/user/add');
  }
    render() {
        return (
          <UserPageComponent {...this.props} addUser = {() => this.addUser()}/>
        );
    }
}

export default withRouter(ListUserPage);