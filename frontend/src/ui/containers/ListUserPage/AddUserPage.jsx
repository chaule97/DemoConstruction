import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import AddUserPageComponent from '../../components/ListUserPage/AddUserPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
class AddUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    goBack = () => {
        this.props.history.goBack();
    }

    changeDataValue = (key, value) => {
        let {data} = this.state;
        data[key] = value;
        this.setState({data})
    }

    createUser = () => {
        const {data} = this.state;
        api.apiPost(urlApi.createUser, data).then(res =>
            {
                if(res.statusText = "Created") {
                    this.props.history.goBack();
                }
            }
        )
    }

    render() {
        const  {data} = this.state;
        console.log(data)
        return (
          <AddUserPageComponent
            changeDataValue = {(key, value) => this.changeDataValue(key, value)}
            data = {data}
            goBack = {() => this.goBack()}
            createUser = {this.createUser}
          />
        );
    }
}

export default withRouter(AddUserPage);