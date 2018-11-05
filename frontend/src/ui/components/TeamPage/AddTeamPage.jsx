import React, { Component } from 'react';

const AddTeamPage = props => {
        return (
            <div>
                <section className="content">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header with-border">
                    <h3 className="box-title">
                    <i className="fa fa-user m-r-5"></i>
                      <i className="fa m-r-5"></i> Add Team</h3>
                    
                    </div>
                      <div className="box-body">
                      <form>
                            <div>
                            <div class="form-group col-lg-6">
                                <label>Team Name: <span style={{color: "red"}}>*</span></label>
                                <input type="text" autocomplete="off" class="form-control"/>
                            </div>
                            <div class="form-group col-lg-6">
                                <label>Supervisor: <span style={{color: "red"}}>*</span></label>
                                <select  class="form-control"  >
                                <option value="" >-- Select Supervisor --</option>
                                <option value="">Pham Hong Cang</option>
                                <option value="">Pham Hong Nam</option>
                                </select>
                            </div>
                            <div class="form-group col-lg-6">
                                <label>Project: <span style={{color: "red"}}>*</span></label>
                                <select  class="form-control"  >
                                    <option value="" >-- Select Project --</option>
                                    <option value="">Paint</option>
                                    <option value="">Building</option>
                                </select>
                                </div>
                            <div class="form-group col-lg-6">
                                <label>Description:</label>
                                <textarea rows="4" autocomplete="off" class="form-control" ></textarea>
                            </div>
                            </div>
                        </form>
                            <div class="form-group col-lg-12">
                                <button class="btn btn-success pull-right">Add</button>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
                </section>
            </div>
        );
}

export default AddTeamPage;