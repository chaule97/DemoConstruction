import React, { Component } from 'react';

const AddUserPage = props => {
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
                                    <input type="text" autoComplete="off" className="form-control"/>
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Email: <span style={{color: "red"}}>*</span></label>
                                    <input type="email" autoComplete="off" className="form-control"/>
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Password: <span style={{color: "red"}}>*</span></label>
                                    <input type="password" autoComplete="off" className="form-control"/>
                                </div>
                                <div className="form-group col-lg-6">
                                    <label> Confirm Password: <span style={{color: "red"}}>*</span></label>
                                    <input type="password" autoComplete="off" className="form-control"/>
                                </div>
                                <div className="form-group col-lg-6">
                                    <label> Full Name: <span style={{color: "red"}}>*</span></label>
                                    <input type="text" autoComplete="off" className="form-control"/>
                                </div>
                            </div>
                        </form>
                            <div className="form-group col-lg-12">
                                <button className="btn btn-success pull-right">Add</button>
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