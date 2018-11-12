import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TeamPageComponent from "../../components/TeamPage/TeamPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import AddTeamPage from "./AddTeamPage";
class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      openCreateModal: false,
      errorNotify: false,
      successNotify: false
    };
  }

  componentWillMount() {
    this.getTeam();
  }

  getTeam = () => {
    api.apiGet(urlApi.getListTeam).then(res => {
      if (res) {
        this.setState({ teams: res.data });
      }
    });
  };

  addTeam = () => {
    //this.props.history.push('/team/add');
    this.setState({ openCreateModal: true });
  };

  delete = id => {
    api.apiDelete(urlApi.getListTeam + id).then(res => {
      if (res) {
        this.getTeam();
      }
    });
  };

  toggle = () => {
    const { openCreateModal } = this.state;
    this.setState({ openCreateModal: !openCreateModal });
  };

  onCompleteCreateTeam = (newTeam, type) => {
    if (type) {
      let { teams } = this.state;
      teams.unshift(newTeam.data);
      this.setState({ successNotify: true, teams });
      this.notify = setTimeout(() => {
        this.setState({ successNotify: false });
      }, 3000);
    } else {
      this.setState({ errorNotify: true });
      this.notify = setTimeout(() => {
        this.setState({ errorNotify: false });
      }, 3000);
    }
  };
  render() {
    const { teams, errorNotify, successNotify } = this.state;
    return (
      <span>
        <Modal isOpen={this.state.openCreateModal} toggle={this.toggle}>
          <ModalBody>
            <AddTeamPage
              toggle={this.toggle}
              onComplete={this.onCompleteCreateTeam}
            />
          </ModalBody>
        </Modal>
        <TeamPageComponent
          errorNotify={errorNotify}
          successNotify={successNotify}
          {...this.props}
          listTeams={teams}
          addTeam={() => this.addTeam()}
          delete={id => this.delete(id)}
        />
      </span>
    );
  }
}

export default withRouter(TeamPage);
