import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
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
    api.apiGet(urlApi.getListTeam)
    .then(res =>
      this.setState({teams: res.data})
      )
    }

  addTeam = () => {
    this.props.history.push('/team/add');
  }
    render() {
      const {teams} = this.state;
        return (
          <TeamPageComponent 
          {...this.props}
          listTeams = {teams}
          addTeam = {() => this.addTeam()}
          />
        );
    }
}

export default withRouter(TeamPage);