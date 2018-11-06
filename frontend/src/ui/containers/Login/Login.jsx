import React, { Component } from 'react';
import LoginComponent from '../../components/Login/Login';
import * as PATH from '../../../constants/routeConstants';
class Login extends Component {


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
        localStorage.setItem('login', true);
    }

    render() {
        return (
            <LoginComponent login = {() => this.login()} />
        );
    }
}

export default Login;