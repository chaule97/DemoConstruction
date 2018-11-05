import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import AddTeamPageComponent from '../../components/TeamPage/AddTeamPage';
class AddTeamPage extends Component {

    constructor(props) {
        super(props)
      }

    goBack = () => {
        console.log(this.props)
        this.props.history.push('/team');
    }
    render() {
        return (
          <AddTeamPageComponent goBack = {() => this.goBack()}/>
        );
    }
}

export default withRouter(AddTeamPage);