import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as PATH from '../../../constants/routeConstants';
import TeamDetailComponent from '../../components/TeamPage/TeamDetail';
import ViewDetailProcessModal from '../../components/ProjectPage/ViewDetailProcessModal';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';

class TeamDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            dataOfModal: {},
            projects: [],
        }
    }

    componentWillMount() {
        this.setState({ type: localStorage.getItem('type') })
        api.apiGet(urlApi.getListProject)
            .then(res =>
                this.setState({ projects: res.data })
            )
    }

    openModal = (event) => {
        this.setState({ openModal: true, dataOfModal: event })
    }

    closeModal = () => {
        this.setState({ openModal: false })
    }

    render() {
        const { openModal, dataOfModal, projects, type } = this.state;

        return (
            <span>
                <TeamDetailComponent
                    type={type}
                    listProjects={projects}
                    openModal={event => this.openModal(event)}
                    createProject={() => this.createProject()}
                />
                <ViewDetailProcessModal
                    openModal={openModal}
                    data={dataOfModal}
                    close={this.closeModal}
                />
            </span>
        );
    }
}

export default withRouter(TeamDetail);