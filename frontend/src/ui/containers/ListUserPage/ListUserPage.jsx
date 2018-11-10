import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserPageComponent from "../../components/ListUserPage/ListUserPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
class ListUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supervisors: []
    };
  }

  componentWillMount() {
    api
      .apiGet(urlApi.getSupervisors)
      .then(res => this.setState({ supervisors: res.data }));
  }

  addUser = () => {
    this.props.history.push("/user/add");
  };
  editUser = item => {
    this.props.history.push("/user/add");
  };
  render() {
    const { supervisors } = this.state;
    return (
      <UserPageComponent
        {...this.props}
        listUsers={supervisors}
        addUser={() => this.addUser()}
        editUser={item => this.editUser(item)}
      />
    );
  }
}

export default withRouter(ListUserPage);
