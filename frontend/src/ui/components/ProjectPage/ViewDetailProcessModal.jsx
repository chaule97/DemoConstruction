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
            <div>I am a modal</div>
            <form>
                <input />
                <button onClick = {() => props.close()}> close </button>
            </form>
        </Modal>
    );
    
}

export default ViewDetailProcessModal;