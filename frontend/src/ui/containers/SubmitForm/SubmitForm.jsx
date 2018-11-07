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
            submitValue: [],
            data: {}
        }
    }

    componentWillMount() {
        this.getProjectDetail(this.getProjectId());
        this.getTeam();
        console.log(this.state);
    }
    
    getProjectDetail = (id) => {
        api.apiGet(urlApi.getListProject + id).then(res => {
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
    getProjectId = () => {
       const id =  this.props.location.pathname.split("id=")[1];
       let {data} = this.state;
       data.projects = id;
       this.setState({data});
       return id;
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

    changeSelectedTeam = (id) => {
        const {submitValue, teams} = this.state;
        const teamDataDetail = teams.find(item => item.id == id);
        submitValue.push({
            team: id,
            teamDataDetail
        })
        let teamAfterFilter = teams.filter(item => item.id != id)
        this.setState({submitValue, teams: teamAfterFilter})
    }

    render() {
        const {projects, teams, data, submitValue} = this.state;
        let teamable = [];
        // teams.map(item => {
        //     if(item.project.id == data.projects) {
        //         teamable.push(item);
        //     }
        // });
        // console.log(this.state)
        return (
          <SubmitFormComponent
            projects = {projects} 
            teams = {teams}
            data = {data}
            submitValue = {submitValue}
            changeSelectedTeam = {( value) => this.changeSelectedTeam(value)}
            changeSubmitFormValue = {(key, value) => this.changeSubmitFormValue(key, value)}
            submit = {() => this.submit()}
          />
        );
    }
}

export default withRouter(SubmitForm);