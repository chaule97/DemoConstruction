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
      email_error: false,
      userName_error: false,
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
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  createUser = () => {
    const { data } = this.state;
    let { errors, email_error, userName_error } = this.state;
    errors = [];
    email_error = false;
    userName_error = false;
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
    if (data.email && !this.validateEmail(data.email)) {
      email_error = true;
    }
    if (
      data.username &&
      (/\s/.test(data.username) || /^(\d|_)+\w+$/.test(data.username))
    ) {
      userName_error = true;
    }
    this.setState({ errors, email_error, userName_error });
    if (errors.length > 0 || userName_error || email_error) {
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
    const {
      data,
      errors,
      createNotify,
      email_error,
      userName_error
    } = this.state;
    // console.log(data)
    return (
      <AddUserPageComponent
        changeDataValue={(key, value) => this.changeDataValue(key, value)}
        data={data}
        goBack={() => this.goBack()}
        errors={errors}
        email_error={email_error}
        userName_error={userName_error}
        createNotify={createNotify}
        createUser={this.createUser}
      />
    );
  }
}

export default withRouter(AddUserPage);
