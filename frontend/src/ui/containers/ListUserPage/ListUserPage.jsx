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

  componentDidMount() {
    this.getSupervisors();
  }

  getSupervisors() {
    api
      .apiGet(urlApi.getSupervisors)
      .then(res => this.setState({ supervisors: res.data }));
  }

  addUser = () => {
    this.props.history.push("/user/add");
  };
  deleteUser = id => {
    api.apiDelete(urlApi.getListUser + id + "/").then(res => {
      console.log(res);
      this.getSupervisors();
    });
  };
  render() {
    const { supervisors } = this.state;
    return (
      <UserPageComponent
        {...this.props}
        listUsers={supervisors}
        addUser={() => this.addUser()}
        deleteUser={this.deleteUser}
      />
    );
  }
}

export default withRouter(ListUserPage);
