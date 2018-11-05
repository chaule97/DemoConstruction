import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SubmitFormComponent from '../../components/SubmitForm/SubmitForm';

class SubmitForm extends Component {
    render() {
        return (
          <SubmitFormComponent/>
        );
    }
}

export default withRouter(SubmitForm);