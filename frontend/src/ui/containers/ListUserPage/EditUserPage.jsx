import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as PATH from "../../../constants/routeConstants";
import AddUserPageComponent from "../../components/ListUserPage/AddUserPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import _ from "lodash";
class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      changeValue: {},
      errors: [],
      errors_password: [],
      email_error: false,
      userName_error: false,
      successNotify: false,
      successNotify_password: false,
      afterChange_error: false
    };
  }

  componentWillMount() {
    this.getUserDetail(this.getUserId());
  }

  getUserId = () => {
    const id = this.props.match.params.id;
    this.setState({
      userId: id
    });
    return id;
  };

  getUserDetail = id => {
    api.apiGet(urlApi.getListUser + id).then(res => {
      if (res) {
        const data = _.omit(res.data, ["url"]);
        this.setState({
          data
        });
      }
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  changeDataValue = (key, value) => {
    let { data, changeValue } = this.state;
    data[key] = value;
    changeValue[key] = value;
    this.setState({
      data,
      changeValue
    });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  update = type => {
    const { userId, changeValue } = this.state;
    let { email_error, userName_error } = this.state;
    let { errors, errors_password } = this.state;
    this.setState({
      successNotify: false
    });
    this.setState({
      successNotify_password: false
    });
    this.setState({
      afterChange_error: false
    });
    errors = [];
    errors_password = [];
    email_error = false;
    userName_error = false;
    if (!type) {
      if (changeValue.username && changeValue.username.trim() == "") {
        errors.push("username");
      }
      if (changeValue.last_name && changeValue.last_name.trim() == "") {
        errors.push("last_name");
      }
      if (changeValue.email && changeValue.email.trim() == "") {
        errors.push("email");
      }
      if (changeValue.email && !this.validateEmail(changeValue.email)) {
        email_error = true;
      }

      if (
        changeValue.username &&
        (/\s/.test(changeValue.username) ||
          /^(\d|_)+\w+$/.test(changeValue.username))
      ) {
        userName_error = true;
      }
    } else {
      if (!changeValue.old_password || changeValue.old_password.trim() == "") {
        errors_password.push("password");
      }
      if (!changeValue.password || changeValue.password.trim() == "") {
        errors_password.push("old_password");
      }
    }
    if (errors.length > 0)
      this.setState({
        errors
      });
    if (errors_password.length > 0)
      this.setState({
        errors_password
      });
    this.setState({ email_error, userName_error });
    if (
      errors.length == 0 &&
      errors_password.length == 0 &&
      !email_error &&
      !userName_error
    ) {
      api.apiPatch(urlApi.getListUser + userId + "/", changeValue).then(res => {
        if (res) {
          if (!type) {
            this.setState({
              successNotify: true
            });
          } else {
            if (res.data.success) {
              this.setState({
                successNotify_password: true
              });
            } else {
              this.setState({
                afterChange_error: true
              });
            }
          }
        }
      });
    }
  };

  render() {
    const {
      data,
      errors,
      errors_password,
      email_error,
      userName_error,
      successNotify,
      successNotify_password,
      afterChange_error
    } = this.state;
    return (
      <div>
        <AddUserPageComponent
          changeDataValue={(key, value) => this.changeDataValue(key, value)}
          data={data}
          errors={errors}
          successNotify={successNotify}
          successNotify_password={successNotify_password}
          errors_password={errors_password}
          email_error={email_error}
          userName_error={userName_error}
          afterChange_error={afterChange_error}
          goBack={() => this.goBack()}
          createUser={this.update}
          type="edit"
        />
      </div>
    );
  }
}

export default EditUserPage;
