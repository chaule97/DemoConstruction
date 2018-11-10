import React from "react";
import cx from "classnames";
const SubmitForm = props => {
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <i className="fa fa-edit m-r-5" />
                  <i className="fa m-r-5" /> Báo cáo
                </h3>
              </div>
              <div className="box-body">
                <form>
                  <div>
                    <div className="form-group col-sm-2 col-md-4 col-lg-2 sticky-top">
                      {/* <label>Nhóm thi công: <span style={{color: "red"}}>*</span></label> */}
                      <select
                        className="form-control"
                        value={"tesst"}
                        onChange={e => props.changeSelectedTeam(e.target.value)}
                      >
                        <option value="">-- Nhóm thi công --</option>
                        {(props.teams || []).map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {(props.submitValue || []).map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="col-sm-3" />
                          <div className="col-sm-9 submit-frame">
                            <div className="col-sm-12 text-align-center">
                              <label>{item.teamDataDetail.name}</label>
                              {props.errors[+item.team] && (
                                <div className="alert alert-danger">
                                  Các input phải khác rỗng
                                </div>
                              )}
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Số lượng công nhân:
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].worker_number
                                })}
                                value={item.worker_number}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "worker_number",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Tiến độ đạt được:
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].process
                                })}
                                value={item.process}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "process",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Công việc:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows="3"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].task_name
                                })}
                                value={item.task_name}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "task_name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Ghi chú, đề xuất:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows="3"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].content
                                })}
                                value={item.content}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "content",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Đề xuất vật tư:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows="2"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].proposed_materials
                                })}
                                value={item.proposed_materials}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "proposed_materials",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="form-group col-sm-12 col-md-6 col-lg-6">
                              <label>
                                Các công việc cần chuẩn bị:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <textarea
                                rows="3"
                                autoComplete="off"
                                className={cx(`form-control`, {
                                  "border-red":
                                    props.errors[+item.team] &&
                                    props.errors[+item.team].job_tomorrow
                                })}
                                value={item.job_tomorrow}
                                onChange={e =>
                                  props.changeSubmitFormValue(
                                    item.team,
                                    "job_tomorrow",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div
                              className="form-group col-sm-12 col-md-6 col-lg-6"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              <button
                                className="btn btn-danger text-right"
                                onClick={() => props.cancel(item)}
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </form>
                <div className="form-group col-lg-12">
                  <button
                    className="btn btn-success pull-right"
                    onClick={() => props.submit()}
                  >
                    Gửi
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

export default SubmitForm;
