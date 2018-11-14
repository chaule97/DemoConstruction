import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AddUserPageComponent from "../../components/ListUserPage/AddUserPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
class AddUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: [],
      createNotify: false
    };
  }
  goBack = () => {
    this.props.history.goBack();
  };

  changeDataValue = (key, value) => {
    let { data } = this.state;
    data[key] = value;
    this.setState({ data });
  };

  createUser = () => {
    const { data } = this.state;
    let { errors } = this.state;
    errors = [];
    this.setState({ createNotify: false });
    if (!data.username || data.username.trim() == "") {
      errors.push("username");
    }
    if (!data.last_name || data.last_name.trim() == "") {
      errors.push("last_name");
    }
    if (!data.email || data.email.trim() == "") {
      errors.push("email");
    }
    if (!data.password || data.password.trim() == "") {
      errors.push("password");
    }

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      api.apiPost(urlApi.createUser, data).then(res => {
        console.log(res);
        if (res.data.id) {
          this.setState({ createNotify: true });
        }
      });
    }
  };

  render() {
    const { data, errors, createNotify } = this.state;
    // console.log(data)
    return (
      <AddUserPageComponent
        changeDataValue={(key, value) => this.changeDataValue(key, value)}
        data={data}
        goBack={() => this.goBack()}
        errors={errors}
        createNotify={createNotify}
        createUser={this.createUser}
      />
    );
  }
}

export default withRouter(AddUserPage);
