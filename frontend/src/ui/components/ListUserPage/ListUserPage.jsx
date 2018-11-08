import React from 'react';
import { Link } from 'react-router-dom';

const ListUserPage = props => {
  const {listUsers} = props;
  return (
      <div>             
          <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
              <div className="box-header with-border">
              <h3 className="box-title">
              <i className="fa fa-user m-r-5"></i>
                <i className="fa m-r-5"></i> Quản lý giám sát</h3>
              <div className="box-tools pull-right">
                <Link to="#" className="btn btn-primary btn-sm btn-head"  title="Add User"
                  onClick = {() => props.addUser()}
                >
                  <i className="glyphicon glyphicon-plus margin-r-5"></i>Thêm</Link>
              </div>
              </div>
                <div className="box-body">  
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Tài khoản</th>
                        <th>Họ tên</th>
                        <th>Email</th>                                
                        <th>Nhóm</th>                                
                        <th>Chỉnh sửa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(listUsers || []).map((item, index) => {
                        return (
                          <tr key = {index}>
                          <td>{item.username}</td>
                          <td>{item.last_name}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.is_superuser ?
                            <span className="label label-success">Admin</span>
                              :<span className="label label-danger">Supervisor</span>
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