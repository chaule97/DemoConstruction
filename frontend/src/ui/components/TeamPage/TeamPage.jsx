import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { TabContent, Breadcrumb, BreadcrumbItem, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import * as PATH from "../../../constants/routeConstants";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import LastTeamSubmit from './LastTeamSubmit';

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewGridStatus: true,
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onShowGridView = () => {
    this.setState({ viewGridStatus: true });
  };

  onShowListView = () => {
    this.setState({ viewGridStatus: false });
  };

  viewTeamDetail = id => {
    this.props.history.push(PATH.TEAM_URL + "/" + id);
  };

  render() {
    const { listTeams, subTeams } = this.props;
    const { viewGridStatus } = this.state;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active>ĐỘI</BreadcrumbItem>
        </Breadcrumb>
        <section className="content">
          <Nav tabs>
            <NavItem
              className={classnames({ active: this.state.activeTab === "1" })}
            >
              <NavLink
                onClick={() => {
                  this.toggle("1");
                }}
                style={{ color: "black", cursor: "pointer" }}
              >
                Tất cả
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({ active: this.state.activeTab === "2" })}
            >
              <NavLink
                onClick={() => {
                  this.toggle("2");
                }}
                style={{ color: "black", cursor: "pointer" }}
              >
                Gần đây
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <section className="sec1">
                <div className="view-dashboard">
                  <div className="row" style={{ paddingTop: '15px' }}>
                    <div className="pull-right" style={{ paddingRight: "25px", paddingBottom: '10px' }}>
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
                    {this.props.successNotify && (
                      <div className="alert alert-success">Thêm thành công</div>
                    )}
                    {this.props.errNotify && (
                      <div className="alert alert-error">Lỗi khi thêm</div>
                    )}
                    {viewGridStatus ? (
                      <section className="content">
                        <br />
                        <div className="row">
                          <div
                            onClick={() => this.props.addTeam()}
                            className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project"
                            style={{ cursor: "pointer" }}
                          >
                            <div className="card">
                              <div className="card-body" style={{ height: "100%" }}>
                                <div className="icon-add">
                                  <i className="glyphicon glyphicon-plus" />
                                  <span style={{ paddingTop: "5px" }}>Thêm nhóm</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {(listTeams || []).map((item, index) => {
                            return (
                              <span key={index} className="cursor-pointer">
                                <div
                                  className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project"
                                  style={{ paddingBottom: "10px" }}
                                >
                                  <div
                                    className="card"
                                    onClick={() => this.viewTeamDetail(item.id)}
                                  >
                                    <div className="card-body">
                                      <div className="project" style={{ padding: "30px" }}>
                                        <h3 className="card-title">{item.name}</h3>
                                        <h4 className="card-subtitle mb-2 text-muted">
                                          {item.note}
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
                        <section className="content">
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="box">
                                <div className="box-header with-border">
                                  <h3 className="box-title">
                                    <i className="fa fa-users m-r-5" />
                                    <i className="fa m-r-5" />
                                    &nbsp;Quản lý nhóm
                                  </h3>
                                  <div className="box-tools pull-right">
                                    <button
                                      className="btn btn-primary btn-sm btn-head"
                                      title="Add Team"
                                      onClick={() => this.props.addTeam()}
                                    >
                                      <i className="glyphicon glyphicon-plus margin-r-5" />
                                      Thêm nhóm
                                    </button>
                                  </div>
                                </div>
                                <div className="box-body">
                                  <table className="table table-bordered table-striped">
                                    <thead>
                                      <tr>
                                        <th>#</th>
                                        <th>Tên nhóm</th>
                                        <th>Mô tả</th>
                                        <th />
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(listTeams || []).map((item, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.note}</td>
                                            <td>
                                              <Link
                                                className="btn btn-info"
                                                to={`${PATH.TEAM_URL}/${item.id}`}
                                              >
                                                Chi tiết
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
                      )}
                  </div>
                </div>
              </section>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <div className="sec1">
                    <div className="view-dashboard" style={{ padding: '15px' }}>
                      <div className="row">
                        <LastTeamSubmit subTeams={subTeams} />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </section>
      </div>
    );
  }
}

export default withRouter(TeamPage);
