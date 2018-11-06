import React, { Component } from 'react';

const AddUserPage = props => {
        console.log(props)
        return (
            <div>
                <section className="content">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header with-border">
                    <h3 className="box-title">
                    <i className="fa fa-users m-r-5"></i>
                      <i className="fa m-r-5"></i> Add User</h3>
                    
                    </div>
                      <div className="box-body">
                      <form>
                            <div>
                                <div className="form-group col-lg-6">
                                    <label>User Name: <span style={{color: "red"}}>*</span></label>
                                    <input type="text" autoComplete="off" className="form-control"
                                        value = {props.data.username}
                                        onChange = {(e) => props.changeDataValue('username', e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Email: <span style={{color: "red"}}>*</span></label>
                                    <input type="email" autoComplete="off" className="form-control"
                                        value = {props.data.email}
                                        onChange = {(e) => props.changeDataValue('email', e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Password: <span style={{color: "red"}}>*</span></label>
                                    <input type="password" autoComplete="off" className="form-control"
                                        value = {props.data.password}
                                        onChange = {(e) => props.changeDataValue('password', e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label> Full Name: <span style={{color: "red"}}>*</span></label>
                                    <input type="text" autoComplete="off" className="form-control"
                                        value = {props.data.last_name}
                                        onChange = {(e) => props.changeDataValue('last_name', e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                            <div className="form-group col-lg-12">
                                <button className="btn btn-success pull-right"
                                    onClick = {() => props.createUser()}
                                >Add</button>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
                </section>
            </div>
        );
}

export default AddUserPage;