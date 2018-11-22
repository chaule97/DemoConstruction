import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserPageComponent from "../../components/ListUserPage/ListUserPage";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import Pagination from "react-js-pagination";
import { remove } from "diacritics";

class ListUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supervisors: [],
      activePage: 1,
      itemPerPage: 30,
      filterName: ""
    };
  }

  componentDidMount() {
    this.getSupervisors();
  }

  getSupervisors() {
    api
      .apiGet(urlApi.getSupervisors)
      .then(res => this.setState({ supervisors: res.data }));
  }

  addUser = () => {
    this.props.history.push("/user/add");
  };
  deleteUser = id => {
    api.apiDelete(urlApi.getListUser + id + "/").then(res => {
      console.log(res);
      this.getSupervisors();
    });
  };

  handlePageChange = page => {
    this.setState({ activePage: page });
  };
  handleSlicePage = (arr, toPage) => {
    const { itemPerPage } = this.state;
    return arr.slice(
      (toPage - 1) * itemPerPage,
      (toPage - 1) * itemPerPage + itemPerPage
    );
  };

  onChangeFilter = e => {
    let enteredText = e.target.value;
    this.setState({ filterName: enteredText });
  };
  render() {
    const { supervisors, itemPerPage, activePage, filterName } = this.state;
    let renderListSupervisor;
    let searchingUser;
    if (filterName == "")
      renderListSupervisor = this.handleSlicePage(supervisors, activePage);
    else {
      searchingUser = supervisors.filter(sup => {
        return (
          remove(sup.last_name.toLowerCase().trim()).indexOf(
            remove(filterName.toLowerCase().trim())
          ) != -1
        );
      });
      renderListSupervisor = this.handleSlicePage(searchingUser, activePage);
    }
    return (
      <UserPageComponent
        {...this.props}
        listUsers={filterName == "" ? supervisors : searchingUser}
        addUser={() => this.addUser()}
        deleteUser={this.deleteUser}
        handlePageChange={this.handlePageChange}
        activePage={activePage}
        itemPerPage={itemPerPage}
        renderList={renderListSupervisor}
        onChangeValue={this.onChangeFilter}
        filterName={filterName}
      />
    );
  }
}

export default withRouter(ListUserPage);
