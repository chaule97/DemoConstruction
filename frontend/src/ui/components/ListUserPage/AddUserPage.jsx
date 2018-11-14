import React from "react";

import cx from "classnames";

const AddUserPage = props => {
  const {
    errors,
    errors_password,
    afterChange_error,
    successNotify,
    successNotify_password,
    createNotify
  } = props;
  if (!errors) return null;
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <i className="fa fa-users m-r-5" />
                  <i className="fa m-r-5" />
                  {props.type == "edit" ? "Sửa" : "Thêm"}
                </h3>
              </div>
              <div className="box-body">
                {errors.length > 0 && (
                  <div className="container-fluid">
                    <div className="alert alert-danger">
                      Tất cả các Input đều phải khác rỗng
                    </div>
                  </div>
                )}
                {successNotify && (
                  <div className="container-fluid">
                    <div className="alert alert-success">
                      Cập nhật thành công
                    </div>
                  </div>
                )}
                {createNotify && (
                  <div className="container-fluid">
                    <div className="alert alert-success">
                      Tạo mới thành công
                    </div>
                  </div>
                )}
                <form>
                  <div>
                    <div className="form-group col-lg-6">
                      <label>
                        Tên đăng nhập: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("username") !== -1
                        })}
                        value={props.data.username}
                        onChange={e =>
                          props.changeDataValue("username", e.target.value)
                        }
                        disabled={props.type == "edit" ? true : false}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        {" "}
                        Tên đầy đủ: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("last_name") !== -1
                        })}
                        value={props.data.last_name}
                        onChange={e =>
                          props.changeDataValue("last_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Email: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("email") !== -1
                        })}
                        value={props.data.email}
                        onChange={e =>
                          props.changeDataValue("email", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {!props.type && (
                    <div className="form-group col-lg-6">
                      <label>
                        Mật khẩu: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="password"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("password") !== -1
                        })}
                        value={props.data.password}
                        onChange={e =>
                          props.changeDataValue("password", e.target.value)
                        }
                      />
                    </div>
                  )}
                </form>
                <div className="form-group col-lg-12">
                  <button
                    className="btn btn-success pull-right"
                    onClick={() => props.createUser()}
                  >
                    {props.type == "edit" ? "Sửa" : "Thêm"}
                  </button>
                </div>
              </div>
            </div>
            {props.type === "edit" && (
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">
                    <i className="fa fa-users m-r-5" />
                    <i className="fa m-r-5" />
                    {props.type == "edit" && "Thay đổi mật khẩu"}
                  </h3>
                </div>
                <div className="box-body">
                  {errors_password &&
                    errors_password.length > 0 && (
                      <div className="container-fluid">
                        <div className="alert alert-danger">
                          Các input phải khác rỗng
                        </div>
                      </div>
                    )}
                  {afterChange_error && (
                    <div className="container-fluid">
                      <div className="alert alert-danger">Sai mật khẩu</div>
                    </div>
                  )}
                  {successNotify_password && (
                    <div className="container-fluid">
                      <div className="alert alert-success">
                        Cập nhật mật khẩu thành công
                      </div>
                    </div>
                  )}
                  <form>
                    <div>
                      <div className="form-group col-lg-6">
                        <label>
                          Mật khẩu cũ: <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="password"
                          autoComplete="off"
                          className={cx("form-control", {
                            "border-red":
                              errors_password.indexOf("old_password") !== -1
                          })}
                          value={props.data.old_password}
                          onChange={e =>
                            props.changeDataValue(
                              "old_password",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="form-group col-lg-6">
                        <label>
                          Mật khẩu: <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="password"
                          autoComplete="off"
                          className={cx("form-control", {
                            "border-red":
                              errors_password.indexOf("password") !== -1
                          })}
                          value={props.data.password}
                          onChange={e =>
                            props.changeDataValue("password", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </form>
                  <div className="form-group col-lg-12">
                    <button
                      className="btn btn-success pull-right"
                      onClick={() => props.createUser("EDIT_PASSWORD")}
                    >
                      {props.type == "edit" ? "Sửa" : "Thêm"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddUserPage;
