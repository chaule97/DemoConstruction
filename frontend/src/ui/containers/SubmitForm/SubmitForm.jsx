import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SubmitFormComponent from '../../components/SubmitForm/SubmitForm';
import * as api from '../../../api/api';
import * as PATH from '../../../constants/routeConstants';
import urlApi from '../../../constants/urlApi';
import moment from 'moment';
import _ from 'lodash';
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

    getProjectId = () => {
       const id =  this.props.location.pathname.split("id=")[1];
       let {data} = this.state;
       data.projects = id;
       this.setState({data});
       return id;
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

    cancel = (item) => {
        let {submitValue, teams} = _.cloneDeep(this.state);
        teams.push(item.teamDataDetail);
        teams = _.sortBy(teams, ['id']);
        let temp =  submitValue.filter(it => it.team != item.team );
        this.setState({submitValue: temp, teams});
    }

    changeSubmitFormValue = (id, key, value) => {
        let {submitValue} = _.cloneDeep(this.state);
        submitValue.map(item => item.team == id ? item[key] = value : null)
        this.setState({submitValue});
    }
    
    submit = () => {
        const {submitValue} = this.state;
        const projects = this.getProjectId();
    
        submitValue.map(item => {
            let data = {...item, projects, date: moment().format('YYYY-MM-DD')}
            data = _.omit(data, ['teamDataDetail'])
            api.apiPost(urlApi.submitProcess, data)
        })
        this.props.history.push(PATH.PROJECT_VIEW_URL);
    }

    render() {
        const {projects, teams, data, submitValue} = this.state;
        // console.log(this.state)
        return (
          <SubmitFormComponent
            projects = {projects} 
            teams = {teams}
            data = {data}
            submitValue = {submitValue}
            changeSelectedTeam = {(id) => this.changeSelectedTeam(id)}
            changeSubmitFormValue = {(id, key, value) => this.changeSubmitFormValue(id, key, value)}
            submit = {() => this.submit()}
            cancel = {item => this.cancel(item)}
          />
        );
    }
}

export default withRouter(SubmitForm);