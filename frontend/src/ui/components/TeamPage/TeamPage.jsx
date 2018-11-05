import React, { Component } from 'react';

const TeamPage = props => {
        return (
            <div>             
                <section className="content">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header with-border">
                    <h3 className="box-title">
                    <i className="fa fa-users m-r-5"></i>
                      <i className="fa m-r-5"></i> Manage Team</h3>
                    <div className="box-tools pull-right">
                      <a className="btn btn-primary btn-sm btn-head"  title="Add Team"
                        onClick = {() => props.addTeam()}
                      >
                        <i className="glyphicon glyphicon-plus margin-r-5"></i>Add</a>
                    </div>
                    </div>
                      <div className="box-body">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>Team ID</th>
                              <th>Team Name</th>
                              <th>Supervisor</th>
                              <th>Project Name</th>
                              <th>Description</th>                              
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Paint</td>
                              <td>Pham Hong Cang</td>
                              <td>LandMark81</td>
                              <td>Build wall Landmark81</td>
                              <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"></i></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                              </div>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Building</td>
                              <td>Le Minh Chuong</td>
                              <td>ESTTower</td>
                              <td>Building ESTTower</td>
                              <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"></i></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                              </div>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Building</td>
                              <td>Tran Minh Vuong</td>
                              <td>LandMark81</td>
                              <td>Paint wall Landmark81</td>
                              <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"></i></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                              </div>
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Building</td>
                              <td>Tran Bao Dai</td>
                              <td>LandMark81</td>
                              <td>Paint yard Landmark81</td>
                              <td>
                              <div className="btn-group">
                                <button type="button" className="btn btn-success"><i className="fa fa-edit"></i></button>
                                <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                              </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                </section>
            </div>
        );
}

export default TeamPage;