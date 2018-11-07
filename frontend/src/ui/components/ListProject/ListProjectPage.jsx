import React, { Component } from 'react';

const ListUserPage = props => {
  return (
      <div>             
          <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
              <div className="box-header with-border">
              <h3 className="box-title">
              <i className="fa fa-user m-r-5"></i>
                <i className="fa m-r-5"></i> List Project</h3>
           
              </div>
                <div className="box-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Project Name</th>
                        <th>Date/Time</th>
                      </tr>
                    </thead>
                    <tbody>
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