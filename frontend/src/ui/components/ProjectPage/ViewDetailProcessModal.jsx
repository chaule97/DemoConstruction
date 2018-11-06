import React from 'react';
import Modal from 'react-modal';
const style = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}
const ViewDetailProcessModal = props => {
    return (
        <Modal isOpen = {props.openModal} style = {style}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form>
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{'Test'}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group confirmMessage">{'confirmMessage'}</div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => { props.close(); }} type="button" className="bt-orange mg-l-5" data-dismiss="modal">{'Close'}</button>
                    </div>
                    </form>
                </div>
                </div>
        </Modal>
    );
    
}

export default ViewDetailProcessModal;