import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Table } from "reactstrap";
import * as PATH from "../../../constants/routeConstants";
const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000"
  }
};
const ViewDetailProcessModal = props => {
  const { data } = props;
  if (!Array.isArray(data)) return null;
  return (
    <Modal isOpen={props.openModal} style={style}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                {"Danh sách dự án"}
              </h4>
            </div>
            <div className="modal-body">
              <Table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((project, i) => {
                      return (
                        <tr key={i}>
                          <td>{project.name}</td>
                          <td className="pull-right">
                            <Link
                              className="btn btn-primary"
                              to={`${PATH.PROJECT_URL}/${project.id}`}
                            >
                              Chi tiết
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => {
                  props.close();
                }}
                type="button"
                className="btn btn-danger mg-l-5"
                data-dismiss="modal"
              >
                {"Đóng"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDetailProcessModal;
