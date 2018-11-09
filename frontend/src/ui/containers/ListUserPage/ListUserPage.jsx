import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import UserPageComponent from '../../components/ListUserPage/ListUserPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class ListUserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    api.apiGet(urlApi.getListUser)
    .then(res =>
      this.setState({users: res.data})
      )
    }

  addUser = () => {
    this.props.history.push('/user/add');
  }
  editUser = (id) => {
    this.props.history.push('/user/edit/id=' + id);
  }
    render() {
      const {users} = this.state;
        return (
          <UserPageComponent 
            {...this.props} 
            listUsers = {users} 
            addUser = {() => this.addUser()}
            editUser = {(item) => this.editUser(item)}
          />
        );
    }
}

export default withRouter(ListUserPage);