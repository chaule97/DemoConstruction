import React from "react";
import cx from "classnames";
const AddTeamPage = props => {
  return (
    <div>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  <i className="fa fa-users m-r-5" />
                  <i className="fa m-r-5" />{" "}
                  {props.type === "edit" ? "Sửa nhóm" : "Thêm nhóm"}
                </h3>
              </div>
              <div className="box-body">
                {props.errors.length > 0 && (
                  <div className="container-fluid">
                    <div className="alert alert-danger">
                      Tất cả các Input đều phải khác rỗng
                    </div>
                  </div>
                )}
                <form>
                  <div>
                    <div className="form-group col-lg-6">
                      <label>
                        Tên nhóm: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        className={cx(`form-control`, {
                          "border-red": props.errors.indexOf("name") != -1
                        })}
                        value={props.data.name}
                        onChange={e =>
                          props.changeAddTeam("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <label>Mô tả:</label>
                      <textarea
                        rows="4"
                        autoComplete="off"
                        className={cx(`form-control`, {
                          "border-red": props.errors.indexOf("note") != -1
                        })}
                        value={props.data.note}
                        onChange={e =>
                          props.changeAddTeam("note", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </form>
                <div className="form-group col-lg-12">
                  <button
                    className="btn btn-success pull-right"
                    onClick={() => props.createTeam()}
                  >
                    {props.type === "edit" ? "Sửa" : "Thêm"}
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

export default AddTeamPage;
