import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import * as PATH from '../../constants/routeConstants';
import HeaderComponent from '../components/Header';
class Header extends Component {

    logout = () => {
        localStorage.removeItem('login');
        this.props.history.push(PATH.LOGIN_URL)
    }
    render() {
        return (
            <div>
                <HeaderComponent logout = {() => this.logout()}/>
            </div>
        );
    }
}

export default withRouter(Header);