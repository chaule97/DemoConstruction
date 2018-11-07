import React, { Component } from 'react';

const ListProjectPage = props => {
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <i className="fa fa-user m-r-5"></i>
                  <i className="fa m-r-5"></i> Dự án</h3>

              </div>
              <div className="box-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Tên dự án</th>
                      <th>Giám sát</th>
                      <th>Ngày khởi tạo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listProjects || []).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.supervisor.username}</td>
                          <td>{moment().format("DD-MM-YYYY")}</td>
                          <td>
                            <Button color={'info'}>Chi tiết</Button> &nbsp;
                           <Button color={'success'}>Báo cáo</Button>
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