import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import CreateProjectComponent from "../../components/ProjectPage/CreateProject";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
class CreateProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supervisors: [],
      project: { ended_at: moment().format("YYYY-MM-DD") },
      errors: [],
      completeNotify: false,
      errNotify: false
    };
  }

  componentWillMount() {
    api.apiGet(urlApi.getSupervisors).then(res => {
      const supervisors = res.data;
      // project.admin = admins[0].id;
      // this.setState({project})
      this.setState({ supervisors });
    });
  }

  changeProjectDetailValue = (key, value) => {
    let { project } = this.state;
    project[key] = value;
    this.setState({ project });
  };

  createProject = event => {
    const data = this.state.project;
    let { errors } = this.state;
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
    if (!data.ended_at || data.ended_at.trim() == "") {
      errors.push("ended_at");
    }
    if (!data.supervisor || data.supervisor.trim() == "") {
      errors.push("supervisor");
    }
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    } else {
      data.ended_at = moment(data.ended_at).format("YYYY-MM-DD");
      api.apiPost(urlApi.createProject, data).then(
        res => {
          if (res) {
            this.props.onComplete(res, true);
          } else {
            this.props.onComplete(res, false);
          }
          this.props.toggle();
        }
        // this.setState({admins: res.data.filter(item => item.is_staff === true)})
      );
    }
  };

  render() {
    const { supervisors, project, errors } = this.state;
    // console.log(this.state)
    return (
      <CreateProjectComponent
        project={project}
        errors={errors}
        listSupervisor={supervisors}
        changeProjectDetailValue={(key, value) =>
          this.changeProjectDetailValue(key, value)
        }
        createProject={() => this.createProject()}
      />
    );
  }
}

export default withRouter(CreateProjectContainer);
