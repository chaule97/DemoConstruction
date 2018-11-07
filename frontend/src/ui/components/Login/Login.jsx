import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as PATH from '../../../constants/routeConstants';
const Login = props => {
    console.log(props)
    return (
        <div className="login-box">
            <div className="login-logo">
                <a ><b>Management</b> Admin</a>
            </div>
            <div className="login-box-body">
                <p className="login-box-msg">Đăng nhập để bắt đầu phiên làm việc</p>

                <form >
                    <div className="form-group has-feedback">
                        <input type="email" className="form-control" placeholder="Username"
                            value = {props.data.username}
                            onChange = {(e) => props.changeData('username', e.target.value) }
                        />
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="password" className="form-control" placeholder="Password"
                            value = {props.data.password}
                            onChange = {(e) => props.changeData('password', e.target.value) }
                        />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="row text-align-center">
                        {props.isEmpty && <p className = "color-red">Vui lòng điền đầy đủ Username và Password</p>}
                        {props.failLogin && <p className = "color-red">Sai Username hoặc Password</p>}
                    </div>
                </form>
                    <div className="row">
                        <div className="col-xs-8">
                        <div className="checkbox icheck">
                            <label>
                                <input type="checkbox"/> Ghi nhớ tài khoản
                            </label>
                        </div>
                        </div>
                        <div className="col-xs-4">
                        <button className="btn btn-primary btn-block btn-flat"
                            onClick = {() => props.login()}
                        ><span className = "color-white">Đăng nhập</span></button>
                        </div>
                    </div>

                 {/* <a href="#">I forgot my password</a><br/>
                 <a href="register.html" class="text-center">Register a new membership</a> */}

        </div>
        </div>
    );
}

export default Login;