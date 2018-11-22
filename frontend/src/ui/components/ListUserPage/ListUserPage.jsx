import React from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";

const ListUserPage = props => {
  const {
    listUsers,
    activePage,
    itemPerPage,
    renderList,
    filterName,
    onChangeValue
  } = props;
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <input
                    type="text"
                    value={filterName}
                    onChange={onChangeValue}
                    className="form-control"
                    placeholder="Lọc theo họ tên"
                  />
                </h3>
                <div className="box-tools pull-right">
                  <Link
                    to="#"
                    className="btn btn-primary btn-sm btn-head"
                    title="Add User"
                    onClick={() => props.addUser()}
                  >
                    <i className="glyphicon glyphicon-plus margin-r-5" />
                    Thêm
                  </Link>
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
                    {(renderList || []).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.username}</td>
                          <td>{item.last_name}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.is_superuser ? (
                              <span className="label label-success">Admin</span>
                            ) : (
                              <span className="label label-danger">
                                Supervisor
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group">
                              <Link
                                className="btn btn-success"
                                to={`user/${item.id}/edit`}
                              >
                                <i className="fa fa-edit" />
                              </Link>
                            </div>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemPerPage}
          totalItemsCount={listUsers.length}
          pageRangeDisplayed={5}
          onChange={props.handlePageChange}
        />
      </div>
    </div>
  );
};

export default ListUserPage;
