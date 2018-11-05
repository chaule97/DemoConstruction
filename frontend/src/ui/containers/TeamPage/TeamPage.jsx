import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import TeamPageComponent from '../../components/TeamPage/TeamPage';

class TeamPage extends Component {

  constructor(props) {
    super(props)
  }

  addTeam = () => {
    this.props.history.push('/team/add');
  }
    render() {
        return (
          <TeamPageComponent {...this.props} addTeam = {() => this.addTeam()}/>
        );
    }
}

export default withRouter(TeamPage);