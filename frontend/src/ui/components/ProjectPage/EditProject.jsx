import React from "react";
import cx from "classnames";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EditProject = props => {
  const { errors, success } = props;
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <i className="fa fa-users m-r-5" />
                  <i className="fa m-r-5" /> Cập nhật thông tin dự án
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
                {success && (
                  <div className="container-fluid">
                    <div className="alert alert-success">
                      Cập nhật thành công
                    </div>
                  </div>
                )}
                <form>
                  <div>
                    <div className="form-group col-lg-6">
                      <label>
                        Tên dự án: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("name") !== -1
                        })}
                        value={props.project.name}
                        onChange={e =>
                          props.changeProjectDetailValue("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Tên công trình: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red":
                            errors.indexOf("construction_name") !== -1
                        })}
                        value={props.project.construction_name}
                        onChange={e =>
                          props.changeProjectDetailValue(
                            "construction_name",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Địa chỉ: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("address") !== -1
                        })}
                        value={props.project.address}
                        onChange={e =>
                          props.changeProjectDetailValue(
                            "address",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Chủ đầu tư: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("investor") !== -1
                        })}
                        value={props.project.investor}
                        onChange={e =>
                          props.changeProjectDetailValue(
                            "investor",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Vị trí: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("position") !== -1
                        })}
                        value={props.project.position}
                        onChange={e =>
                          props.changeProjectDetailValue(
                            "position",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Ngày kết thúc dự kiến:{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <DatePicker
                        dateFormat="DD/MM/YYYY"
                        className={cx("form-control", {
                          "border-red": errors.indexOf("ended_at") !== -1
                        })}
                        type="date"
                        name="ended_at"
                        value={moment(props.project.ended_at).format(
                          "DD-MM-YYYY"
                        )}
                        onChange={e => {
                          props.changeProjectDetailValue(
                            "ended_at",
                            moment(e).format("YYYY-MM-DD")
                          );
                        }}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Giám sát: <span style={{ color: "red" }}>*</span>
                      </label>

                      <select
                        disabled
                        className={cx("form-control", {
                          "border-red": errors.indexOf("supervisor") !== -1
                        })}
                        onChange={e =>
                          props.changeProjectDetailValue(
                            "supervisor",
                            e.target.value
                          )
                        }
                      >
                        <option value={props.supervisor.id} defaultValue>
                          {props.supervisor.username}
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-lg-6">
                      <label>
                        Ngày khởi tạo: <span style={{ color: "red" }}>*</span>
                      </label>
                      <span className="form-control border-0 ">
                        {moment(props.project.created_at).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    {/* <div className="form-group col-lg-6">
                                            <label>Mô tả:</label>
                                            <textarea rows="4" autoComplete="off" className="form-control"
                                                value={props.project.description}
                                                onChange={(e) => props.changeProjectDetailValue('description', e.target.value)}
                                            />
                                        </div> */}
                  </div>
                </form>
                <div className="form-group col-lg-12">
                  <button
                    className="btn btn-success pull-right"
                    onClick={() => props.editProject()}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default EditProject;
