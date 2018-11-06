import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import UserPageComponent from '../../components/ListUserPage/ListUserPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class ListUserPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    api.apiGet(urlApi.getListUser)
    // .then(res =>
    //   console.log(res))
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