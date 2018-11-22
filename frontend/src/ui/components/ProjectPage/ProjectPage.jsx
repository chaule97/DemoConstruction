import React from "react";
import { Link, withRouter } from "react-router-dom";
import Calendar from "react-big-calendar";
import moment from "moment";
import { Button } from "reactstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import * as PATH from "../../../constants/routeConstants";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import cx from "classnames";
import Pagination from "react-js-pagination";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

const localizer = Calendar.momentLocalizer(moment);
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      admins: [],
      projects: [],
      viewGridStatus: true,
      projects: [],
      breadCrumb: [{ active: true, value: "DỰ ÁN", link: "/project/view" }],
      activePage: 1,
      itemPerPage: 48
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ type: localStorage.getItem("type") });
    this.getProject();
    //this.getDetail();
  }

  getProject = () => {
    api.apiGet(urlApi.getListProject).then(res => {
      if (res.data) {
        let data = res.data;
        if (window.localStorage.getItem("type") == "supervisor") {
          let supervisorId = +window.localStorage.getItem("id");
          data = res.data.filter(project => {
            return project.supervisor.id == supervisorId;
          });
        } else {
          data = res.data;
        }
        this.setState({ projects: data });
      }
    });
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  openModal = event => {
    this.props.openModal(event);
  };

  viewDashboard = id => {
    this.props.history.push(PATH.PROJECT_URL + "/" + id);
  };

  onShowGridView = () => {
    this.setState({ viewGridStatus: true });
  };

  onShowListView = () => {
    this.setState({ viewGridStatus: false });
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

  renderForAdmin() {
    const { viewGridStatus, breadCrumb, activePage, itemPerPage } = this.state;
    const { listProjects } = this.props;

    const renderListProject = this.handleSlicePage(listProjects, activePage);
    return (
      <div>
        <div className="d-flex justify-content-between">
          <Breadcrumb>
            <BreadcrumbItem active>DỰ ÁN</BreadcrumbItem>
          </Breadcrumb>
          <div className="pull-right" style={{ paddingRight: "25px" }}>
            <button
              className={
                viewGridStatus ? "btn-transparent font-25" : "btn-transparent"
              }
              onClick={() => this.onShowGridView()}
            >
              <i className="fa fa-th-large" />
            </button>
            <button
              className={
                !viewGridStatus ? "btn-transparent font-25" : "btn-transparent"
              }
              onClick={() => this.onShowListView()}
            >
              <i className="fa fa-list" />
            </button>
          </div>
        </div>
        <div>
          {this.props.successNotify && (
            <div className="alert alert-success">Thêm thành công</div>
          )}
          {this.props.errNotify && (
            <div className="alert alert-error">Lỗi khi thêm</div>
          )}
        </div>
        {viewGridStatus ? (
          <section className="content">
            <br />
            <div className="row">
              <div
                onClick={() => this.props.createProject()}
                className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project"
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="card-body" style={{ height: "100%" }}>
                    <div className="icon-add">
                      <i className="glyphicon glyphicon-plus" />
                      <span style={{ paddingTop: "5px" }}>Thêm</span>
                    </div>
                  </div>
                </div>
              </div>
              {renderListProject.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="cursor-pointer"
                    onClick={() => this.viewDashboard(item.id)}
                  >
                    <div
                      className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project"
                      style={{ paddingBottom: "10px" }}
                    >
                      <div
                        className={cx("card", {
                          "border-ended": moment(
                            moment().format("YYYY-MM-DD")
                          ).isAfter(moment(item.ended_at)),
                          "border-in-progress": moment(
                            moment().format("YYYY-MM-DD")
                          ).isSameOrBefore(moment(item.ended_at))
                        })}
                      >
                        <div className="card-body">
                          <div
                            className="project-content"
                            style={{ zIndex: "10" }}
                          >
                            <h3 className="card-title">{item.name}</h3>
                            <h4 className="card-subtitle mb-2 text-muted">
                              {item.supervisor.username}
                            </h4>
                            <h4 className="card-subtitle mb-2 text-muted">
                              {item.address}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemPerPage}
                totalItemsCount={listProjects.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
          </section>
        ) : (
          <div>
            <section className="content">
              <div className="row">
                <div className="col-xs-12">
                  <div className="box">
                    <div className="box-header with-border">
                      <h3 className="box-title">
                        <i className="fa fa-user m-r-5" />
                        <i className="fa m-r-5" />
                        Dự án
                      </h3>
                      <div className="box-tools pull-right">
                        <a
                          className="btn btn-primary btn-sm btn-head"
                          title="Add Team"
                          onClick={() => this.props.createProject()}
                        >
                          <i className="glyphicon glyphicon-plus margin-r-5" />
                          Tạo dự án
                        </a>
                      </div>
                    </div>
                    <div className="box-body">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Tên dự án</th>
                            <th>Giám sát</th>
                            <th>Địa chỉ</th>
                            <th>Ngày khởi tạo</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {renderListProject.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td
                                  className={cx({
                                    "border-ended list": moment(
                                      moment().format("YYYY-MM-DD")
                                    ).isAfter(moment(item.ended_at)),
                                    "border-in-progress list": moment(
                                      moment().format("YYYY-MM-DD")
                                    ).isSameOrBefore(moment(item.ended_at))
                                  })}
                                >
                                  {item.name}
                                </td>
                                <td>{item.supervisor.username}</td>
                                <td>{item.address}</td>
                                <td>
                                  {moment(item.created_at).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  <Link to={PATH.PROJECT_URL + "/" + item.id}>
                                    {moment(
                                      moment().format("YYYY-MM-DD")
                                    ).isAfter(moment(item.ended_at)) ? (
                                      <Button color={"danger"}>Chi tiết</Button>
                                    ) : (
                                      <Button color={"info"}>Chi tiết</Button>
                                    )}
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="pull-right">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemPerPage}
                          totalItemsCount={listProjects.length}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  renderForSupervisor() {
    const { projects } = this.state;
    const {
      data,
      errors_password,
      successNotify_password,
      afterChange_error,
      changeDataValue,
      editUser
    } = this.props;
    return (
      <div>
        <div>
          <section className="content">
            <Nav tabs>
              <NavItem className={cx({ active: this.state.activeTab === "1" })}>
                <NavLink
                  onClick={() => {
                    this.toggle("1");
                  }}
                  style={{ color: "black", cursor: "pointer" }}
                >
                  Thống kê
                </NavLink>
              </NavItem>
              <NavItem className={cx({ active: this.state.activeTab === "2" })}>
                <NavLink
                  onClick={() => {
                    this.toggle("2");
                  }}
                  style={{ color: "black", cursor: "pointer" }}
                >
                  Chi tiết
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header with-border">
                        <h3 className="box-title">
                          <i className="fa fa-user m-r-5" />
                          <i className="fa m-r-5" /> Dự án
                        </h3>
                      </div>
                      <div className="box-body">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Tên dự án</th>
                              <th>Giám sát</th>
                              <th>Ngày khởi tạo</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.supervisor.username}</td>
                                  <td>{moment().format("DD-MM-YYYY")}</td>
                                  <td>
                                    <Link
                                      to={`${PATH.PROJECT_URL}/${
                                        item.id
                                      }/submit`}
                                    >
                                      <Button color={"success"}>Báo cáo</Button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-header with-border">
                        <h3 className="box-title">
                          <i className="fa fa-users m-r-5" />
                          <i className="fa m-r-5" />
                          Thay đổi mật khẩu
                        </h3>
                      </div>
                      <div className="box-body">
                        {errors_password &&
                          errors_password.length > 0 && (
                            <div className="container-fluid">
                              <div className="alert alert-danger">
                                Các input phải khác rỗng
                              </div>
                            </div>
                          )}
                        {afterChange_error && (
                          <div className="container-fluid">
                            <div className="alert alert-danger">
                              Sai mật khẩu
                            </div>
                          </div>
                        )}
                        {successNotify_password && (
                          <div className="container-fluid">
                            <div className="alert alert-success">
                              Cập nhật mật khẩu thành công
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="form-group col-lg-6">
                            <label>
                              Tên đăng nhập:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              className={cx("form-control")}
                              value={data ? data.username : ""}
                              disabled
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label>
                              {" "}
                              Tên đầy đủ:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="text"
                              autoComplete="off"
                              className={cx("form-control")}
                              value={data ? data.last_name : ""}
                              disabled
                            />
                          </div>
                          <div className="form-group col-lg-6">
                            <label>
                              Email: <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              type="email"
                              autoComplete="off"
                              className={cx("form-control")}
                              value={data ? data.email : ""}
                              disabled
                            />
                          </div>
                        </div>
                        <form>
                          <div>
                            <div className="form-group col-lg-6">
                              <label>
                                Mật khẩu cũ:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="password"
                                autoComplete="off"
                                className={cx("form-control", {
                                  "border-red":
                                    errors_password.indexOf("old_password") !==
                                    -1
                                })}
                                value={data ? data.old_password : ""}
                                onChange={e =>
                                  changeDataValue(
                                    "old_password",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-lg-6">
                              <label>
                                Mật khẩu:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="password"
                                autoComplete="off"
                                className={cx("form-control", {
                                  "border-red":
                                    errors_password.indexOf("password") !== -1
                                })}
                                value={data ? data.password : ""}
                                onChange={e =>
                                  changeDataValue("password", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </form>
                        <div className="form-group col-lg-12">
                          <button
                            className="btn btn-success pull-right"
                            onClick={() => editUser()}
                          >
                            Sửa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabContent>
          </section>
        </div>
        }
      </div>
    );
  }

  render() {
    const { type } = this.state;
    return (
      <div>
        {type === "admin" ? this.renderForAdmin() : this.renderForSupervisor()}
      </div>
    );
  }
}

export default withRouter(ProjectPage);
