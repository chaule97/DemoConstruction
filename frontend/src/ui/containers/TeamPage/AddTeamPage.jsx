import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AddTeamPageComponent from "../../components/TeamPage/AddTeamPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
class AddTeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      data: {
        project: {}
      },

      errors: []
    };
  }

  goBack = () => {
    this.props.history.push();
  };

  changeAddTeam = (key, value) => {
    let { data } = this.state;
    data[key] = value;
    this.setState({ data });
  };

  createTeam = () => {
    const { data } = this.state;
    let { errors } = this.state;
    errors = [];

    if (!data.name || data.name.trim() == "") {
      errors.push("name");
    }
    if (!data.note || data.note.trim() == "") {
      errors.push("note");
    }

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      api.apiPost(urlApi.createTeam, data).then(res => {
        if (res) {
          this.props.onComplete(res, true);
        } else {
          this.props.onComplete(res, false);
        }
        this.props.toggle();
      });
    }
  };

  render() {
    const { errors, data } = this.state;
    return (
      <AddTeamPageComponent
        errors={errors}
        data={data}
        goBack={() => this.goBack()}
        changeAddTeam={(key, value) => this.changeAddTeam(key, value)}
        createTeam={() => this.createTeam()}
      />
    );
  }
}

export default withRouter(AddTeamPage);
