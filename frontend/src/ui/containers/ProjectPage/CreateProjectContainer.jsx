import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import CreateProjectComponent from '../../components/ProjectPage/CreateProject';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class CreateProjectContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            project: {
                team: [1],
                supervisor: localStorage.getItem('id')
            },
        }
    }

    componentWillMount() {
        api.apiGet(urlApi.getListUser).then(res =>
            {
                const admins = res.data.filter(item => item.is_staff === true)
                // project.admin = admins[0].id;
                // this.setState({project})
                this.setState({admins});
        })
    }

    changeProjectDetailValue = (key, value) => {
        let {project} = this.state;
        project[key] = value;
        this.setState({project})
    }

    createProject = () => {
        const data = this.state.project;
        api.apiPost(urlApi.createProject, data).then(res =>
            {
                if(res) {
                    this.props.history.goBack()
                }
            }
            // this.setState({admins: res.data.filter(item => item.is_staff === true)})
        )
    }

    render() {
        const {admins, project} = this.state;
        // console.log(this.state)
        return (
            <CreateProjectComponent 
            project = {project} 
            listAdmin = {admins} 
            changeProjectDetailValue = {(key, value) => this.changeProjectDetailValue(key, value)}
            createProject = {() => this.createProject()}
            />
        );
    }
}

export default withRouter(CreateProjectContainer);