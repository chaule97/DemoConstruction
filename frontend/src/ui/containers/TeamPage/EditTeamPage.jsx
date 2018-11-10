import React, { Component } from 'react';
import * as api from '../../../api/api';
import * as PATH from '../../../constants/routeConstants';
import urlApi from '../../../constants/urlApi';
import AddTeamPageComponent from '../../components/TeamPage/AddTeamPage';
import _ from 'lodash';
class EditTeamPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        this.getTeamDetail(this.getTeamId())
    }
    
    getTeamId = () => {
        const id =  this.props.location.pathname.split("id=")[1];
        this.setState({teamId: id});
        return id;
    }

    getTeamDetail = (id) => {
        api.apiGet(urlApi.getListTeam + id).then(res => {
            if(res) {
                const data = _.omit(res.data, ['submits'])
                this.setState({data});
            }
        })
    }

    changeEditTeam = (key, value) => {
        let {data} = this.state;
        data[key] = value;
        this.setState({data})
    }

    updateTeam = () => {
        const {teamId, data} = this.state;
        api.apiPut(urlApi.getListTeam + teamId + '/', data).then(res => {
            if(res) {
                this.props.history.push(PATH.TEAM_URL);
            }
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <AddTeamPageComponent 
                     data = {data}
                     goBack = {() => this.goBack()}
                     changeAddTeam = {(key, value) => this.changeEditTeam(key, value)}
                     createTeam = {() => this.updateTeam()}
                     type = 'edit'
                />
            </div>
        );
    }
}

export default EditTeamPage;