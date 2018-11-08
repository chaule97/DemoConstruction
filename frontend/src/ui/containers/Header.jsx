import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import * as PATH from '../../constants/routeConstants';
import HeaderComponent from '../components/Header';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: localStorage.getItem('type'),
        }
    }
    
    logout = () => {
        localStorage.removeItem('login');
        this.props.history.push(PATH.LOGIN_URL)
    }

    render() {
        const {type} = this.state;
        return (
            <div>
                <HeaderComponent type = {type} logout = {() => this.logout()}/>
            </div>
        );
    }
}

export default withRouter(Header);