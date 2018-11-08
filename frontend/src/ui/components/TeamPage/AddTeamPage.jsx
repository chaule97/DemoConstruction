import React from 'react';

const AddTeamPage = props => {
    // console.log(props)
    return (
        <div>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">
                                    <i className="fa fa-users m-r-5"></i>
                                    <i className="fa m-r-5"></i> Thêm nhóm</h3>

                            </div>
                            <div className="box-body">
                                <form>
                                    <div>
                                        <div className="form-group col-lg-6">
                                            <label>Tên nhóm: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" autoComplete="off" className="form-control"
                                                value={props.data.name}
                                                onChange={(e) => props.changeAddTeamName('name', e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="form-group col-lg-6">
                            <label>Project: <span style={{color: "red"}}>*</span></label>
                                <select  className="form-control" onChange = {(e) => props.changeAddTeamProject('name', (e.target.value))} >
                                <option value="" >-- Select Project --</option>
                                {((props.projects || []).map((item, index) => {
                                    // console.log(item)
                                    return (
                                        <option key = {index} value={item.id}>{item.name}</option>
                                    )
                                }))}
                                </select>
                            </div> */}
                                        <div className="form-group col-lg-6">
                                            <label>Mô tả:</label>
                                            <textarea rows="4" autoComplete="off" className="form-control"
                                                value={props.data.note}
                                                onChange={(e) => props.changeAddTeamName('note', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="form-group col-lg-12">
                                    <button className="btn btn-success pull-right"
                                        onClick={() => props.createTeam()}
                                    >Thêm</button>
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