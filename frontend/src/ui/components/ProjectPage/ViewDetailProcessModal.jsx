import React from 'react';
import Modal from 'react-modal';
import { ListGroup, ListGroupItem } from 'reactstrap';
const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000'
    }
}
const ViewDetailProcessModal = props => {
    return (
        <Modal isOpen={props.openModal} style={style}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form>
                        <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{'Số nhóm đã báo cáo:'}</h4>
                        </div>
                        <div className="modal-body">
                            <ListGroup>
                                <ListGroupItem>Cras justo odio</ListGroupItem>
                                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                                <ListGroupItem>Morbi leo risus</ListGroupItem>
                                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            </ListGroup>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => { props.close() }} type="button" className="btn btn-danger mg-l-5" data-dismiss="modal">{'Đóng'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );

}

export default ViewDetailProcessModal;