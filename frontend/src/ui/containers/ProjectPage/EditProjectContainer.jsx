import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import EditProjectComponent from "../../components/ProjectPage/EditProject";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
class EditProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      project: {}
    };
  }

  changeProjectDetailValue = (key, value) => {
    let { project } = this.state;
    project[key] = value;
    this.setState({ project });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ project: nextProps.project });
  }

  editProject = event => {
    const data = this.state.project;
    let { errors } = this.state;
    let projectId = this.props.match.params.id;
    errors = [];

    if (!data.address || data.address.trim() == "") {
      errors.push("address");
    }
    if (!data.position || data.position.trim() == "") {
      errors.push("position");
    }
    if (!data.construction_name || data.construction_name.trim() == "") {
      errors.push("construction_name");
    }
    if (!data.investor || data.investor.trim() == "") {
      errors.push("investor");
    }
    if (!data.name || data.name.trim() == "") {
      errors.push("name");
    }
    if (!data.position || data.position.trim() == "") {
      errors.push("ended_at");
    }
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      data.ended_at = moment(data.ended_at).format("YYYY-MM-DD");
      data.supervisor = data.supervisor.id;
      api.apiPut(urlApi.createProject + projectId + "/", data).then(
        res => {
          if (res) {
            console.log(res);
          }
        }
        // this.setState({admins: res.data.filter(item => item.is_staff === true)})
      );
    }
  };

  render() {
    const { errors, project } = this.state;

    // console.log(this.state)

    if (!project.supervisor) return null;
    return (
      <EditProjectComponent
        project={project}
        errors={errors}
        supervisor={project.supervisor}
        changeProjectDetailValue={(key, value) =>
          this.changeProjectDetailValue(key, value)
        }
        editProject={() => this.editProject()}
      />
    );
  }
}

export default withRouter(EditProjectContainer);
