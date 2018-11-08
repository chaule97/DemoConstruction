import React from 'react';

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
                                        {/* <div className="form-group col-lg-6">
                                <label>Tên dự án: <span style={{color: "red"}}>*</span></label>
                                <select  className="form-control" onChange = {(e) => props.changeSubmitFormValue('projects', e.target.value)} >
                                <option value="" >-- Select Project --</option>
                                {((props.projects || []).map((item, index) => {
                                    return (
                                        <option key = {index} value={item.id}>{item.name}</option>
                                    )
                                }))}
                                </select>
                            </div> */}
                                        <div className="form-group col-lg-2 fixed"  >
                                            {/* <label>Nhóm thi công: <span style={{color: "red"}}>*</span></label> */}
                                            <select className="form-control"
                                                value={'tesst'}
                                                onChange={(e) => props.changeSelectedTeam(e.target.value)}
                                            >
                                                <option value="" >-- Nhóm thi công --</option>
                                                {((props.teams || []).map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.name}</option>
                                                    )
                                                }))}
                                            </select>
                                        </div>
                                        {(props.submitValue || []).map((item, index) => {
                                            return (
                                                <div key = {index}>
                                                <div className="col-sm-3" ></div>
                                                <div className="col-sm-9 submit-frame" >
                                                    <div className="col-sm-12 text-align-center"><label>{item.teamDataDetail.name}</label></div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Công việc: <span style={{ color: "red" }}>*</span></label>
                                                        <textarea rows="3" autoComplete="off" className="form-control"
                                                            value={props.data.task_name}
                                                            onChange={(e) => props.changeSubmitFormValue('task_name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Số lượng công nhân:</label>
                                                        <input type="number" autoComplete="off" className="form-control"
                                                            value={props.data.worker_number}
                                                            onChange={(e) => props.changeSubmitFormValue('worker_number', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Tiến độ đạt được: </label>
                                                        <input type="number" autoComplete="off" className="form-control"
                                                            value={props.data.process}
                                                            onChange={(e) => props.changeSubmitFormValue('process', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Ghi chú, đề xuất: <span style={{ color: "red" }}>*</span></label>
                                                        <textarea rows="3" autoComplete="off" className="form-control"
                                                            value={props.data.content}
                                                            onChange={(e) => props.changeSubmitFormValue('content', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Đề xuất vật tư: <span style={{ color: "red" }}>*</span></label>
                                                        <textarea rows="2" autoComplete="off" className="form-control"
                                                            value={props.data.proposed_materials}
                                                            onChange={(e) => props.changeSubmitFormValue('proposed_materials', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group col-sm-12 col-md-4 col-lg-4">
                                                        <label>Các công việc cần chuẩn bị: <span style={{ color: "red" }}>*</span></label>
                                                        <textarea rows="3" autoComplete="off" className="form-control"
                                                            value={props.data.job_tomorrow}
                                                            onChange={(e) => props.changeSubmitFormValue('job_tomorrow', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                        })

                                        }
                                        {/* <div className="form-group col-lg-6">
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
                                </div> */}
                                    </div>
                                </form>
                                <div className="form-group col-lg-12">
                                    <button className="btn btn-success pull-right"
                                        onClick={() => props.submit()}
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