import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import AddTeamPageComponent from '../../components/TeamPage/AddTeamPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class AddTeamPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            data: {
                project: {}
            }
        }
    }

    componentWillMount() {
        this.getProject()
    }

    getProject = () => {
        api.apiGet(urlApi.getListProject).then(res =>
            this.setState({projects: res.data})
        )
    }

    goBack = () => {
        this.props.history.push();
    }

    changeAddTeam = (key, value) => {
        let {data} = this.state;
        data[key] = value;
        this.setState({data})
    }


    createTeam = () => {
        const {data} = this.state;
        api.apiPost(urlApi.createTeam, data).then(res =>
            {
                if(res.statusText = "Created") {
                    this.props.history.goBack();
                }
            }
        )
    }

    render() {
        const {projects, data} = this.state;
        return (
          <AddTeamPageComponent 
            data = {data}
            goBack = {() => this.goBack()}
            changeAddTeam = {(key, value) => this.changeAddTeam(key, value)}
            createTeam = {() => this.createTeam()}
          />
        );
    }
}

export default withRouter(AddTeamPage);