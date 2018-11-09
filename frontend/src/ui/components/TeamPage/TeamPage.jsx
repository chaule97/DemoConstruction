import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import * as PATH from '../../../constants/routeConstants';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';

class TeamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewGridStatus: true,
    };
  }

  onShowGridView = () => {
    this.setState({ viewGridStatus: true })
  }

  onShowListView = () => {
    this.setState({ viewGridStatus: false })
  }

  viewTeamDetail = (id) => {
    this.props.history.push(PATH.TEAM_URL + '/' + id)
  }

  render() {
    const { listTeams } = this.props;
    const { viewGridStatus } = this.state;
    return (
      <div>
        <div className="pull-right m-t-s25 m-r-20 ">
          <button className={viewGridStatus ? "btn-transparent font-25" : "btn-transparent"}
            onClick={() => this.onShowGridView()}
          ><i className="fa fa-th-large"></i></button>
          <button className={!viewGridStatus ? "btn-transparent font-25" : "btn-transparent"}
            onClick={() => this.onShowListView()}
          ><i className="fa fa-list"></i></button>
        </div>
        {viewGridStatus ?
          <section className="content">
            <br />
            <div className="row">
              <div onClick={() => this.props.addTeam()} className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project" style={{ cursor: 'pointer' }}>
                <div className="card">
                  <div className="card-body">
                    <div className="icon-add" style={{ zIndex: '10', left: '32%' }}>
                      <i className="glyphicon glyphicon-plus"></i>
                      <span style={{ paddingTop: '5px' }}>Thêm nhóm</span>
                    </div>
                  </div>
                </div>
              </div>
              {(listTeams || []).map((item, index) => {
                return (
                  <span key={index} className="cursor-pointer"  >
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project" style={{ paddingBottom: '10px' }}>
                      <div className="card">
                        <div className="card-body">
                          <div className="pull-right" style={{ zIndex: '50' }}>
                            <Link className="btn btn-success" to={`${PATH.TEAM_EDIT_URL}/id=${item.id}`}>Sửa</Link>&nbsp;&nbsp;&nbsp;
                            <Button color="danger" onClick={() => this.props.delete(item.id)}>X</Button>
                          </div>
                          <div className="project" style={{ padding: '30px' }} onClick={() => this.viewTeamDetail(item.id)} >
                            <h3 className="card-title">{item.name}</h3>
                            <h4 className="card-subtitle mb-2 text-muted">{item.note}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                )
              })}
            </div>
          </section>
          :
          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      <i className="fa fa-users m-r-5"></i>
                      <i className="fa m-r-5"></i>&nbsp;Quản lý nhóm
                    </h3>
                    <div className="box-tools pull-right">
                      <a className="btn btn-primary btn-sm btn-head" title="Add Team"
                        onClick={() => this.props.addTeam()}
                      >
                        <i className="glyphicon glyphicon-plus margin-r-5"></i>Thêm nhóm</a>
                    </div>
                  </div>
                  <div className="box-body">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên nhóm</th>
                          <th>Tên dự án</th>
                          <th>Mô tả</th>
                          <th>Chỉnh sửa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(listTeams || []).map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{(item.project || {}).name}</td>
                              <td>{item.note}</td>
                              <td>
                                <Link className="btn btn-success" to={`${PATH.TEAM_EDIT_URL}/id=${item.id}`}><i className="fa fa-edit"></i></Link>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={() => this.props.delete(item.id)}><i className="fa fa-trash"></i></button>
                              </td>
                            </tr>)
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </div>
    );
  }
}

export default withRouter(TeamPage);