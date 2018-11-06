import React, { Component } from 'react';
import DetailComponent from '../../components/ProjectPage/Detail';
class Detail extends Component {

    openModal = (data) => {
        console.log(data)
    }
    render() {
        return (
            <div>
                <DetailComponent openModal = {(data) => this.openModal(data)}/>
            </div>
        );
    }
}

export default Detail;