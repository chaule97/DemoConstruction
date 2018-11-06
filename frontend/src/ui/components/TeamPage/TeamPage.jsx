import React, { Component } from 'react';

const TeamPage = props => {
  const {listTeams} = props;
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
                              {/* <th>Supervisor</th> */}
                              <th>Project Name</th>
                              <th>Description</th>                              
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listTeams.map((item, index) => {
                              return (
                              <tr key = {index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.project.name}</td>
                                <td>{item.project.description}</td>
                                <td>
                                <div className="btn-group">
                                  <button type="button" className="btn btn-success"><i className="fa fa-edit"></i></button>
                                  <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                </div>
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
            </div>
        );
}

export default TeamPage;