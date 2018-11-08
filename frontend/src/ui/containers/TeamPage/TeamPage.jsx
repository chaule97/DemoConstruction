import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TeamPageComponent from '../../components/TeamPage/TeamPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class TeamPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: []
    }
  }

  componentWillMount() {
    this.getTeam();
  }

  getTeam = () => {
    api.apiGet(urlApi.getListTeam)
      .then(res => {
        if (res) {
          this.setState({ teams: res.data })
        }
      })
  }

  addTeam = () => {
    this.props.history.push('/team/add');
  }

  delete = (id) => {
    api.apiDelete(urlApi.getListTeam + id + '/')
      .then(res => {
        if (res) {
          this.getTeam()
        }
      })
  }

  render() {
    const { teams } = this.state;
    return (
      <TeamPageComponent
        {...this.props}
        listTeams={teams}
        addTeam={() => this.addTeam()}
        delete = {(id) => this.delete(id)}
      />
    );
  }
}

export default withRouter(TeamPage);