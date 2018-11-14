import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import * as PATH from "../../../constants/routeConstants";
import ViewComponent from "../../components/ProjectPage/ProjectPage";
import ViewDetailProcessModal from "../../components/ProjectPage/ViewDetailProcessModal";
import * as api from "../../../api/api";

import urlApi from "../../../constants/urlApi";
import CreateProjectContainer from "./CreateProjectContainer";
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      dataOfModal: {},
      projects: [],
      openCreateModal: false,
      errorNotify: false,
      successNotify: false
    };
  }

  componentWillMount() {
    this.setState({ type: localStorage.getItem("type") });
    api.apiGet(urlApi.getListProject).then(res => {
      console.log(res);
      this.setState({ projects: res.data });
    });
  }
  componentWillUnmount() {
    clearTimeout(this.notify);
  }

  openModal = event => {
    this.setState({ openModal: true, dataOfModal: event });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  createProject = () => {
    //this.props.history.push(PATH.PROJECT_CREATE_URL)

    this.setState({ openCreateModal: true });
  };

  toggle = () => {
    const { openCreateModal } = this.state;
    this.setState({ openCreateModal: !openCreateModal });
  };

  onCompleteCreateProj = (newProj, type) => {
    if (type) {
      let { projects } = this.state;
      projects.unshift(newProj.data);
      this.setState({ successNotify: true, projects });
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
    const {
      openModal,
      dataOfModal,
      projects,
      type,
      errorNotify,
      successNotify
    } = this.state;

    return (
      <span>
        <Modal isOpen={this.state.openCreateModal} toggle={this.toggle}>
          <ModalBody>
            <CreateProjectContainer
              toggle={this.toggle}
              onComplete={this.onCompleteCreateProj}
            />
          </ModalBody>
        </Modal>
        <ViewComponent
          errorNotify={errorNotify}
          successNotify={successNotify}
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

export default withRouter(View);
