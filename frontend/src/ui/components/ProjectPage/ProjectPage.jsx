import React from "react";
import { Link, withRouter } from "react-router-dom";
import Calendar from "react-big-calendar";
import moment from "moment";
import { Button } from "reactstrap";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import * as PATH from "../../../constants/routeConstants";

const localizer = Calendar.momentLocalizer(moment);
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeTab: "1",
      admins: [],
      projects: [],
      viewGridStatus: true,
      projects: []
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({ type: localStorage.getItem("type") });
    this.getProject();
    this.getDetail();
  }

  getProject = () => {
    api.apiGet(urlApi.getListProject).then(res => {
      if (res) {
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

  getDetail = () => {
    api.apiGet(urlApi.getListSubmit).then(res => {
      let events = res.data.map(item => ({
        start: moment(item.date),
        end: moment(item.date),
        title: `${item.content} ${item.note}`
      }));
      this.setState({ events });
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
  renderForAdmin() {
    const { viewGridStatus } = this.state;
    const { listProjects } = this.props;
    return (
      <div>
        <div className="pull-right m-t-s25 m-r-20 ">
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
              {listProjects.map((item, index) => {
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
                      <div className="card">
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
                        <i className="fa m-r-5" /> Dự án
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
                          {(listProjects || []).map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.supervisor.username}</td>
                                <td>{item.address}</td>
                                <td>
                                  {moment(item.created_at).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  <Link to={PATH.PROJECT_URL + "/" + item.id}>
                                    <Button color={"info"}>Chi tiết</Button>
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
            </section>
          </div>
        )}
      </div>
    );
  }

  renderForSupervisor() {
    const { projects } = this.state;
    return (
      <div>
        <div>
          <section className="content">
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
                                  to={`${PATH.PROJECT_URL}/${item.id}/submit`}
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
