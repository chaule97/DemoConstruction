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
  if (!Array.isArray(data) || !props.projects) return null;
  return (
    <Modal isOpen={props.openModal} style={style}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel">
                {"Số nhóm đã báo cáo:"}
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
                    data.map((team, i) => {
                      return (
                        <tr key={i}>
                          <td>{team.name}</td>
                          <td>
                            <Link
                              to={`${PATH.PROJECT_URL}/${
                                props.projects[0].id
                              }/detail?current=${team.id}`}
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
