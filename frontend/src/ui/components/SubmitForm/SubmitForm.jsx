import React, { Component } from 'react';

const SubmitForm = props => {
        return (
            <div>
                <section className="content">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                    <div className="box-header with-border">
                    <h3 className="box-title">
                    <i className="fa fa-edit m-r-5"></i>
                      <i className="fa m-r-5"></i> Báo cáo</h3>
                    
                    </div>
                      <div className="box-body">
                      <form>
                            <div>
                        
                            <div className="form-group col-lg-6">
                                <label>Tên dự án: <span style={{color: "red"}}>*</span></label>
                                <select  className="form-control" onChange = {(e) => props.changeSubmitFormValue('projects', e.target.value)} >
                                <option value="" >-- Select Project --</option>
                                {((props.projects || []).map((item, index) => {
                                    return (
                                        <option key = {index} value={item.id}>{item.name}</option>
                                    )
                                }))}
                                </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label>Nhóm: <span style={{color: "red"}}>*</span></label>
                                <select  className="form-control" 
                                    onChange = {(e) => props.changeSubmitFormValue('team', e.target.value)}
                                >
                                    <option value="" >-- Select Team --</option>
                                    {((props.teams || []).map((item, index) => {
                                    return (
                                        <option key = {index} value={item.id}>{item.name}</option>
                                    )
                                }))}
                                </select>
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Nội dung:</label>
                                    <textarea rows="4" autoComplete="off" className="form-control"
                                        value = {props.data.content}
                                        onChange = {(e) => props.changeSubmitFormValue('content', e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label>Ghi chú:</label>
                                    <textarea rows="4" autoComplete="off" className="form-control"
                                        value = {props.data.note}
                                        onChange = {(e) => props.changeSubmitFormValue('note', e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                            <div className="form-group col-lg-12">
                                <button className="btn btn-success pull-right"
                                    onClick = {() => props.submit()}
                                >Gửi</button>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
                </section>
            </div>
        );
}

export default SubmitForm;