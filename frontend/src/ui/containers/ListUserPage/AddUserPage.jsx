import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import AddUserPageComponent from '../../components/ListUserPage/AddUserPage';
class AddUserPage extends Component {

    constructor(props) {
        super(props)
      }

    goBack = () => {
        this.props.history.push('/user');
    }
    render() {
        return (
          <AddUserPageComponent goBack = {() => this.goBack()}/>
        );
    }
}

export default withRouter(AddUserPage);