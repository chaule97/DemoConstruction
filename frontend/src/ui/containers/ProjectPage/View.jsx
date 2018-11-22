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
      successNotify: false,
      data: {},
      changeValue: {},
      errors_password: [],
      email_error: false,
      userName_error: false,
      successNotify: false,
      successNotify_password: false,
      afterChange_error: false
    };
  }

  componentWillMount() {
    this.setState({ type: localStorage.getItem("type") });
    api.apiGet(urlApi.getListProject).then(res => {
      this.setState({ projects: res.data });
    });
    api.apiGet(urlApi.me).then(res => {
      if (res.data) {
        this.setState({ data: res.data[0], userId: res.data[0].id });
      }
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

  changeDataValue = (key, value) => {
    let { data, changeValue } = this.state;
    data[key] = value;
    changeValue[key] = value;
    this.setState({
      data,
      changeValue
    });
  };
  update = () => {
    const { userId, changeValue } = this.state;
    let { errors_password } = this.state;
    this.setState({
      successNotify: false
    });
    this.setState({
      successNotify_password: false
    });
    this.setState({
      afterChange_error: false
    });
    errors_password = [];
    if (!changeValue.old_password || changeValue.old_password.trim() == "") {
      errors_password.push("password");
    }
    if (!changeValue.password || changeValue.password.trim() == "") {
      errors_password.push("old_password");
    }
    if (errors_password.length > 0)
      this.setState({
        errors_password
      });
    if (errors_password.length == 0) {
      api.apiPatch(urlApi.getListUser + userId + "/", changeValue).then(res => {
        if (res) {
          if (res.data.success) {
            this.setState({
              successNotify_password: true
            });
          } else {
            this.setState({
              afterChange_error: true
            });
          }
        }
      });
    }
  };

  render() {
    const {
      openModal,
      dataOfModal,
      projects,
      type,
      errorNotify,
      successNotify,
      data,
      errors_password,
      email_error,
      userName_error,
      successNotify_password,
      afterChange_error,
      changeValue
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
          data={data}
          errors_password={errors_password}
          email_error={email_error}
          userName_error={userName_error}
          successNotify_password={successNotify_password}
          afterChange_error={afterChange_error}
          editUser={this.update}
          changeDataValue={(key, value) => this.changeDataValue(key, value)}
          changeValue={changeValue}
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
