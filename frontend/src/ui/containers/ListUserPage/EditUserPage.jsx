import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as PATH from '../../../constants/routeConstants';
import AddUserPageComponent from '../../components/ListUserPage/AddUserPage';
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
import _ from 'lodash';
class EditUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentWillMount() {
        this.getUserDetail(this.getUserId())
    }

    getUserId = () => {
        const id =  this.props.location.pathname.split("id=")[1];
        this.setState({userId: id});
        return id;
    }

    getUserDetail = (id) => {
        api.apiGet(urlApi.getListUser + id).then(res => {
            if(res) {
                const data = _.omit(res.data, ['url'])
                this.setState({data});
            }
        })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    changeDataValue = (key, value) => {
        let {data} = this.state;
        data[key] = value;
        this.setState({data})
    }

    update = () => {
        const {userId, data} = this.state;
        api.apiPut(urlApi.getListUser + userId + '/', data).then(res => {
            if(res) {
                this.props.history.push(PATH.USER_URL);
            }
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <AddUserPageComponent
                    changeDataValue = {(key, value) => this.changeDataValue(key, value)}
                    data = {data}
                    goBack = {() => this.goBack()}
                    createUser = {this.update}
                    type = 'edit'
                />
            </div>
        );
    }
}

export default EditUserPage;