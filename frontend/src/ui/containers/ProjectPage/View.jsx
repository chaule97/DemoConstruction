import React, { Component } from 'react';
import ViewComponent from  '../../components/ProjectPage/ProjectPage';
import ViewDetailProcessModal from '../../components/ProjectPage/ViewDetailProcessModal';
class View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            dataOfModal: {},
        }
    }
    
    openModal = (event) => {
        this.setState({openModal: true, dataOfModal: event})
    }

    closeModal = () => {
        this.setState({openModal: false})
    }

    render() {
        const {openModal, dataOfModal} = this.state;
        return (
            <span>
                <ViewComponent openModal = {event => this.openModal(event)}/>
                <ViewDetailProcessModal 
                    openModal= {openModal} 
                    data = {dataOfModal}
                    close = {this.closeModal}
                />
            </span>
        );
    }
}

export default View;