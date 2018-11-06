import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SubmitFormComponent from '../../components/SubmitForm/SubmitForm';
import * as api from '../../../api/api';
import * as PATH from '../../../constants/routeConstants';
import urlApi from '../../../constants/urlApi';
import moment from 'moment';
class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            teams: [],
            teamable: [],
            data: {
                date: moment().format('YYYY-MM-DD'),
                job_tomorrow: 'test'
            },
        }
    }

    componentWillMount() {
        this.getProject();
        this.getTeam();
    }
    
    getProject = () => {
        api.apiGet(urlApi.getListProject).then(res => {
            if(res) {
                this.setState({projects: res.data})
            }
        })
    }

    getTeam = () => {
        api.apiGet(urlApi.getListTeam).then(res => {
            if(res) {
                this.setState({teams: res.data})
            }
        })
    }

    changeSubmitFormValue = (key, value) => {
        const {data} = this.state;
        data[key] = value;
        this.setState({data});
    }

    submit = () => {
        const {data} = this.state;
        api.apiPost(urlApi.submitProcess, data).then(res =>
            {
                if(res) {
                    // console.log(res)
                    this.props.history.push(PATH.PROJECT_VIEW_URL);
                }
            }
            // this.setState({admins: res.data.filter(item => item.is_staff === true)})
        )
    }

    render() {
        const {projects, teams, data} = this.state;
        let teamable = [];
        teams.map(item => {
            if(item.project.id == data.projects) {
                teamable.push(item);
            }
        });
        // console.log(data)
        return (
          <SubmitFormComponent
            projects = {projects} 
            teams = {teamable}
            data = {data}
            changeSubmitFormValue = {(key, value) => this.changeSubmitFormValue(key, value)}
            submit = {() => this.submit()}
          />
        );
    }
}

export default withRouter(SubmitForm);