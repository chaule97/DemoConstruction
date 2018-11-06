import React, { Component } from 'react';

const ListUserPage = props => {
  const {listUsers} = props;
    console.log(props.listUsers)
  return (
      <div>             
          <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
              <div className="box-header with-border">
              <h3 className="box-title">
              <i className="fa fa-user m-r-5"></i>
                <i className="fa m-r-5"></i> Manage Supervisor</h3>
              <div className="box-tools pull-right">
                <a className="btn btn-primary btn-sm btn-head"  title="Add User"
                  onClick = {() => props.addUser()}
                >
                  <i className="glyphicon glyphicon-plus margin-r-5"></i>Add</a>
              </div>
              </div>
                <div className="box-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Full Name</th>
                        <th>Email</th>                                
                        <th>Status</th>                                
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUsers.map((item, index) => {
                        return (
                          <tr key = {index}>
                          <td>{item.username}</td>
                          <td>{item.last_name}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.is_staff ?
                            <span className="label label-success">Active</span>
                              :<span className="label label-danger">Inactive</span>
                            }
                            
                            </td>
                          <td>
                          <div className="btn-group">
                            <button type="button" className="btn btn-success" onClick = {() => props.editUser(item)}><i className="fa fa-edit"></i></button>
                            <button type="button" className="btn btn-danger"><i className="fa fa-trash"></i></button>
                          </div>
                          </td>
                        </tr>
                        )
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

export default ListUserPage;