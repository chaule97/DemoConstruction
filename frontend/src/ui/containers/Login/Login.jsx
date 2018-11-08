import React, { Component } from 'react';
import LoginComponent from '../../components/Login/Login';
import * as PATH from '../../../constants/routeConstants';
import _ from 'lodash';
import {toastr} from 'react-redux-toastr';
import {withRouter} from 'react-router-dom';
import urlApi from '../../../constants/urlApi';
import { apiGet, apiPost } from '../../../api/api';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {

            },
            isEmpty: false,
            failLogin: false,
        }
    }
    

    componentWillMount() {
        const status = localStorage.getItem('login');
        // console.log(status)
        if(status) {
            this.props.history.push(PATH.HOME_URL);
        } else {
            return;
        }
    }

    login = () => {
        const {data} = this.state;
        if(_.isEmpty(data.username) || _.isEmpty(data.password)) {
            this.setState({isEmpty: true});
        } else {
            apiPost(urlApi.login, data).then(res => {
                if(res.data.access) {
                    this.setState({failLogin: false});
                    localStorage.setItem('login', true);
                    localStorage.setItem('type', res.data.type_user);
                    localStorage.setItem('userId', res.data.id);
                    this.props.history.push(PATH.HOME_URL)
                } else {
                    this.setState({failLogin: true});
                }
            })
            this.setState({isEmpty: false});
        }
        
    }

    checked = (data) => {
        if(_.isEmpty(data.username) || _.isEmpty(data.password)) {
            return false;
        }
        return true;
    }

    changeData = (key, value) => {
        const {data}  = this.state;
        data[key] = value;
        this.setState({data})
    }

    render() {
        const {data, isEmpty, failLogin} = this.state;
        // console.log(isEmpty)
        return (
            <LoginComponent 
                data = {data}
                isEmpty = {isEmpty}
                failLogin = {failLogin}
                changeData = {(key, value) => this.changeData(key, value)}
                login = {() => this.login()} />
        );
    }
}

export default withRouter(Login);