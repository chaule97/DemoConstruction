import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SubmitFormComponent from "../../components/SubmitForm/SubmitForm";
import * as api from "../../../api/api";
import * as PATH from "../../../constants/routeConstants";
import urlApi from "../../../constants/urlApi";
import moment from "moment";
import _ from "lodash";
class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      teams: [],
      teamable: [],
      submitValue: [],
      data: {},
      deleteSubmitId: {},
      errors: []
    };
  }

  componentWillMount() {
    this.getProjectDetail(this.getProjectId());
    this.getTeam();
  }

  getProjectDetail = id => {
    api.apiGet(urlApi.getListProject + id).then(res => {
      if (res) {
        let submits = res.data.submits.filter(submit => {
          return submit.date == moment().format("YYYY-MM-DD");
        });
        res.data.submits = submits;
        this.setState({ projects: res.data });
      }
    });
  };

  getTeam = () => {
    api.apiGet(urlApi.getListTeam).then(res => {
      if (res) {
        res.data = res.data.map(team => {
          team.submits = team.submits.filter(submit => {
            return submit.date == moment().format("YYYY-MM-DD");
          });
          return team;
        });
        this.setState({ teams: res.data }, () => {
          let submitValue = this.state.submitValue.concat([]);
          let teams = this.state.teams.concat([]);
          teams.forEach(team => {
            if (team.submits.length > 0) {
              let { projects, ...rest } = team.submits[0];
              delete team.projects;
              submitValue.push({ ...rest, teamDataDetail: team });
            }
          });
          let teamAfterFilter = teams.filter(
            item =>
              submitValue.findIndex(submit => +submit.team == item.id) == -1
          );

          this.setState({ submitValue, teams: teamAfterFilter });
        });
      }
    });
  };

  getProjectId = () => {
    const id = this.props.location.pathname.split("id=")[1];
    let { data } = this.state;
    data.projects = id;
    this.setState({ data });
    return id;
  };

  changeSelectedTeam = id => {
    const { submitValue, teams, deleteSubmitId } = this.state;

    const index = teams.findIndex(item => {
      return item.id == +id;
    });

    const teamDataDetail = teams[index];
    if (teamDataDetail.submits.length > 0)
      delete deleteSubmitId[teamDataDetail.submits[0].id];
    submitValue.push({
      team: id,
      teamDataDetail
    });

    let teamAfterFilter = teams.filter(item => item.id != id);
    this.setState({ submitValue, teams: teamAfterFilter, deleteSubmitId });
  };

  cancel = item => {
    let { submitValue, teams } = _.cloneDeep(this.state);
    teams.push(item.teamDataDetail);
    teams = _.sortBy(teams, ["id"]);
    let temp = submitValue.filter(it => {
      if (it.team != item.team) {
        return true;
      }
      if (it.id) {
        let { deleteSubmitId } = this.state;
        deleteSubmitId[it.id] = true;
        this.setState({ deleteSubmitId });
      }
      return false;
    });
    this.setState({ submitValue: temp, teams });
  };

  changeSubmitFormValue = (id, key, value) => {
    let { submitValue } = _.cloneDeep(this.state);
    submitValue.map(item => (item.team == id ? (item[key] = value) : null));
    this.setState({ submitValue });
  };

  submit = () => {
    const { submitValue, projects, deleteSubmitId } = this.state;
    let { errors } = this.state;
    errors = {};
    let errFlag = false;
    submitValue.map(item => {
      let data = {
        ...item,
        projects: projects.id,
        date: moment().format("YYYY-MM-DD")
      };

      let temp = {};
      if (!data.worker_number) {
        temp.worker_number = true;
      }
      if (!data.process) {
        temp.process = true;
      }
      if (!data.task_name || data.task_name.trim() == "") {
        temp.task_name = true;
      }
      if (!data.content || data.content.trim() == "") {
        temp.content = true;
      }
      if (!data.proposed_materials || data.proposed_materials.trim() == "") {
        temp.proposed_materials = true;
      }
      if (!data.job_tomorrow || data.job_tomorrow.trim() == "") {
        temp.job_tomorrow = true;
      }
      if (Object.keys(temp).length > 0) {
        errFlag = true;
        errors[+data.team] = temp;
        this.setState({ errors });
      }

      data = _.omit(data, ["teamDataDetail"]);
      let length = projects.submits.filter(
        submit => submit.date == data.date && submit.team.id == data.team
      ).length;
      if (!errFlag) {
        if (length == 0) {
          api.apiPost(urlApi.submitProcess, data);
        } else {
          api.apiPut(urlApi.submitProcess + item.id + "/", data);
        }
      }
    });
    if (Object.keys(deleteSubmitId).length > 0) {
      Object.keys(deleteSubmitId).forEach(key => {
        api.apiDelete(urlApi.submitProcess + key + "/");
      });
    }
    if (!errFlag) this.props.history.push(PATH.PROJECT_VIEW_URL);
  };

  render() {
    const { projects, teams, data, submitValue, errors } = this.state;
    // console.log(this.state)
    return (
      <SubmitFormComponent
        projects={projects}
        teams={teams}
        data={data}
        errors={errors}
        submitValue={submitValue}
        changeSelectedTeam={id => this.changeSelectedTeam(id)}
        changeSubmitFormValue={(id, key, value) =>
          this.changeSubmitFormValue(id, key, value)
        }
        submit={() => this.submit()}
        cancel={item => this.cancel(item)}
      />
    );
  }
}

export default withRouter(SubmitForm);
